using TowardsFailure.API.Models;

namespace TowardsFailure.API.Repositories;

public interface IProgramRepository
{
    Task<TrainingProgram?> GetByIdAsync(string id);
    Task<List<TrainingProgram>> GetByUserIdAsync(string userId);
    Task<List<TrainingProgram>> GetPublicProgramsAsync();
    Task CreateAsync(TrainingProgram program);
    Task UpdateAsync(string id, TrainingProgram program);
    Task DeleteAsync(string id);
}
