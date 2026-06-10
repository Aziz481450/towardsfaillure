namespace TowardsFailure.API.DTOs.Program;

public class CreateProgramDto
{
    public string Name { get; set; } = null!;
    public string? Goal { get; set; }
    public string? Description { get; set; }
    public bool IsPublic { get; set; }
}

public class UpdateProgramDto
{
    public string? Name { get; set; }
    public string? Goal { get; set; }
    public string? Description { get; set; }
    public bool? IsPublic { get; set; }
}

public class AddWeekDto
{
    public string Name { get; set; } = null!;
    public List<AddDayDto> Days { get; set; } = new();
}

public class AddDayDto
{
    public string Name { get; set; } = null!;
    public List<AddExerciseDto> Exercises { get; set; } = new();
}

public class AddExerciseDto
{
    public string ExerciseId { get; set; } = null!;
    public string ExerciseName { get; set; } = null!;
    public int Sets { get; set; }
    public int Reps { get; set; }
    public int RestSeconds { get; set; }
    public double? Rpe { get; set; }
}

public class ProgramDto
{
    public string Id { get; set; } = null!;
    public string UserId { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string? Goal { get; set; }
    public string? Description { get; set; }
    public List<WeekDto> Weeks { get; set; } = new();
    public bool IsPublic { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class WeekDto
{
    public string Name { get; set; } = null!;
    public List<DayDto> Days { get; set; } = new();
}

public class DayDto
{
    public string Name { get; set; } = null!;
    public List<ExerciseDto> Exercises { get; set; } = new();
}

public class ExerciseDto
{
    public string ExerciseId { get; set; } = null!;
    public string ExerciseName { get; set; } = null!;
    public int Sets { get; set; }
    public int Reps { get; set; }
    public int RestSeconds { get; set; }
    public double? Rpe { get; set; }
}
