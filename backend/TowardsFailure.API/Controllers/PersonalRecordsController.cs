using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TowardsFailure.API.DTOs.Common;
using TowardsFailure.API.DTOs.PR;
using TowardsFailure.API.Services;

namespace TowardsFailure.API.Controllers;

[ApiController]
[Route("api/personal-records")]
[Authorize]
public class PersonalRecordsController : ControllerBase
{
    private readonly IPersonalRecordService _prService;

    public PersonalRecordsController(IPersonalRecordService prService)
    {
        _prService = prService;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<PersonalRecordDto>>>> GetMyRecords()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var records = await _prService.GetMyRecordsAsync(userId);
        return Ok(ApiResponse<List<PersonalRecordDto>>.Ok(records));
    }

    [HttpGet("recent")]
    public async Task<ActionResult<ApiResponse<List<PersonalRecordDto>>>> GetRecentRecords()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var records = await _prService.GetRecentRecordsAsync(userId);
        return Ok(ApiResponse<List<PersonalRecordDto>>.Ok(records));
    }
}
