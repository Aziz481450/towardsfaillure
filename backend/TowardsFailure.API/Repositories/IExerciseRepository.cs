using TowardsFailure.API.Models;

namespace TowardsFailure.API.Repositories;

public interface IExerciseRepository
{
    Task<Exercise?> GetByIdAsync(string id);
    Task<List<Exercise>> GetAllAsync();
    Task<List<Exercise>> GetByMuscleGroupAsync(string muscleGroup);
    Task CreateAsync(Exercise exercise);
    Task UpdateAsync(string id, Exercise exercise);
    Task DeleteAsync(string id);
}
