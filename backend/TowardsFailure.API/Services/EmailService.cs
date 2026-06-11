using System.Net;
using System.Net.Mail;
using TowardsFailure.API.DTOs.Email;
using TowardsFailure.API.Helpers;

namespace TowardsFailure.API.Services;

public class EmailService : IEmailService
{
    private readonly EmailSettings _settings;

    public EmailService(IConfiguration config)
    {
        _settings = config.GetSection("Email").Get<EmailSettings>() ?? new EmailSettings();
    }

    public async Task<EmailSendResult> TrySendMagicLinkAsync(string toEmail, string link)
    {
        try
        {
            var subject = "Magic link — Connexion IronTrack";

            var body = $@"<!DOCTYPE html>
<html lang=""fr"">
<head>
  <meta charset=""utf-8"">
  <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
  <title>Magic Link IronTrack</title>
</head>
<body style=""margin:0;padding:0;background-color:#0A0A0F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif;"">
  <table role=""presentation"" width=""100%"" cellpadding=""0"" cellspacing=""0"" style=""background-color:#0A0A0F;"">
    <tr>
      <td align=""center"" style=""padding:40px 16px;"">
        <table role=""presentation"" width=""560"" cellpadding=""0"" cellspacing=""0"" style=""max-width:560px;width:100%;"">
          <tr>
            <td align=""center"" style=""padding-bottom:32px;"">
              <table role=""presentation"" cellpadding=""0"" cellspacing=""0"">
                <tr>
                  <td style=""background:rgba(220,38,38,0.1);border-radius:10px;padding:8px 16px;"">
                    <span style=""color:#DC2626;font-weight:800;font-size:15px;letter-spacing:0.15em;"">IRON</span>
                    <span style=""color:#F0EEE8;font-weight:300;font-size:15px;letter-spacing:0.15em;"">TRACK</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr><td style=""height:1px;background:linear-gradient(90deg,transparent,rgba(240,238,232,0.08),transparent);""></td></tr>
          <tr>
            <td align=""center"" style=""padding:36px 0 8px;"">
              <h1 style=""color:#F0EEE8;font-size:22px;font-weight:700;margin:16px 0 4px;letter-spacing:-0.02em;"">
                Connexion à IronTrack
              </h1>
              <p style=""color:rgba(240,238,232,0.35);font-size:14px;line-height:1.5;margin:0;"">
                Cliquez sur le bouton ci-dessous pour vous connecter instantanément
              </p>
            </td>
          </tr>
          <tr>
            <td align=""center"" style=""padding:32px 0;"">
              <table role=""presentation"" cellpadding=""0"" cellspacing=""0"">
                <tr>
                  <td style=""background:#DC2626;border-radius:10px;padding:0;"">
                    <a href=""{link}"" target=""_blank"" style=""display:inline-block;padding:13px 36px;color:#FFFFFF;font-size:14px;font-weight:600;text-decoration:none;letter-spacing:0.02em;"">
                      Se connecter &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr><td style=""height:1px;background:linear-gradient(90deg,transparent,rgba(240,238,232,0.08),transparent);""></td></tr>
          <tr>
            <td align=""center"" style=""padding:24px 0 0;"">
              <p style=""color:rgba(240,238,232,0.1);font-size:11px;line-height:1.5;margin:0;"">
                Si vous n'avez pas demandé cette connexion, ignorez cet email.
              </p>
              <p style=""color:rgba(240,238,232,0.06);font-size:10px;margin:8px 0 0;"">
                Ce lien expire dans 15 minutes.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>";

            using var msg = new MailMessage();
            msg.From = new MailAddress(_settings.Username, _settings.FromName);
            msg.To.Add(new MailAddress(toEmail));
            msg.Subject = subject;
            msg.Body = body;
            msg.IsBodyHtml = true;

            using var client = new SmtpClient(_settings.Host, _settings.Port)
            {
                Credentials = new NetworkCredential(_settings.Username, _settings.Password),
                EnableSsl = true,
                Timeout = 15000,
            };

            await client.SendMailAsync(msg);
            return Ok();
        }
        catch (Exception ex)
        {
            return Fail($"Magic link email failed: {ex.Message}");
        }
    }

    public async Task<EmailSendResult> TrySendWorkoutInviteAsync(SendInviteDto dto)
    {
        try
        {
            var subject = $"{dto.SenderName} t'invite à voir son entraînement sur IronTrack !";

            var body = BuildEmailBody(dto);

            using var msg = new MailMessage();
            msg.From = new MailAddress(_settings.Username, _settings.FromName);
            msg.To.Add(new MailAddress(dto.ToEmail, dto.ToName));
            msg.Subject = subject;
            msg.Body = body;
            msg.IsBodyHtml = true;

            using var client = new SmtpClient(_settings.Host, _settings.Port)
            {
                Credentials = new NetworkCredential(_settings.Username, _settings.Password),
                EnableSsl = true,
                Timeout = 15000,
            };

            await client.SendMailAsync(msg);
            return Ok();
        }
        catch (SmtpException ex)
        {
            var detail = ex.Message;
            if (detail.Contains("5.7.0") || detail.Contains("Authentication"))
                return Fail($"Gmail rejected authentication. Make sure you're using a Gmail App Password (NOT your regular password). Current username: {_settings.Username}. Error: {detail}");
            return Fail($"SMTP error: {detail}");
        }
        catch (InvalidOperationException ex)
        {
            return Fail(ex.Message);
        }
        catch (Exception ex)
        {
            return Fail($"Unexpected error: {ex.Message}");
        }
    }

