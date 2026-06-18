using MongoDB.Driver;
using TowardsFailure.API.Models;

namespace TowardsFailure.API.Repositories;

public class ExerciseRepository : IExerciseRepository
{
    private readonly IMongoCollection<Exercise> _exercises;

    public ExerciseRepository(IConfiguration config)
    {
        var settings = config.GetSection("MongoDb").Get<Helpers.MongoDbSettings>()!;
        var client = new MongoClient(settings.ConnectionString);
        var db = client.GetDatabase(settings.DatabaseName);
        _exercises = db.GetCollection<Exercise>("exercises");
    }

    public async Task<Exercise?> GetByIdAsync(string id) =>
        await _exercises.Find(e => e.Id == id && !e.IsDeleted).FirstOrDefaultAsync();

    public async Task<List<Exercise>> GetAllAsync() =>
        await _exercises.Find(e => !e.IsDeleted).ToListAsync();

    public async Task<List<Exercise>> GetByMuscleGroupAsync(string muscleGroup) =>
        await _exercises.Find(e => e.MuscleGroup == muscleGroup && !e.IsDeleted).ToListAsync();

    public async Task CreateAsync(Exercise exercise) =>
        await _exercises.InsertOneAsync(exercise);

    public async Task UpdateAsync(string id, Exercise exercise) =>
        await _exercises.ReplaceOneAsync(e => e.Id == id, exercise);

    public async Task DeleteAsync(string id) =>
        await _exercises.DeleteOneAsync(e => e.Id == id);
}
