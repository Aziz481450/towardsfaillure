using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TowardsFailure.API.DTOs.Common;
using TowardsFailure.API.DTOs.Email;
using TowardsFailure.API.Services;

namespace TowardsFailure.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmailController : ControllerBase
{
    private readonly IEmailService _emailService;
    private readonly IConfiguration _config;

    public EmailController(IEmailService emailService, IConfiguration config)
    {
        _emailService = emailService;
        _config = config;
    }

    [HttpPost("invite")]
    [Authorize]
    public async Task<ActionResult<ApiResponse<object>>> SendInvite([FromBody] SendInviteDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.ToEmail))
            return BadRequest(ApiResponse<object>.Fail("Email is required"));

        var result = await _emailService.TrySendWorkoutInviteAsync(dto);
        if (result.IsSuccess)
            return Ok(ApiResponse<object>.Ok(new { }, "Invitation sent successfully"));

        return StatusCode(500, ApiResponse<object>.Fail(result.ErrorMessage ?? "SMTP error"));
    }

    [HttpGet("diagnostic")]
    [Authorize]
    public async Task<ActionResult<ApiResponse<object>>> Diagnostic()
    {
        var emailSection = _config.GetSection("Email");
        var host = emailSection["Host"] ?? "not set";
        var port = emailSection["Port"] ?? "not set";
        var user = emailSection["Username"] ?? "not set";
        var pass = emailSection["Password"] ?? "not set";

        string connectivity;
        try
        {
            using var tcp = new System.Net.Sockets.TcpClient();
            await tcp.ConnectAsync(host, int.Parse(port));
            connectivity = "OK (connected)";
        }
        catch (Exception ex)
        {
            connectivity = $"FAILED: {ex.Message}";
        }

        return Ok(ApiResponse<object>.Ok(new
        {
            Host = host,
            Port = port,
            Username = user,
            PasswordConfigured = !string.IsNullOrWhiteSpace(pass) && pass != "your-gmail-app-password",
            PasswordLength = pass.Length,
            SmtpConnectivity = connectivity,
        }));
    }
}
