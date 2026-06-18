using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TowardsFailure.API.DTOs.Common;
using TowardsFailure.API.DTOs.Workout;
using TowardsFailure.API.Services;

namespace TowardsFailure.API.Controllers;

[ApiController]
[Route("api/workout-sessions")]
[Authorize]
public class WorkoutSessionsController : ControllerBase
{
    private readonly IWorkoutService _workoutService;

    public WorkoutSessionsController(IWorkoutService workoutService)
    {
        _workoutService = workoutService;
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<SessionDto>>> StartSession(StartSessionDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var session = await _workoutService.StartSessionAsync(userId, dto);
        return CreatedAtAction(nameof(GetSession), new { id = session.Id },
            ApiResponse<SessionDto>.Ok(session, "Session started"));
    }

    [HttpPut("{id}/complete")]
    public async Task<ActionResult<ApiResponse<SessionDto>>> CompleteSession(string id, CompleteSessionDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var session = await _workoutService.CompleteSessionAsync(id, userId, dto);
        return Ok(ApiResponse<SessionDto>.Ok(session, "Session completed"));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<SessionDto>>> GetSession(string id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var session = await _workoutService.GetSessionAsync(id, userId);
        return Ok(ApiResponse<SessionDto>.Ok(session));
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<SessionDto>>>> GetSessions(
        [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var sessions = await _workoutService.GetSessionsAsync(userId, page, pageSize);
        return Ok(ApiResponse<List<SessionDto>>.Ok(sessions));
    }

    [HttpGet("range")]
    public async Task<ActionResult<ApiResponse<List<SessionDto>>>> GetSessionsByDateRange(
        [FromQuery] DateTime from, [FromQuery] DateTime to)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var sessions = await _workoutService.GetSessionsByDateRangeAsync(userId, from, to);
        return Ok(ApiResponse<List<SessionDto>>.Ok(sessions));
    }
}
