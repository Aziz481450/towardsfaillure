using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TowardsFailure.API.Models;

public class WorkoutSession
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;

    public string UserId { get; set; } = null!;
    public string? ProgramId { get; set; }
    public string? ProgramName { get; set; }
    public DateTime Date { get; set; }
    public int DurationMinutes { get; set; }
    public List<SessionExercise> Exercises { get; set; } = new();
    public double TotalVolume { get; set; }
    public string? Notes { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class SessionExercise
{
    public string ExerciseId { get; set; } = null!;
    public string ExerciseName { get; set; } = null!;
    public string? MuscleGroup { get; set; }
    public List<ExerciseSet> Sets { get; set; } = new();
}

public class ExerciseSet
{
    public double Weight { get; set; }
    public int Reps { get; set; }
    public double? Rpe { get; set; }
    public bool IsSuccess { get; set; } = true;
}
