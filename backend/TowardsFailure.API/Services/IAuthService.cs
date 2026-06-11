using TowardsFailure.API.DTOs.Auth;
using TowardsFailure.API.Models;

namespace TowardsFailure.API.Services;

public interface IAuthService
{
    Task<TokenResponseDto> RegisterAsync(RegisterDto dto);
    Task<TokenResponseDto> LoginAsync(LoginDto dto);
    Task<TokenResponseDto> SocialLoginAsync(SocialLoginDto dto);
    Task<TokenResponseDto> GenerateTokenAsync(User user);
}
