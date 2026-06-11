using MongoDB.Driver;
using TowardsFailure.API.Models;

namespace TowardsFailure.API.Repositories;

public class UserRepository : IUserRepository
{
    private readonly IMongoCollection<User> _users;

    public UserRepository(IConfiguration config)
    {
        var settings = config.GetSection("MongoDb").Get<Helpers.MongoDbSettings>()!;
        var client = new MongoClient(settings.ConnectionString);
        var db = client.GetDatabase(settings.DatabaseName);
        _users = db.GetCollection<User>("users");
    }

    public async Task<User?> GetByIdAsync(string id) =>
        await _users.Find(u => u.Id == id && !u.IsDeleted).FirstOrDefaultAsync();

    public async Task<User?> GetByEmailAsync(string email) =>
        await _users.Find(u => u.Email == email && !u.IsDeleted).FirstOrDefaultAsync();

    public async Task<User?> GetByUsernameAsync(string username) =>
        await _users.Find(u => u.Username == username && !u.IsDeleted).FirstOrDefaultAsync();

    public async Task CreateAsync(User user) =>
        await _users.InsertOneAsync(user);

    public async Task UpdateAsync(string id, User user) =>
        await _users.ReplaceOneAsync(u => u.Id == id, user);

    public async Task<List<User>> GetUsersByRoleAsync(string role) =>
        await _users.Find(u => u.Role.ToString() == role && !u.IsDeleted).ToListAsync();

    public async Task<List<User>> GetAthletesByCoachIdAsync(string coachId) =>
        await _users.Find(u => u.CoachId == coachId && !u.IsDeleted).ToListAsync();
}
