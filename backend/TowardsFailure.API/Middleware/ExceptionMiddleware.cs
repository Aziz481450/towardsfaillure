using System.Net;
using System.Text.Json;
using TowardsFailure.API.DTOs.Common;

namespace TowardsFailure.API.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (UnauthorizedAccessException ex)
        {
            _logger.LogWarning(ex, "Unauthorized access");
            context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
            await WriteError(context, "Unauthorized", ex.Message);
        }
        catch (KeyNotFoundException ex)
        {
            _logger.LogWarning(ex, "Resource not found");
            context.Response.StatusCode = (int)HttpStatusCode.NotFound;
            await WriteError(context, "Not Found", ex.Message);
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "Invalid operation");
            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            await WriteError(context, "Bad Request", ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception");
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            await WriteError(context, "Internal Server Error", "An unexpected error occurred");
        }
    }

    private static async Task WriteError(HttpContext context, string title, string detail)
    {
        context.Response.ContentType = "application/json";
        var response = ApiResponse<object>.Fail(detail);
        var json = JsonSerializer.Serialize(response);
        await context.Response.WriteAsync(json);
    }
}
