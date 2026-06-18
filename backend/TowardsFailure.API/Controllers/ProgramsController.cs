using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TowardsFailure.API.DTOs.Common;
using TowardsFailure.API.DTOs.Program;
using TowardsFailure.API.Services;

namespace TowardsFailure.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProgramsController : ControllerBase
{
    private readonly IProgramService _programService;

    public ProgramsController(IProgramService programService)
    {
        _programService = programService;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<ProgramDto>>>> GetMyPrograms()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var programs = await _programService.GetMyProgramsAsync(userId);
        return Ok(ApiResponse<List<ProgramDto>>.Ok(programs));
    }

    [HttpGet("public")]
    public async Task<ActionResult<ApiResponse<List<ProgramDto>>>> GetPublicPrograms()
    {
        var programs = await _programService.GetPublicProgramsAsync();
        return Ok(ApiResponse<List<ProgramDto>>.Ok(programs));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<ProgramDto>>> GetById(string id)
    {
        var program = await _programService.GetByIdAsync(id);
        return Ok(ApiResponse<ProgramDto>.Ok(program));
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<ProgramDto>>> Create(CreateProgramDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var program = await _programService.CreateAsync(userId, dto);
        return CreatedAtAction(nameof(GetById), new { id = program.Id },
            ApiResponse<ProgramDto>.Ok(program, "Program created"));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ApiResponse<ProgramDto>>> Update(string id, UpdateProgramDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var program = await _programService.UpdateAsync(id, userId, dto);
        return Ok(ApiResponse<ProgramDto>.Ok(program, "Program updated"));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse<object>>> Delete(string id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        await _programService.DeleteAsync(id, userId);
        return Ok(ApiResponse<object>.Ok(null, "Program deleted"));
    }

    [HttpPost("{id}/weeks")]
    public async Task<ActionResult<ApiResponse<ProgramDto>>> AddWeek(string id, AddWeekDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var program = await _programService.AddWeekAsync(id, userId, dto);
        return Ok(ApiResponse<ProgramDto>.Ok(program, "Week added"));
    }

    [HttpPost("{id}/clone")]
    public async Task<ActionResult<ApiResponse<ProgramDto>>> Clone(string id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var program = await _programService.CloneProgramAsync(id, userId);
        return CreatedAtAction(nameof(GetById), new { id = program.Id },
            ApiResponse<ProgramDto>.Ok(program, "Program cloned"));
    }
}
