namespace TowardsFailure.API.DTOs.Workout;

public class StartSessionDto
{
    public string? ProgramId { get; set; }
    public string? ProgramName { get; set; }
}

public class LogExerciseDto
{
    public string ExerciseId { get; set; } = null!;
    public string ExerciseName { get; set; } = null!;
    public string? MuscleGroup { get; set; }
    public List<LogSetDto> Sets { get; set; } = new();
}

public class LogSetDto
{
    public double Weight { get; set; }
    public int Reps { get; set; }
    public double? Rpe { get; set; }
    public bool IsSuccess { get; set; } = true;
}

public class CompleteSessionDto
{
    public int DurationMinutes { get; set; }
    public string? Notes { get; set; }
    public List<LogExerciseDto> Exercises { get; set; } = new();
}

public class SessionDto
{
    public string Id { get; set; } = null!;
    public string UserId { get; set; } = null!;
    public string? ProgramId { get; set; }
    public string? ProgramName { get; set; }
    public DateTime Date { get; set; }
    public int DurationMinutes { get; set; }
    public List<SessionExerciseDto> Exercises { get; set; } = new();
    public double TotalVolume { get; set; }
    public string? Notes { get; set; }
}

public class SessionExerciseDto
{
    public string ExerciseId { get; set; } = null!;
    public string ExerciseName { get; set; } = null!;
    public string? MuscleGroup { get; set; }
    public List<SetDto> Sets { get; set; } = new();
}

public class SetDto
{
    public double Weight { get; set; }
    public int Reps { get; set; }
    public double? Rpe { get; set; }
    public bool IsSuccess { get; set; }
}
