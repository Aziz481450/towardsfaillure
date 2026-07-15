using TowardsFailure.API.DTOs.Email;

namespace TowardsFailure.API.Services;

public class EmailSendResult
{
    public bool IsSuccess { get; set; }
    public string? ErrorMessage { get; set; }
}

public interface IEmailService
{
    Task<EmailSendResult> TrySendWorkoutInviteAsync(SendInviteDto dto, string toEmail, string frontendUrl);
    Task<EmailSendResult> TrySendMagicLinkAsync(string toEmail, string link);
}
