using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using TowardsFailure.API.Models.Enums;

namespace TowardsFailure.API.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;

    public string Email { get; set; } = null!;
    public string Username { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;

    [BsonRepresentation(BsonType.String)]
    public UserRole Role { get; set; } = UserRole.User;

    public string? FullName { get; set; }
    public string? AvatarUrl { get; set; }
    public string? CoachId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public bool IsDeleted { get; set; }
}
