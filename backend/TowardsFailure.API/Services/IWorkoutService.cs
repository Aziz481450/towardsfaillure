using TowardsFailure.API.DTOs.Workout;

namespace TowardsFailure.API.Services;

public interface IWorkoutService
{
    Task<SessionDto> StartSessionAsync(string userId, StartSessionDto dto);
    Task<SessionDto> CompleteSessionAsync(string sessionId, string userId, CompleteSessionDto dto);
    Task<SessionDto> GetSessionAsync(string sessionId, string userId);
    Task<List<SessionDto>> GetSessionsAsync(string userId, int page, int pageSize);
    Task<List<SessionDto>> GetSessionsByDateRangeAsync(string userId, DateTime from, DateTime to);
}
