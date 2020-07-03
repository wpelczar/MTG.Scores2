using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MTG.Scores2.Api.DataAccess;
using MTG.Scores2.Api.Middleware;
using MTG.Scores2.Api.Services;
using System;
using System.Threading;

namespace MTG.Scores2.Api
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddCors();

      services.AddControllers();

      services.AddAuthentication("Bearer")
        .AddJwtBearer("Bearer", options =>
        {
          options.Authority = Configuration.GetValue<string>("JwtBearerAuthority");
          options.TokenValidationParameters.ValidIssuer = Configuration.GetValue<string>("JwtBearerIssuer");
          options.RequireHttpsMetadata = false;
          options.Audience = "mtgscores2api";
        }
        );

      services.AddDbContext<MtgContext>(o => o.UseSqlServer(Configuration.GetConnectionString("MtgDatabase")));

      services.AddTransient<MtgContextSeedData>();

      services.AddTransient<IPlayerRepository, PlayerRepository>()
              .AddTransient<IMatchRepository, MatchRepository>()
              .AddTransient<ITournamentRepository, TournamentRepository>();

      services.AddTransient<IRankingProvider, RankingProvider>();


      services.AddAutoMapper();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(
      IApplicationBuilder app, 
      IWebHostEnvironment env, 
      MtgContext mtgContext, 
      MtgContextSeedData mtgContextSeedData,
      ILogger<Startup> logger)
    {
      MigrateDatabase(mtgContext, mtgContextSeedData, logger);

      app.UseCors(
        builder =>
        {
          builder.AllowAnyOrigin();
          builder.AllowAnyMethod();
          builder.AllowAnyHeader();
        }
      );

      app.UseAuthentication();

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseHsts();
      }

      app.UseHttpsRedirection();
      app.UseRouting();
      app.UseAuthorization();
      app.UseMiddleware(typeof(ErrorHandlingMiddleware));

      app.UseEndpoints(endpoints =>
        endpoints.MapControllers()
      );
    }

    private void MigrateDatabase(MtgContext mtgContext, MtgContextSeedData mtgContextSeedData, ILogger<Startup> logger)
    {
      var retryCount = 5;
      var success = false;

      while (!success)
      {
        try
        {
          mtgContext.Database.Migrate();
          mtgContextSeedData.Seed().Wait();
          success = true;
        }
        catch (SqlException ex)
        {
          logger.LogWarning($"Excepiton occured when migrating database {ex.Message}. Retries left: {retryCount}");

          Thread.Sleep(5000);

          if (retryCount-- <= 0)
          {
            throw;
          }
        }
      }
      
    }
  }
}
