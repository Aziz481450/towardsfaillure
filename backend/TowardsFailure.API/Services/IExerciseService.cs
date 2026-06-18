using TowardsFailure.API.Models;

namespace TowardsFailure.API.Services;

public interface IExerciseService
{
    Task<List<Exercise>> GetAllAsync();
    Task<Exercise> GetByIdAsync(string id);
    Task<Exercise> CreateAsync(Exercise exercise);
    Task<Exercise> UpdateAsync(string id, Exercise exercise);
    Task DeleteAsync(string id);
}