    private static string BuildEmailBody(SendInviteDto dto)
    {
        return $@"<!DOCTYPE html>
<html lang=""fr"">
<head>
  <meta charset=""utf-8"">
  <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
  <title>Invitation IronTrack</title>
</head>
<body style=""margin:0;padding:0;background-color:#0A0A0F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif;"">
  <table role=""presentation"" width=""100%"" cellpadding=""0"" cellspacing=""0"" style=""background-color:#0A0A0F;"">
    <tr>
      <td align=""center"" style=""padding:40px 16px;"">
        <table role=""presentation"" width=""560"" cellpadding=""0"" cellspacing=""0"" style=""max-width:560px;width:100%;"">

          <!-- Logo / Brand -->
          <tr>
            <td align=""center"" style=""padding-bottom:32px;"">
              <table role=""presentation"" cellpadding=""0"" cellspacing=""0"">
                <tr>
                  <td style=""background:rgba(220,38,38,0.1);border-radius:10px;padding:8px 16px;"">
                    <span style=""color:#DC2626;font-weight:800;font-size:15px;letter-spacing:0.15em;"">IRON</span>
                    <span style=""color:#F0EEE8;font-weight:300;font-size:15px;letter-spacing:0.15em;"">TRACK</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style=""height:1px;background:linear-gradient(90deg,transparent,rgba(240,238,232,0.08),transparent);""></td></tr>

          <!-- Hero -->
          <tr>
            <td align=""center"" style=""padding:36px 0 8px;"">
              <table role=""presentation"" cellpadding=""0"" cellspacing=""0"">
                <tr>
                  <td style=""width:56px;height:56px;border-radius:50%;background:rgba(0,229,200,0.1);text-align:center;vertical-align:middle;"">
                    <span style=""font-size:24px;line-height:56px;"">🏋️</span>
                  </td>
                </tr>
              </table>
              <h1 style=""color:#F0EEE8;font-size:22px;font-weight:700;margin:16px 0 4px;letter-spacing:-0.02em;"">
                {dto.SenderName} vous invite à voir son entraînement
              </h1>
              <p style=""color:rgba(240,238,232,0.35);font-size:14px;line-height:1.5;margin:0;"">
                Découvrez sa séance et suivez sa progression sur IronTrack
              </p>
            </td>
          </tr>

          <!-- Program Card -->
          <tr>
            <td style=""padding:24px 0;"">
              <table role=""presentation"" width=""100%"" cellpadding=""0"" cellspacing=""0"" style=""background:#0D0D16;border:1px solid rgba(240,238,232,0.06);border-radius:14px;overflow:hidden;"">
                <tr>
                  <td style=""padding:20px 24px;"">
                    <p style=""color:rgba(240,238,232,0.3);font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 8px;"">PROGRAMME</p>
                    <p style=""color:#F0EEE8;font-size:17px;font-weight:600;margin:0 0 4px;"">{dto.ProgramName}</p>
                    <p style=""color:rgba(240,238,232,0.4);font-size:13px;line-height:1.4;margin:0;"">{dto.WorkoutSummary}</p>
                  </td>
                </tr>
                <tr><td style=""height:1px;background:rgba(240,238,232,0.04);""></td></tr>
                <tr>
                  <td style=""padding:16px 24px;"">
                    <table role=""presentation"" width=""100%"" cellpadding=""0"" cellspacing=""0"">
                      <tr>
                        <td width=""33%"" style=""text-align:center;padding:8px 4px;"">
                          <p style=""color:#00E5C8;font-size:22px;font-weight:700;margin:0;line-height:1.2;"">{dto.TotalVolume}</p>
                          <p style=""color:rgba(240,238,232,0.2);font-size:10px;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;margin:4px 0 0;"">Volume</p>
                        </td>
                        <td width=""33%"" style=""text-align:center;padding:8px 4px;border-left:1px solid rgba(240,238,232,0.04);border-right:1px solid rgba(240,238,232,0.04);"">
                          <p style=""color:#00E5C8;font-size:22px;font-weight:700;margin:0;line-height:1.2;"">{dto.Duration}</p>
                          <p style=""color:rgba(240,238,232,0.2);font-size:10px;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;margin:4px 0 0;"">Durée</p>
                        </td>
                        <td width=""33%"" style=""text-align:center;padding:8px 4px;"">
                          <p style=""color:#00E5C8;font-size:22px;font-weight:700;margin:0;line-height:1.2;"">{dto.ExercisesCount}</p>
                          <p style=""color:rgba(240,238,232,0.2);font-size:10px;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;margin:4px 0 0;"">Exercices</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align=""center"" style=""padding:8px 0 24px;"">
              <table role=""presentation"" cellpadding=""0"" cellspacing=""0"">
                <tr>
                  <td style=""background:#DC2626;border-radius:10px;padding:0;"">
                    <a href=""http://localhost:3000/dashboard"" target=""_blank"" style=""display:inline-block;padding:13px 36px;color:#FFFFFF;font-size:14px;font-weight:600;text-decoration:none;letter-spacing:0.02em;"">
                      Voir sur IronTrack &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style=""height:1px;background:linear-gradient(90deg,transparent,rgba(240,238,232,0.08),transparent);""></td></tr>

          <!-- Footer -->
          <tr>
            <td align=""center"" style=""padding:24px 0 0;"">
              <p style=""color:rgba(240,238,232,0.1);font-size:11px;line-height:1.5;margin:0;"">
                IronTrack &mdash; La plateforme de musculation la plus avancée au monde
              </p>
              <p style=""color:rgba(240,238,232,0.06);font-size:10px;margin:8px 0 0;"">
                Cet email a été envoyé à {dto.ToEmail} &middot; IronTrack Coach
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>";
    }

    private static EmailSendResult Ok() => new() { IsSuccess = true };
    private static EmailSendResult Fail(string msg) => new() { IsSuccess = false, ErrorMessage = msg };
}
