using Microsoft.AspNetCore.Mvc;
using TowardsFailure.API.DTOs.Common;
using TowardsFailure.API.Models;
using TowardsFailure.API.Services;

namespace TowardsFailure.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExercisesController : ControllerBase
{
    private readonly IExerciseService _exerciseService;

    public ExercisesController(IExerciseService exerciseService)
    {
        _exerciseService = exerciseService;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<Exercise>>>> GetAll()
    {
        var exercises = await _exerciseService.GetAllAsync();
        return Ok(ApiResponse<List<Exercise>>.Ok(exercises));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<Exercise>>> GetById(string id)
    {
        var exercise = await _exerciseService.GetByIdAsync(id);
        return Ok(ApiResponse<Exercise>.Ok(exercise));
    }
}
