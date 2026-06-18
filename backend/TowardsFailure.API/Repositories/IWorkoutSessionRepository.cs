using TowardsFailure.API.Models;

namespace TowardsFailure.API.Repositories;

public interface IWorkoutSessionRepository
{
    Task<WorkoutSession?> GetByIdAsync(string id);
    Task<List<WorkoutSession>> GetByUserIdAsync(string userId, int page = 1, int pageSize = 20);
    Task<long> GetCountByUserIdAsync(string userId);
    Task<List<WorkoutSession>> GetByUserIdAndDateRangeAsync(string userId, DateTime from, DateTime to);
    Task CreateAsync(WorkoutSession session);
    Task UpdateAsync(string id, WorkoutSession session);
}
