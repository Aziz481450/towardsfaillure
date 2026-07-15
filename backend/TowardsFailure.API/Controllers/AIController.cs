using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TowardsFailure.API.DTOs.Common;

namespace TowardsFailure.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AIController : ControllerBase
{
    private readonly IHttpClientFactory _httpFactory;
    private readonly string _ollamaUrl;

    public AIController(IHttpClientFactory httpFactory, IConfiguration config)
    {
        _httpFactory = httpFactory;
        _ollamaUrl = Environment.GetEnvironmentVariable("OLLAMA_URL")
            ?? config.GetValue<string>("OllamaUrl")
            ?? "http://localhost:11434";
    }

    [HttpPost("chat")]
    public async Task<ActionResult<ApiResponse<object>>> Chat([FromBody] ChatRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Message))
            return BadRequest(ApiResponse<object>.Fail("Message is required"));

        try
        {
            var client = _httpFactory.CreateClient();
            client.Timeout = TimeSpan.FromSeconds(60);

            var systemPrompt = @"Tu es IronCoach, un coach sportif expert spécialisé en musculation, nutrition et fitness. 
Tu connais tous les programmes PPL, Upper/Lower, Full Body, Bro Split, Powerlifting, Hypertrophie.
Tu réponds en français (sauf si l'utilisateur parle anglais). Sois précis, encourageant, et donne des conseils pratiques.
Réponds en 2-4 phrases maximum. utilise des emojis occasionnellement.";

            var payload = new
            {
                model = req.Model ?? "llama3",
                prompt = $"{systemPrompt}\n\nUtilisateur: {req.Message}\nAssistant:",
                stream = false
            };

            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await client.PostAsync($"{_ollamaUrl}/api/generate", content);
            response.EnsureSuccessStatusCode();

            var resultJson = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(resultJson);
            var text = doc.RootElement.GetProperty("response").GetString() ?? "Désolé, je n'ai pas pu générer de réponse.";

            return Ok(ApiResponse<object>.Ok(new { reply = text }));
        }
        catch (HttpRequestException ex)
        {
            return Ok(ApiResponse<object>.Ok(new { reply = $"⚠️ Ollama n'est pas accessible sur {_ollamaUrl}. Vérifie que le serveur Ollama tourne. Détail: {ex.Message}" }));
        }
        catch (TaskCanceledException)
        {
            return Ok(ApiResponse<object>.Ok(new { reply = "⏱️ Ollama a mis trop de temps à répondre (timeout 60s)." }));
        }
        catch (Exception ex)
        {
            return Ok(ApiResponse<object>.Ok(new { reply = $"Erreur: {ex.Message}" }));
        }
    }
}

public class ChatRequest
{
    public string Message { get; set; } = "";
    public string? Model { get; set; }
}
