using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TowardsFailure.API.DTOs.Common;
using TowardsFailure.API.DTOs.User;
using TowardsFailure.API.Models;
using TowardsFailure.API.Services;

namespace TowardsFailure.API.Controllers;

[ApiController]
[Route("api/admin")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly IExerciseService _exerciseService;

    public AdminController(IExerciseService exerciseService)
    {
        _exerciseService = exerciseService;
    }

    [HttpPost("exercises")]
    public async Task<ActionResult<ApiResponse<Exercise>>> CreateExercise(Exercise exercise)
    {
        var result = await _exerciseService.CreateAsync(exercise);
        return CreatedAtAction(nameof(ExercisesController.GetById), "Exercises",
            new { id = result.Id }, ApiResponse<Exercise>.Ok(result, "Exercise created"));
    }

    [HttpPut("exercises/{id}")]
    public async Task<ActionResult<ApiResponse<Exercise>>> UpdateExercise(string id, Exercise exercise)
    {
        var result = await _exerciseService.UpdateAsync(id, exercise);
        return Ok(ApiResponse<Exercise>.Ok(result, "Exercise updated"));
    }

    [HttpDelete("exercises/{id}")]
    public async Task<ActionResult<ApiResponse<object>>> DeleteExercise(string id)
    {
        await _exerciseService.DeleteAsync(id);
        return Ok(ApiResponse<object>.Ok(null, "Exercise deleted"));
    }
}
