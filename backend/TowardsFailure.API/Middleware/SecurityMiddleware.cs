namespace TowardsFailure.API.Middleware;

public class SecurityMiddleware
{
    private readonly RequestDelegate _next;
    private static readonly string[] WriteMethods = ["POST", "PUT", "PATCH", "DELETE"];
    private const string RequiredHeader = "X-IRONTRACK-CSRF";
    private const string ExpectedValue = "1";

    public SecurityMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Security headers
        context.Response.Headers["X-Content-Type-Options"] = "nosniff";
        context.Response.Headers["X-Frame-Options"] = "DENY";
        context.Response.Headers["X-XSS-Protection"] = "1; mode=block";
        context.Response.Headers["Referrer-Policy"] = "strict-origin-when-cross-origin";
        context.Response.Headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()";
        context.Response.Headers["Cross-Origin-Opener-Policy"] = "same-origin";
        context.Response.Headers["Cross-Origin-Resource-Policy"] = "same-origin";

        // CSRF validation for state-changing requests
        var method = context.Request.Method.ToUpperInvariant();
        if (WriteMethods.Contains(method))
        {
            var path = context.Request.Path.Value ?? "";
            // Skip auth endpoints (login/register are public)
            if (!path.Contains("/api/auth/", StringComparison.OrdinalIgnoreCase))
            {
                var csrf = context.Request.Headers[RequiredHeader].FirstOrDefault();
                if (csrf != ExpectedValue)
                {
                    context.Response.StatusCode = 403;
                    context.Response.Headers["X-CSRF-Failure"] = "true";
                    await context.Response.WriteAsJsonAsync(new
                    {
                        success = false,
                        message = "CSRF validation failed",
                        errors = new[] { "Missing or invalid X-IRONTRACK-CSRF header" }
                    });
                    return;
                }
            }
        }

        await _next(context);
    }
}
