using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using TowardsFailure.API.DTOs.Auth;
using TowardsFailure.API.DTOs.Common;
using TowardsFailure.API.Models;
using TowardsFailure.API.Repositories;
using TowardsFailure.API.Services;

namespace TowardsFailure.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IUserRepository _userRepo;
    private readonly IMagicLoginRepository _magicRepo;
    private readonly IEmailService _emailService;
    private readonly IConfiguration _config;

    public AuthController(IAuthService authService, IUserRepository userRepo, IMagicLoginRepository magicRepo, IEmailService emailService, IConfiguration config)
    {
        _authService = authService;
        _userRepo = userRepo;
        _magicRepo = magicRepo;
        _emailService = emailService;
        _config = config;
    }

    [HttpPost("send-magic-link")]
    public async Task<ActionResult<ApiResponse<object>>> SendMagicLink(SendMagicLinkDto dto)
    {
        var user = await _userRepo.GetByEmailAsync(dto.Email);
        if (user == null)
            return Ok(ApiResponse<object>.Ok(new { }, "If this email exists, a magic link has been sent."));

        var token = Convert.ToHexString(RandomNumberGenerator.GetBytes(32));
        var magicToken = new MagicLoginToken
        {
            Email = dto.Email,
            Token = token,
            ExpiresAt = DateTime.UtcNow.AddMinutes(15)
        };
        await _magicRepo.CreateAsync(magicToken);

        var frontendUrl = Request.Headers.Origin.FirstOrDefault()
            ?? _config.GetValue<string>("FrontendUrl")
            ?? Environment.GetEnvironmentVariable("FRONTEND_URL")
            ?? "https://irontrack-ui.onrender.com";
        var link = $"{frontendUrl.TrimEnd('/')}/magic-login?token={token}";

        _ = Task.Run(() => _emailService.TrySendMagicLinkAsync(dto.Email, link));

        return Ok(ApiResponse<object>.Ok(new { magicLink = link, message = "Magic link generated" }, "If this email exists, a magic link has been sent."));
    }

    [HttpGet("verify-magic-link")]
    public async Task<ActionResult<ApiResponse<TokenResponseDto>>> VerifyMagicLink([FromQuery] string token)
    {
        var magicToken = await _magicRepo.GetByTokenAsync(token);
        if (magicToken == null)
            return BadRequest(ApiResponse<TokenResponseDto>.Fail("Invalid or expired token."));

        var user = await _userRepo.GetByEmailAsync(magicToken.Email);
        if (user == null)
            return BadRequest(ApiResponse<TokenResponseDto>.Fail("User not found."));

        await _magicRepo.MarkUsedAsync(magicToken.Id);

        var result = await _authService.GenerateTokenAsync(user);
        return Ok(ApiResponse<TokenResponseDto>.Ok(result, "Magic link login successful"));
    }

    [HttpPost("register")]
    public async Task<ActionResult<ApiResponse<TokenResponseDto>>> Register(RegisterDto dto)
    {
        var result = await _authService.RegisterAsync(dto);
        return Ok(ApiResponse<TokenResponseDto>.Ok(result, "Registration successful"));
    }

    [HttpPost("login")]
    public async Task<ActionResult<ApiResponse<TokenResponseDto>>> Login(LoginDto dto)
    {
        var result = await _authService.LoginAsync(dto);
        return Ok(ApiResponse<TokenResponseDto>.Ok(result, "Login successful"));
    }

    [HttpPost("social-login")]
    public async Task<ActionResult<ApiResponse<TokenResponseDto>>> SocialLogin(SocialLoginDto dto)
    {
        var result = await _authService.SocialLoginAsync(dto);
        return Ok(ApiResponse<TokenResponseDto>.Ok(result, $"Social login ({dto.Provider}) successful"));
    }
}
