using TowardsFailure.API.DTOs.User;

namespace TowardsFailure.API.Services;

public interface IUserService
{
    Task<UserProfileDto> GetProfileAsync(string userId);
    Task<UserProfileDto> UpdateProfileAsync(string userId, UpdateUserDto dto);
    Task<List<UserProfileDto>> GetAthletesAsync(string coachId);
}
