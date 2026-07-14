using MongoDB.Driver;
using TowardsFailure.API.Models;

namespace TowardsFailure.API.Repositories;

public class NotificationRepository : INotificationRepository
{
    private readonly IMongoCollection<Notification> _notifications;

    public NotificationRepository(IConfiguration config)
    {
        var settings = config.GetSection("MongoDb").Get<Helpers.MongoDbSettings>()!;
        var client = new MongoClient(settings.ConnectionString);
        var db = client.GetDatabase(settings.DatabaseName);
        _notifications = db.GetCollection<Notification>("notifications");
    }

    public async Task<List<Notification>> GetByUserIdAsync(string userId) =>
        await _notifications.Find(n => n.UserId == userId && !n.IsDeleted)
            .SortByDescending(n => n.CreatedAt).ToListAsync();

    public async Task CreateAsync(Notification notification) =>
        await _notifications.InsertOneAsync(notification);

    public async Task MarkAsReadAsync(string id) =>
        await _notifications.UpdateOneAsync(n => n.Id == id,
            Builders<Notification>.Update.Set(n => n.IsRead, true).Set(n => n.UpdatedAt, DateTime.UtcNow));

    public async Task<long> GetUnreadCountAsync(string userId) =>
        await _notifications.CountDocumentsAsync(n => n.UserId == userId && !n.IsRead && !n.IsDeleted);
}
