using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TowardsFailure.API.Models;

public class Exercise
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;
    public string? MuscleGroup { get; set; }
    public string? Category { get; set; }
    public string? Equipment { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
