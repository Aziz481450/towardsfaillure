using TowardsFailure.API.Models;

namespace TowardsFailure.API.Repositories;

public interface INotificationRepository
{
    Task<List<Notification>> GetByUserIdAsync(string userId);
    Task CreateAsync(Notification notification);
    Task MarkAsReadAsync(string id);
    Task<long> GetUnreadCountAsync(string userId);
}
