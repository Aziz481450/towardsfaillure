using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using Microsoft.IdentityModel.Tokens;
using TowardsFailure.API.DTOs.Auth;
using TowardsFailure.API.Helpers;
using TowardsFailure.API.Models;
using TowardsFailure.API.Repositories;

namespace TowardsFailure.API.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepo;
    private readonly IConfiguration _config;
    private readonly HttpClient _httpClient;

    public AuthService(IUserRepository userRepo, IConfiguration config, HttpClient httpClient)
    {
        _userRepo = userRepo;
        _config = config;
        _httpClient = httpClient;
    }

    public async Task<TokenResponseDto> RegisterAsync(RegisterDto dto)
    {
        var existingEmail = await _userRepo.GetByEmailAsync(dto.Email);
        if (existingEmail != null)
            throw new InvalidOperationException("Email already registered");

        var existingUsername = await _userRepo.GetByUsernameAsync(dto.Username);
        if (existingUsername != null)
            throw new InvalidOperationException("Username already taken");

        var user = new User
        {
            Email = dto.Email,
            Username = dto.Username,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            FullName = dto.FullName,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await _userRepo.CreateAsync(user);
        return GenerateTokenResponse(user);
    }

    public async Task<TokenResponseDto> LoginAsync(LoginDto dto)
    {
        var user = await _userRepo.GetByEmailAsync(dto.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid email or password");

        return GenerateTokenResponse(user);
    }

    public async Task<TokenResponseDto> SocialLoginAsync(SocialLoginDto dto)
    {
        var socialSettings = _config.GetSection("SocialAuth").Get<SocialAuthSettings>()!;

        return dto.Provider switch
        {
            "google" => await HandleGoogleLogin(dto.Token, socialSettings),
            "facebook" => await HandleFacebookLogin(dto.Token, socialSettings),
            "instagram" => await HandleInstagramLogin(dto.Token, socialSettings),
            _ => throw new ArgumentException($"Unsupported provider: {dto.Provider}")
        };
    }

    private async Task<TokenResponseDto> HandleGoogleLogin(string code, SocialAuthSettings settings)
    {
        // Exchange code for tokens
        var tokenParams = new FormUrlEncodedContent(new Dictionary<string, string>
        {
            ["client_id"] = settings.GoogleClientId,
            ["client_secret"] = settings.GoogleClientSecret,
            ["grant_type"] = "authorization_code",
            ["redirect_uri"] = settings.OAuthRedirectUri,
            ["code"] = code
        });
        var tokenRes = await _httpClient.PostAsync("https://oauth2.googleapis.com/token", tokenParams);
        var tokenBody = await tokenRes.Content.ReadAsStringAsync();
        var tokenData = JsonSerializer.Deserialize<JsonElement>(tokenBody);

        if (!tokenData.TryGetProperty("id_token", out var idTokenProp))
        {
            var err = tokenData.TryGetProperty("error_description", out var ed) ? ed.GetString()! : "Google token exchange failed";
            throw new UnauthorizedAccessException(err);
        }

        // Decode ID token (JWT) to get user info
        var idToken = idTokenProp.GetString()!;
        var payload = idToken.Split('.')[1];
        var jsonBytes = Convert.FromBase64String(AddBase64Padding(payload));
        var profile = JsonSerializer.Deserialize<JsonElement>(jsonBytes);

        var email = profile.GetProperty("email").GetString()!;
        var googleId = profile.GetProperty("sub").GetString()!;
        var name = profile.TryGetProperty("name", out var n) ? n.GetString()! : email.Split('@')[0];
        var picture = profile.TryGetProperty("picture", out var p) ? p.GetString() : null;

        return await FindOrCreateUser("google", googleId, email, name, picture);
    }

    private async Task<TokenResponseDto> HandleFacebookLogin(string code, SocialAuthSettings settings)
    {
        // Exchange code for access token
        var tokenUrl = $"https://graph.facebook.com/v18.0/oauth/access_token?client_id={settings.FacebookAppId}&redirect_uri={settings.OAuthRedirectUri}&client_secret={settings.FacebookAppSecret}&code={code}";
        var tokenRes = await _httpClient.GetStringAsync(tokenUrl);
        var tokenData = JsonSerializer.Deserialize<JsonElement>(tokenRes);

        if (!tokenData.TryGetProperty("access_token", out var atProp))
            throw new UnauthorizedAccessException("Facebook code exchange failed");

        var accessToken = atProp.GetString()!;

        // Get user profile
        var fbUrl = $"https://graph.facebook.com/me?fields=id,name,email,picture&access_token={accessToken}";
        var fbRes = await _httpClient.GetStringAsync(fbUrl);
        var fbData = JsonSerializer.Deserialize<JsonElement>(fbRes);

        if (!fbData.TryGetProperty("email", out var emailProp))
            throw new UnauthorizedAccessException("Facebook email not available");

        var email = emailProp.GetString()!;
        var fbId = fbData.GetProperty("id").GetString()!;
        var name = fbData.TryGetProperty("name", out var n) ? n.GetString()! : email.Split('@')[0];
        var avatarUrl = $"https://graph.facebook.com/{fbId}/picture?type=large";

        return await FindOrCreateUser("fb", fbId, email, name, avatarUrl);
    }

    private async Task<TokenResponseDto> HandleInstagramLogin(string code, SocialAuthSettings settings)
    {
        // Exchange code for access token
        var tokenParams = new FormUrlEncodedContent(new Dictionary<string, string>
        {
            ["client_id"] = settings.InstagramClientId,
            ["client_secret"] = settings.InstagramClientSecret,
            ["grant_type"] = "authorization_code",
            ["redirect_uri"] = settings.OAuthRedirectUri,
            ["code"] = code
        });
        var tokenRes = await _httpClient.PostAsync("https://api.instagram.com/oauth/access_token", tokenParams);
        var tokenBody = await tokenRes.Content.ReadAsStringAsync();
        var tokenData = JsonSerializer.Deserialize<JsonElement>(tokenBody);

        if (!tokenData.TryGetProperty("access_token", out var igToken))
            throw new UnauthorizedAccessException("Instagram authentication failed");

        var accessToken = igToken.GetString()!;

        // Get user profile
        var igUrl = $"https://graph.instagram.com/me?fields=id,username&access_token={accessToken}";
        var igRes = await _httpClient.GetStringAsync(igUrl);
        var igData = JsonSerializer.Deserialize<JsonElement>(igRes);

        var igId = igData.GetProperty("id").GetString()!;
        var igUsername = igData.TryGetProperty("username", out var unProp) ? unProp.GetString()! : igId;
        var email = $"{igId}@instagram.irontrack";

        return await FindOrCreateUser("ig", igId, email, igUsername, null);
    }

    private async Task<TokenResponseDto> FindOrCreateUser(string prefix, string providerId, string email, string name, string? avatarUrl)
    {
        var username = $"{prefix}_{providerId}";
        var user = await _userRepo.GetByEmailAsync(email);
        if (user == null)
        {
            var existingUser = await _userRepo.GetByUsernameAsync(username);
            if (existingUser != null)
                username = username + "_" + Guid.NewGuid().ToString("N")[..6];

            user = new User
            {
                Email = email,
                Username = username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(Guid.NewGuid().ToString()),
                FullName = name,
                AvatarUrl = avatarUrl,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            await _userRepo.CreateAsync(user);
        }

        return GenerateTokenResponse(user);
    }

    private static string AddBase64Padding(string base64)
    {
        var len = base64.Length % 4;
        return len == 2 ? base64 + "==" : len == 3 ? base64 + "=" : base64;
    }

    public async Task<TokenResponseDto> GenerateTokenAsync(User user) => await Task.FromResult(GenerateTokenResponse(user));

    private TokenResponseDto GenerateTokenResponse(User user)
    {
        var jwtSettings = _config.GetSection("Jwt").Get<JwtSettings>()!;
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expiry = DateTime.UtcNow.AddMinutes(jwtSettings.ExpiryMinutes);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };

        var token = new JwtSecurityToken(
            issuer: jwtSettings.Issuer,
            audience: jwtSettings.Audience,
            claims: claims,
            expires: expiry,
            signingCredentials: creds
        );

        return new TokenResponseDto
        {
            AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
            RefreshToken = "",
            ExpiresAt = expiry,
            User = new UserInfoDto
            {
                Id = user.Id,
                Email = user.Email,
                Username = user.Username,
                Role = user.Role.ToString(),
                FullName = user.FullName,
                AvatarUrl = user.AvatarUrl
            }
        };
    }
}
