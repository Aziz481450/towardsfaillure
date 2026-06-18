using TowardsFailure.API.DTOs.Program;

namespace TowardsFailure.API.Services;

public interface IProgramService
{
    Task<List<ProgramDto>> GetMyProgramsAsync(string userId);
    Task<List<ProgramDto>> GetPublicProgramsAsync();
    Task<ProgramDto> GetByIdAsync(string id);
    Task<ProgramDto> CreateAsync(string userId, CreateProgramDto dto);
    Task<ProgramDto> UpdateAsync(string id, string userId, UpdateProgramDto dto);
    Task DeleteAsync(string id, string userId);
    Task<ProgramDto> AddWeekAsync(string programId, string userId, AddWeekDto dto);
    Task<ProgramDto> CloneProgramAsync(string programId, string userId);
}
