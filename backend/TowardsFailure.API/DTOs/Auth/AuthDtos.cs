namespace TowardsFailure.API.DTOs.Auth;

public class RegisterDto
{
    public string Email { get; set; } = null!;
    public string Username { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string? FullName { get; set; }
}

public class LoginDto
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}

public class SocialLoginDto
{
    public string Provider { get; set; } = null!; // facebook, instagram
    public string Token { get; set; } = null!;     // access token (or code for instagram)
}

public class SendMagicLinkDto
{
    public string Email { get; set; } = null!;
}

public class TokenResponseDto
{
    public string AccessToken { get; set; } = null!;
    public string RefreshToken { get; set; } = null!;
    public DateTime ExpiresAt { get; set; }
    public UserInfoDto User { get; set; } = null!;
}

public class UserInfoDto
{
    public string Id { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Username { get; set; } = null!;
    public string Role { get; set; } = null!;
    public string? FullName { get; set; }
    public string? AvatarUrl { get; set; }
}
