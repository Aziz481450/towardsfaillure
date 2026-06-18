using TowardsFailure.API.DTOs.Workout;
using TowardsFailure.API.Helpers;
using TowardsFailure.API.Models;
using TowardsFailure.API.Repositories;

namespace TowardsFailure.API.Services;

public class WorkoutService : IWorkoutService
{
    private readonly IWorkoutSessionRepository _sessionRepo;
    private readonly IPersonalRecordRepository _prRepo;
    private readonly INotificationRepository _notifRepo;

    public WorkoutService(
        IWorkoutSessionRepository sessionRepo,
        IPersonalRecordRepository prRepo,
        INotificationRepository notifRepo)
    {
        _sessionRepo = sessionRepo;
        _prRepo = prRepo;
        _notifRepo = notifRepo;
    }

    public async Task<SessionDto> StartSessionAsync(string userId, StartSessionDto dto)
    {
        var session = new WorkoutSession
        {
            UserId = userId,
            ProgramId = dto.ProgramId,
            ProgramName = dto.ProgramName,
            Date = DateTime.UtcNow,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        await _sessionRepo.CreateAsync(session);
        return MapToDto(session);
    }

    public async Task<SessionDto> CompleteSessionAsync(string sessionId, string userId, CompleteSessionDto dto)
    {
        var session = await _sessionRepo.GetByIdAsync(sessionId)
            ?? throw new KeyNotFoundException("Session not found");

        if (session.UserId != userId)
            throw new UnauthorizedAccessException("Not authorized");

        session.DurationMinutes = dto.DurationMinutes;
        session.Notes = dto.Notes;
        session.Exercises = dto.Exercises.Select(e => new SessionExercise
        {
            ExerciseId = e.ExerciseId,
            ExerciseName = e.ExerciseName,
            MuscleGroup = e.MuscleGroup,
            Sets = e.Sets.Select(s => new ExerciseSet
            {
                Weight = s.Weight,
                Reps = s.Reps,
                Rpe = s.Rpe,
                IsSuccess = s.IsSuccess
            }).ToList()
        }).ToList();

        session.TotalVolume = session.Exercises.Sum(e => e.Sets.Sum(s => s.Weight * s.Reps));
        session.UpdatedAt = DateTime.UtcNow;

        await _sessionRepo.UpdateAsync(sessionId, session);

        await DetectPersonalRecords(session);
        return MapToDto(session);
    }

    public async Task<SessionDto> GetSessionAsync(string sessionId, string userId)
    {
        var session = await _sessionRepo.GetByIdAsync(sessionId)
            ?? throw new KeyNotFoundException("Session not found");

        if (session.UserId != userId)
            throw new UnauthorizedAccessException("Not authorized");

        return MapToDto(session);
    }

    public async Task<List<SessionDto>> GetSessionsAsync(string userId, int page, int pageSize)
    {
        var sessions = await _sessionRepo.GetByUserIdAsync(userId, page, pageSize);
        return sessions.Select(MapToDto).ToList();
    }

    public async Task<List<SessionDto>> GetSessionsByDateRangeAsync(string userId, DateTime from, DateTime to)
    {
        var sessions = await _sessionRepo.GetByUserIdAndDateRangeAsync(userId, from, to);
        return sessions.Select(MapToDto).ToList();
    }

    private async Task DetectPersonalRecords(WorkoutSession session)
    {
        foreach (var exercise in session.Exercises)
        {
            foreach (var set in exercise.Sets)
            {
                if (!set.IsSuccess) continue;

                var volume = set.Weight * set.Reps;
                var currentBestVol = await _prRepo.GetBestByUserAndExerciseAsync(
                    session.UserId, exercise.ExerciseId, "max_volume");

                if (currentBestVol == null || volume > currentBestVol.Value)
                {
                    var pr = new PersonalRecord
                    {
                        UserId = session.UserId,
                        ExerciseId = exercise.ExerciseId,
                        ExerciseName = exercise.ExerciseName,
                        Type = "max_volume",
                        Value = volume,
                        AchievedAt = DateTime.UtcNow,
                        SessionId = session.Id
                    };
                    await _prRepo.CreateAsync(pr);

                    await _notifRepo.CreateAsync(new Notification
                    {
                        UserId = session.UserId,
                        Title = "New PR!",
                        Message = $"New volume PR: {volume}kg on {exercise.ExerciseName}",
                        Type = "pr"
                    });
                }

                if (set.Reps >= 2)
                {
                    var estimated1Rm = EpleyFormula.Estimate1Rm(set.Weight, set.Reps);
                    var currentBest1Rm = await _prRepo.GetBestByUserAndExerciseAsync(
                        session.UserId, exercise.ExerciseId, "1RM");

                    if (currentBest1Rm == null || estimated1Rm > currentBest1Rm.Value)
                    {
                        var pr = new PersonalRecord
                        {
                            UserId = session.UserId,
                            ExerciseId = exercise.ExerciseId,
                            ExerciseName = exercise.ExerciseName,
                            Type = "1RM",
                            Value = Math.Round(estimated1Rm, 1),
                            AchievedAt = DateTime.UtcNow,
                            SessionId = session.Id
                        };
                        await _prRepo.CreateAsync(pr);

                        await _notifRepo.CreateAsync(new Notification
                        {
                            UserId = session.UserId,
                            Title = "New 1RM PR!",
                            Message = $"Estimated 1RM: {estimated1Rm:F1}kg on {exercise.ExerciseName}",
                            Type = "pr"
                        });
                    }
                }
            }
        }
    }

    private static SessionDto MapToDto(WorkoutSession s) => new()
    {
        Id = s.Id,
        UserId = s.UserId,
        ProgramId = s.ProgramId,
        ProgramName = s.ProgramName,
        Date = s.Date,
        DurationMinutes = s.DurationMinutes,
        TotalVolume = s.TotalVolume,
        Notes = s.Notes,
        Exercises = s.Exercises.Select(e => new SessionExerciseDto
        {
            ExerciseId = e.ExerciseId,
            ExerciseName = e.ExerciseName,
            MuscleGroup = e.MuscleGroup,
            Sets = e.Sets.Select(set => new SetDto
            {
                Weight = set.Weight,
                Reps = set.Reps,
                Rpe = set.Rpe,
                IsSuccess = set.IsSuccess
            }).ToList()
        }).ToList()
    };
}
