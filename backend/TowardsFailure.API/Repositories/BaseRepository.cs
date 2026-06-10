using MongoDB.Driver;
using TowardsFailure.API.Helpers;

namespace TowardsFailure.API.Repositories;

public class BaseRepository<T> where T : class
{
    protected readonly IMongoCollection<T> Collection;

    public BaseRepository(IConfiguration config, string collectionName)
    {
        var settings = config.GetSection("MongoDb").Get<MongoDbSettings>()!;
        var client = new MongoClient(settings.ConnectionString);
        var db = client.GetDatabase(settings.DatabaseName);
        Collection = db.GetCollection<T>(collectionName);
    }

    public async Task<List<T>> GetAllAsync() =>
        await Collection.Find(_ => true).ToListAsync();

    public async Task<T?> GetByIdAsync(string id) =>
        await Collection.Find(Builders<T>.Filter.Eq("_id", id)).FirstOrDefaultAsync();

    public async Task CreateAsync(T entity) =>
        await Collection.InsertOneAsync(entity);

    public async Task UpdateAsync(string id, T entity) =>
        await Collection.ReplaceOneAsync(Builders<T>.Filter.Eq("_id", id), entity);

    public async Task DeleteAsync(string id) =>
        await Collection.DeleteOneAsync(Builders<T>.Filter.Eq("_id", id));
}
