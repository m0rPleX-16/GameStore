using GameStore.Api.Data;
using GameStore.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddValidation();
builder.AddGameStoreDatabase();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("CorsPolicy");

app.MapGamesEndpoints();
app.MapGenresEnpoints();

app.MigrateDatabase();

app.Run();
