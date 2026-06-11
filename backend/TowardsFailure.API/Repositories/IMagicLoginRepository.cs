using TowardsFailure.API.Models;

namespace TowardsFailure.API.Repositories;

public interface IMagicLoginRepository
{
    Task CreateAsync(MagicLoginToken token);
    Task<MagicLoginToken?> GetByTokenAsync(string token);
    Task MarkUsedAsync(string id);
}
