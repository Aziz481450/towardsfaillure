using TowardsFailure.API.Models;

namespace TowardsFailure.API.Repositories;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(string id);
    Task<User?> GetByEmailAsync(string email);
    Task<User?> GetByUsernameAsync(string username);
    Task CreateAsync(User user);
    Task UpdateAsync(string id, User user);
    Task<List<User>> GetUsersByRoleAsync(string role);
    Task<List<User>> GetAthletesByCoachIdAsync(string coachId);
}
