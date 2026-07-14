using TowardsFailure.API.DTOs.User;
using TowardsFailure.API.Repositories;

namespace TowardsFailure.API.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepo;

    public UserService(IUserRepository userRepo)
    {
        _userRepo = userRepo;
    }

    public async Task<UserProfileDto> GetProfileAsync(string userId)
    {
        var user = await _userRepo.GetByIdAsync(userId)
            ?? throw new KeyNotFoundException("User not found");
        return MapToDto(user);
    }

    public async Task<UserProfileDto> UpdateProfileAsync(string userId, UpdateUserDto dto)
    {
        var user = await _userRepo.GetByIdAsync(userId)
            ?? throw new KeyNotFoundException("User not found");

        if (dto.FullName != null) user.FullName = dto.FullName;
        if (dto.AvatarUrl != null) user.AvatarUrl = dto.AvatarUrl;
        user.UpdatedAt = DateTime.UtcNow;

        await _userRepo.UpdateAsync(userId, user);
        return MapToDto(user);
    }

    public async Task<List<UserProfileDto>> GetAthletesAsync(string coachId)
    {
        var athletes = await _userRepo.GetAthletesByCoachIdAsync(coachId);
        return athletes.Select(MapToDto).ToList();
    }

    private static UserProfileDto MapToDto(Models.User user) => new()
    {
        Id = user.Id,
        Email = user.Email,
        Username = user.Username,
        Role = user.Role.ToString(),
        FullName = user.FullName,
        AvatarUrl = user.AvatarUrl,
        CoachId = user.CoachId,
        CreatedAt = user.CreatedAt
    };
}
