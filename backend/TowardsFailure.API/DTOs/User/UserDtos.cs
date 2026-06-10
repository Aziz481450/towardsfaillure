namespace TowardsFailure.API.DTOs.User;

public class UpdateUserDto
{
    public string? FullName { get; set; }
    public string? AvatarUrl { get; set; }
}

public class UserProfileDto
{
    public string Id { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Username { get; set; } = null!;
    public string Role { get; set; } = null!;
    public string? FullName { get; set; }
    public string? AvatarUrl { get; set; }
    public string? CoachId { get; set; }
    public DateTime CreatedAt { get; set; }
}
