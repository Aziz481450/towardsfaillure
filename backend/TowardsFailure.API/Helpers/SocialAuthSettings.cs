namespace TowardsFailure.API.Helpers;

public class SocialAuthSettings
{
    public string GoogleClientId { get; set; } = "";
    public string GoogleClientSecret { get; set; } = "";
    public string FacebookAppId { get; set; } = "";
    public string FacebookAppSecret { get; set; } = "";
    public string InstagramClientId { get; set; } = "";
    public string InstagramClientSecret { get; set; } = "";
    public string OAuthRedirectUri { get; set; } = "http://localhost:3000/oauth-callback";
    public string FrontendUrl { get; set; } = "http://localhost:3000";
}
