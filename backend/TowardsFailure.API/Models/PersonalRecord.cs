using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TowardsFailure.API.Models;

public class PersonalRecord
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;

    public string UserId { get; set; } = null!;
    public string ExerciseId { get; set; } = null!;
    public string ExerciseName { get; set; } = null!;
    public string Type { get; set; } = null!; // 1RM | max_reps | max_volume
    public double Value { get; set; }
    public DateTime AchievedAt { get; set; }
    public string? SessionId { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
