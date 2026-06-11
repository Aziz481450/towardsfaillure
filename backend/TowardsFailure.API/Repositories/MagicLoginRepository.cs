using MongoDB.Driver;
using TowardsFailure.API.Models;

namespace TowardsFailure.API.Repositories;

public class MagicLoginRepository : IMagicLoginRepository
{
    private readonly IMongoCollection<MagicLoginToken> _collection;

    public MagicLoginRepository(IConfiguration config)
    {
        var settings = config.GetSection("MongoDb").Get<Helpers.MongoDbSettings>()!;
        var client = new MongoClient(settings.ConnectionString);
        var db = client.GetDatabase(settings.DatabaseName);
        _collection = db.GetCollection<MagicLoginToken>("magic_login_tokens");
    }

    public async Task CreateAsync(MagicLoginToken token) =>
        await _collection.InsertOneAsync(token);

    public async Task<MagicLoginToken?> GetByTokenAsync(string token) =>
        await _collection.Find(t => t.Token == token && !t.Used && t.ExpiresAt > DateTime.UtcNow).FirstOrDefaultAsync();

    public async Task MarkUsedAsync(string id) =>
        await _collection.UpdateOneAsync(t => t.Id == id, Builders<MagicLoginToken>.Update.Set(t => t.Used, true));
}
