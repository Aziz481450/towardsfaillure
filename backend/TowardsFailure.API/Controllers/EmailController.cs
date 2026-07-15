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
        if (dto.ToEmails == null || dto.ToEmails.Count == 0)
            return BadRequest(ApiResponse<object>.Fail("At least one email is required"));

        var frontendUrl = Request.Headers.Origin.FirstOrDefault()
            ?? _config.GetValue<string>("FrontendUrl")
            ?? Environment.GetEnvironmentVariable("FRONTEND_URL")
            ?? "https://irontrack-ui.onrender.com";

        var sent = 0; var errors = new List<string>();
        foreach (var email in dto.ToEmails)
        {
            if (string.IsNullOrWhiteSpace(email)) continue;
            var result = await _emailService.TrySendWorkoutInviteAsync(dto, email.Trim(), frontendUrl);
            if (result.IsSuccess) sent++;
            else errors.Add($"{email}: {result.ErrorMessage}");
        }

        if (sent > 0)
            return Ok(ApiResponse<object>.Ok(new { sent, total = dto.ToEmails.Count }, $"{sent}/{dto.ToEmails.Count} invitation(s) sent"));

        return StatusCode(500, ApiResponse<object>.Fail(errors.FirstOrDefault() ?? "SMTP error"));
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
