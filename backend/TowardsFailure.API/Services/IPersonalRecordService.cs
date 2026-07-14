using TowardsFailure.API.DTOs.PR;

namespace TowardsFailure.API.Services;

public interface IPersonalRecordService
{
    Task<List<PersonalRecordDto>> GetMyRecordsAsync(string userId);
    Task<List<PersonalRecordDto>> GetRecentRecordsAsync(string userId);
}
