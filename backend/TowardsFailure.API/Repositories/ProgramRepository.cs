using MongoDB.Driver;
using TowardsFailure.API.Models;

namespace TowardsFailure.API.Repositories;

public class ProgramRepository : IProgramRepository
{
    private readonly IMongoCollection<TrainingProgram> _programs;

    public ProgramRepository(IConfiguration config)
    {
        var settings = config.GetSection("MongoDb").Get<Helpers.MongoDbSettings>()!;
        var client = new MongoClient(settings.ConnectionString);
        var db = client.GetDatabase(settings.DatabaseName);
        _programs = db.GetCollection<TrainingProgram>("programs");
    }

    public async Task<TrainingProgram?> GetByIdAsync(string id) =>
        await _programs.Find(p => p.Id == id && !p.IsDeleted).FirstOrDefaultAsync();

    public async Task<List<TrainingProgram>> GetByUserIdAsync(string userId) =>
        await _programs.Find(p => p.UserId == userId && !p.IsDeleted).ToListAsync();

    public async Task<List<TrainingProgram>> GetPublicProgramsAsync() =>
        await _programs.Find(p => p.IsPublic && !p.IsDeleted).ToListAsync();

    public async Task CreateAsync(TrainingProgram program) =>
        await _programs.InsertOneAsync(program);

    public async Task UpdateAsync(string id, TrainingProgram program) =>
        await _programs.ReplaceOneAsync(p => p.Id == id, program);

    public async Task DeleteAsync(string id) =>
        await _programs.DeleteOneAsync(p => p.Id == id);
}
