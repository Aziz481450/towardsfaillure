namespace TowardsFailure.API.DTOs.PR;

public class PersonalRecordDto
{
    public string Id { get; set; } = null!;
    public string UserId { get; set; } = null!;
    public string ExerciseId { get; set; } = null!;
    public string ExerciseName { get; set; } = null!;
    public string Type { get; set; } = null!;
    public double Value { get; set; }
    public DateTime AchievedAt { get; set; }
}
