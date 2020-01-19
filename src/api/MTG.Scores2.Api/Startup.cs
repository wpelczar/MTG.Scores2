using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MTG.Scores2.Api.DataAccess;
using MTG.Scores2.Api.Middleware;
using MTG.Scores2.Api.Services;

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
      MtgContextSeedData mtgContextSeedData)
    { 
      mtgContext.Database.Migrate();
      mtgContextSeedData.Seed().Wait();

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
  }
}
