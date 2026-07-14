using TowardsFailure.API.DTOs.PR;
using TowardsFailure.API.Repositories;

namespace TowardsFailure.API.Services;

public class PersonalRecordService : IPersonalRecordService
{
    private readonly IPersonalRecordRepository _prRepo;

    public PersonalRecordService(IPersonalRecordRepository prRepo)
    {
        _prRepo = prRepo;
    }

    public async Task<List<PersonalRecordDto>> GetMyRecordsAsync(string userId)
    {
        var records = await _prRepo.GetByUserIdAsync(userId);
        return records.Select(r => new PersonalRecordDto
        {
            Id = r.Id,
            UserId = r.UserId,
            ExerciseId = r.ExerciseId,
            ExerciseName = r.ExerciseName,
            Type = r.Type,
            Value = r.Value,
            AchievedAt = r.AchievedAt
        }).ToList();
    }

    public async Task<List<PersonalRecordDto>> GetRecentRecordsAsync(string userId)
    {
        var records = await _prRepo.GetRecentByUserIdAsync(userId);
        return records.Select(r => new PersonalRecordDto
        {
            Id = r.Id,
            UserId = r.UserId,
            ExerciseId = r.ExerciseId,
            ExerciseName = r.ExerciseName,
            Type = r.Type,
            Value = r.Value,
            AchievedAt = r.AchievedAt
        }).ToList();
    }
}
