using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TowardsFailure.API.Models;

public class TrainingProgram
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;

    public string UserId { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string? Goal { get; set; }
    public string? Description { get; set; }
    public List<ProgramWeek> Weeks { get; set; } = new();
    public bool IsPublic { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class ProgramWeek
{
    public string Name { get; set; } = null!;
    public List<ProgramDay> Days { get; set; } = new();
}

public class ProgramDay
{
    public string Name { get; set; } = null!;
    public List<ProgramExercise> Exercises { get; set; } = new();
}

public class ProgramExercise
{
    public string ExerciseId { get; set; } = null!;
    public string ExerciseName { get; set; } = null!;
    public int Sets { get; set; }
    public int Reps { get; set; }
    public int RestSeconds { get; set; }
    public double? Rpe { get; set; }
}
