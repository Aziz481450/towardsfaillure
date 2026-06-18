using MongoDB.Driver;
using TowardsFailure.API.Models;

namespace TowardsFailure.API.Repositories;

public class WorkoutSessionRepository : IWorkoutSessionRepository
{
    private readonly IMongoCollection<WorkoutSession> _sessions;

    public WorkoutSessionRepository(IConfiguration config)
    {
        var settings = config.GetSection("MongoDb").Get<Helpers.MongoDbSettings>()!;
        var client = new MongoClient(settings.ConnectionString);
        var db = client.GetDatabase(settings.DatabaseName);
        _sessions = db.GetCollection<WorkoutSession>("workout_sessions");
    }

    public async Task<WorkoutSession?> GetByIdAsync(string id) =>
        await _sessions.Find(s => s.Id == id && !s.IsDeleted).FirstOrDefaultAsync();

    public async Task<List<WorkoutSession>> GetByUserIdAsync(string userId, int page = 1, int pageSize = 20) =>
        await _sessions.Find(s => s.UserId == userId && !s.IsDeleted)
            .SortByDescending(s => s.Date)
            .Skip((page - 1) * pageSize)
            .Limit(pageSize)
            .ToListAsync();

    public async Task<long> GetCountByUserIdAsync(string userId) =>
        await _sessions.CountDocumentsAsync(s => s.UserId == userId && !s.IsDeleted);

    public async Task<List<WorkoutSession>> GetByUserIdAndDateRangeAsync(string userId, DateTime from, DateTime to) =>
        await _sessions.Find(s => s.UserId == userId && !s.IsDeleted && s.Date >= from && s.Date <= to)
            .SortByDescending(s => s.Date)
            .ToListAsync();

    public async Task CreateAsync(WorkoutSession session) =>
        await _sessions.InsertOneAsync(session);

    public async Task UpdateAsync(string id, WorkoutSession session) =>
        await _sessions.ReplaceOneAsync(s => s.Id == id, session);
}
