namespace TowardsFailure.API.DTOs.Email;

public class SendInviteDto
{
    public List<string> ToEmails { get; set; } = new();
    public string SenderName { get; set; } = "";
    public string ProgramName { get; set; } = "";
    public string WorkoutSummary { get; set; } = "";
    public string TotalVolume { get; set; } = "";
    public string Duration { get; set; } = "";
    public string ExercisesCount { get; set; } = "";
}
