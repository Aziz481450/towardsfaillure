using TowardsFailure.API.DTOs.Program;
using TowardsFailure.API.Models;
using TowardsFailure.API.Repositories;

namespace TowardsFailure.API.Services;

public class ProgramService : IProgramService
{
    private readonly IProgramRepository _programRepo;

    public ProgramService(IProgramRepository programRepo)
    {
        _programRepo = programRepo;
    }

    public async Task<List<ProgramDto>> GetMyProgramsAsync(string userId)
    {
        var programs = await _programRepo.GetByUserIdAsync(userId);
        return programs.Select(MapToDto).ToList();
    }

    public async Task<List<ProgramDto>> GetPublicProgramsAsync()
    {
        var programs = await _programRepo.GetPublicProgramsAsync();
        return programs.Select(MapToDto).ToList();
    }

    public async Task<ProgramDto> GetByIdAsync(string id)
    {
        var program = await _programRepo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException("Program not found");
        return MapToDto(program);
    }

    public async Task<ProgramDto> CreateAsync(string userId, CreateProgramDto dto)
    {
        var program = new TrainingProgram
        {
            UserId = userId,
            Name = dto.Name,
            Goal = dto.Goal,
            Description = dto.Description,
            IsPublic = dto.IsPublic,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        await _programRepo.CreateAsync(program);
        return MapToDto(program);
    }

    public async Task<ProgramDto> UpdateAsync(string id, string userId, UpdateProgramDto dto)
    {
        var program = await _programRepo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException("Program not found");

        if (program.UserId != userId)
            throw new UnauthorizedAccessException("Not authorized to edit this program");

        if (dto.Name != null) program.Name = dto.Name;
        if (dto.Goal != null) program.Goal = dto.Goal;
        if (dto.Description != null) program.Description = dto.Description;
        if (dto.IsPublic.HasValue) program.IsPublic = dto.IsPublic.Value;
        program.UpdatedAt = DateTime.UtcNow;

        await _programRepo.UpdateAsync(id, program);
        return MapToDto(program);
    }

    public async Task DeleteAsync(string id, string userId)
    {
        var program = await _programRepo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException("Program not found");

        if (program.UserId != userId)
            throw new UnauthorizedAccessException("Not authorized to delete this program");

        program.IsDeleted = true;
        program.UpdatedAt = DateTime.UtcNow;
        await _programRepo.UpdateAsync(id, program);
    }

    public async Task<ProgramDto> AddWeekAsync(string programId, string userId, AddWeekDto dto)
    {
        var program = await _programRepo.GetByIdAsync(programId)
            ?? throw new KeyNotFoundException("Program not found");

        if (program.UserId != userId)
            throw new UnauthorizedAccessException("Not authorized");

        var week = new ProgramWeek
        {
            Name = dto.Name,
            Days = dto.Days.Select(d => new ProgramDay
            {
                Name = d.Name,
                Exercises = d.Exercises.Select(e => new ProgramExercise
                {
                    ExerciseId = e.ExerciseId,
                    ExerciseName = e.ExerciseName,
                    Sets = e.Sets,
                    Reps = e.Reps,
                    RestSeconds = e.RestSeconds,
                    Rpe = e.Rpe
                }).ToList()
            }).ToList()
        };

        program.Weeks.Add(week);
        program.UpdatedAt = DateTime.UtcNow;
        await _programRepo.UpdateAsync(programId, program);
        return MapToDto(program);
    }

    public async Task<ProgramDto> CloneProgramAsync(string programId, string userId)
    {
        var source = await _programRepo.GetByIdAsync(programId)
            ?? throw new KeyNotFoundException("Program not found");

        var clone = new TrainingProgram
        {
            UserId = userId,
            Name = $"{source.Name} (copy)",
            Goal = source.Goal,
            Description = source.Description,
            Weeks = source.Weeks,
            IsPublic = false,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await _programRepo.CreateAsync(clone);
        return MapToDto(clone);
    }

    private static ProgramDto MapToDto(TrainingProgram p) => new()
    {
        Id = p.Id,
        UserId = p.UserId,
        Name = p.Name,
        Goal = p.Goal,
        Description = p.Description,
        IsPublic = p.IsPublic,
        CreatedAt = p.CreatedAt,
        UpdatedAt = p.UpdatedAt,
        Weeks = p.Weeks.Select(w => new WeekDto
        {
            Name = w.Name,
            Days = w.Days.Select(d => new DayDto
            {
                Name = d.Name,
                Exercises = d.Exercises.Select(e => new ExerciseDto
                {
                    ExerciseId = e.ExerciseId,
                    ExerciseName = e.ExerciseName,
                    Sets = e.Sets,
                    Reps = e.Reps,
                    RestSeconds = e.RestSeconds,
                    Rpe = e.Rpe
                }).ToList()
            }).ToList()
        }).ToList()
    };
}
