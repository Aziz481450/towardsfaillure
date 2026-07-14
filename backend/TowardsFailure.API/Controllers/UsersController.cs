using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TowardsFailure.API.DTOs.Common;
using TowardsFailure.API.DTOs.User;
using TowardsFailure.API.Services;

namespace TowardsFailure.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("me")]
    public async Task<ActionResult<ApiResponse<UserProfileDto>>> GetProfile()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var profile = await _userService.GetProfileAsync(userId);
        return Ok(ApiResponse<UserProfileDto>.Ok(profile));
    }

    [HttpPut("me")]
    public async Task<ActionResult<ApiResponse<UserProfileDto>>> UpdateProfile(UpdateUserDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var profile = await _userService.UpdateProfileAsync(userId, dto);
        return Ok(ApiResponse<UserProfileDto>.Ok(profile));
    }

    [HttpGet("athletes")]
    [Authorize(Roles = "Coach")]
    public async Task<ActionResult<ApiResponse<List<UserProfileDto>>>> GetAthletes()
    {
        var coachId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var athletes = await _userService.GetAthletesAsync(coachId);
        return Ok(ApiResponse<List<UserProfileDto>>.Ok(athletes));
    }
}
