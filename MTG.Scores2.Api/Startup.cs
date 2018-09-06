using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MTG.Scores2.Api.DataAccess;
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

      services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

      services.AddDbContext<MtgContext>(o => o.UseSqlServer(Configuration.GetConnectionString("MtgDatabase")));

      services.AddTransient<MtgContextSeedData>();

      services.AddTransient<IPlayerRepository, PlayerRepository>()
              .AddTransient<IMatchRepository, MatchRepository>();

      services.AddTransient<IRankingProvider, RankingProvider>();


      services.AddAutoMapper();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      app.UseCors(
        builder =>
        {
          builder.AllowAnyOrigin();
          builder.AllowAnyMethod();
          builder.AllowAnyHeader();
        }

      );

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseHsts();
      }

      app.UseHttpsRedirection();
      app.UseMvc();
    }
  }
}
