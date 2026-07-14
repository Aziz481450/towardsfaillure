using TowardsFailure.API.Models;

namespace TowardsFailure.API.Repositories;

public interface IPersonalRecordRepository
{
    Task<PersonalRecord?> GetByIdAsync(string id);
    Task<List<PersonalRecord>> GetByUserIdAsync(string userId);
    Task<PersonalRecord?> GetBestByUserAndExerciseAsync(string userId, string exerciseId, string type);
    Task CreateAsync(PersonalRecord record);
    Task UpdateAsync(string id, PersonalRecord record);
    Task<List<PersonalRecord>> GetRecentByUserIdAsync(string userId, int count = 10);
}
