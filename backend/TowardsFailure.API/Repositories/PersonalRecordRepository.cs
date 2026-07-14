using MongoDB.Driver;
using TowardsFailure.API.Models;

namespace TowardsFailure.API.Repositories;

public class PersonalRecordRepository : IPersonalRecordRepository
{
    private readonly IMongoCollection<PersonalRecord> _records;

    public PersonalRecordRepository(IConfiguration config)
    {
        var settings = config.GetSection("MongoDb").Get<Helpers.MongoDbSettings>()!;
        var client = new MongoClient(settings.ConnectionString);
        var db = client.GetDatabase(settings.DatabaseName);
        _records = db.GetCollection<PersonalRecord>("personal_records");
    }

    public async Task<PersonalRecord?> GetByIdAsync(string id) =>
        await _records.Find(r => r.Id == id && !r.IsDeleted).FirstOrDefaultAsync();

    public async Task<List<PersonalRecord>> GetByUserIdAsync(string userId) =>
        await _records.Find(r => r.UserId == userId && !r.IsDeleted)
            .SortByDescending(r => r.AchievedAt).ToListAsync();

    public async Task<PersonalRecord?> GetBestByUserAndExerciseAsync(string userId, string exerciseId, string type) =>
        await _records.Find(r => r.UserId == userId && r.ExerciseId == exerciseId && r.Type == type && !r.IsDeleted)
            .SortByDescending(r => r.Value).FirstOrDefaultAsync();

    public async Task CreateAsync(PersonalRecord record) =>
        await _records.InsertOneAsync(record);

    public async Task UpdateAsync(string id, PersonalRecord record) =>
        await _records.ReplaceOneAsync(r => r.Id == id, record);

    public async Task<List<PersonalRecord>> GetRecentByUserIdAsync(string userId, int count = 10) =>
        await _records.Find(r => r.UserId == userId && !r.IsDeleted)
            .SortByDescending(r => r.AchievedAt).Limit(count).ToListAsync();
}
