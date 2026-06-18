using TowardsFailure.API.Models;
using TowardsFailure.API.Repositories;

namespace TowardsFailure.API.Services;

public class ExerciseService : IExerciseService
{
    private readonly IExerciseRepository _exerciseRepo;

    public ExerciseService(IExerciseRepository exerciseRepo)
    {
        _exerciseRepo = exerciseRepo;
    }

    public async Task<List<Exercise>> GetAllAsync() =>
        await _exerciseRepo.GetAllAsync();

    public async Task<Exercise> GetByIdAsync(string id) =>
        await _exerciseRepo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException("Exercise not found");

    public async Task<Exercise> CreateAsync(Exercise exercise)
    {
        exercise.CreatedAt = DateTime.UtcNow;
        exercise.UpdatedAt = DateTime.UtcNow;
        await _exerciseRepo.CreateAsync(exercise);
        return exercise;
    }

    public async Task<Exercise> UpdateAsync(string id, Exercise dto)
    {
        var exercise = await _exerciseRepo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException("Exercise not found");

        if (dto.Name != null) exercise.Name = dto.Name;
        if (dto.MuscleGroup != null) exercise.MuscleGroup = dto.MuscleGroup;
        if (dto.Category != null) exercise.Category = dto.Category;
        if (dto.Equipment != null) exercise.Equipment = dto.Equipment;
        if (dto.Description != null) exercise.Description = dto.Description;
        exercise.UpdatedAt = DateTime.UtcNow;

        await _exerciseRepo.UpdateAsync(id, exercise);
        return exercise;
    }

    public async Task DeleteAsync(string id)
    {
        var exercise = await _exerciseRepo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException("Exercise not found");
        exercise.IsDeleted = true;
        exercise.UpdatedAt = DateTime.UtcNow;
        await _exerciseRepo.UpdateAsync(id, exercise);
    }
}
