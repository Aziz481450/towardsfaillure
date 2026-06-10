using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using TowardsFailure.API.Helpers;
using TowardsFailure.API.Middleware;
using TowardsFailure.API.Repositories;
using TowardsFailure.API.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "IronTrack API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var jwtSettings = builder.Configuration.GetSection("Jwt").Get<JwtSettings>()!;
var key = Encoding.UTF8.GetBytes(jwtSettings.Secret);

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidIssuer = jwtSettings.Issuer,
        ValidateAudience = true,
        ValidAudience = jwtSettings.Audience,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

// HTTP client for social auth
builder.Services.AddHttpClient();

// Repositories
builder.Services.AddSingleton<IUserRepository, UserRepository>();
builder.Services.AddSingleton<IProgramRepository, ProgramRepository>();
builder.Services.AddSingleton<IWorkoutSessionRepository, WorkoutSessionRepository>();
builder.Services.AddSingleton<IExerciseRepository, ExerciseRepository>();
builder.Services.AddSingleton<IPersonalRecordRepository, PersonalRecordRepository>();
builder.Services.AddSingleton<INotificationRepository, NotificationRepository>();

// Services
builder.Services.AddSingleton<IAuthService, AuthService>();
builder.Services.AddSingleton<IUserService, UserService>();
builder.Services.AddSingleton<IProgramService, ProgramService>();
builder.Services.AddSingleton<IWorkoutService, WorkoutService>();
builder.Services.AddSingleton<IPersonalRecordService, PersonalRecordService>();
builder.Services.AddSingleton<IExerciseService, ExerciseService>();
builder.Services.AddSingleton<IEmailService, EmailService>();
builder.Services.AddSingleton<IMagicLoginRepository, MagicLoginRepository>();

builder.Services.AddCors(o =>
{
    o.AddPolicy("AllowAll", p =>
    {
        p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");
app.UseMiddleware<ExceptionMiddleware>();
app.UseMiddleware<SecurityMiddleware>();
app.UseMiddleware<RateLimitMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
