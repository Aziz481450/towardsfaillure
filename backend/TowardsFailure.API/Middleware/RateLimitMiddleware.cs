using System.Collections.Concurrent;

namespace TowardsFailure.API.Middleware;

public class RateLimitMiddleware
{
    private readonly RequestDelegate _next;
    private static readonly ConcurrentDictionary<string, RateEntry> _clients = new();
    private const int MaxRequests = 100;
    private static readonly TimeSpan Window = TimeSpan.FromMinutes(1);

    public RateLimitMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var ip = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        var entry = _clients.GetOrAdd(ip, _ => new RateEntry());
        lock (entry)
        {
            if (DateTime.UtcNow - entry.Start > Window)
            {
                entry.Start = DateTime.UtcNow;
                entry.Count = 0;
            }
            entry.Count++;
            if (entry.Count > MaxRequests)
            {
                context.Response.StatusCode = 429;
                context.Response.Headers["Retry-After"] = "60";
                context.Response.WriteAsJsonAsync(new
                {
                    success = false,
                    message = "Rate limit exceeded. Try again in 60 seconds."
                });
                return;
            }
        }

        await _next(context);
    }

    private class RateEntry
    {
        public DateTime Start { get; set; } = DateTime.UtcNow;
        public int Count { get; set; }
    }
}
