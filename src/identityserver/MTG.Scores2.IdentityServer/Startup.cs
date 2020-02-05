// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.
using MTG.Scores2.IdentityServer.Data;
using MTG.Scores2.IdentityServer.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using IdentityServer4.Stores;
using System.Security.Cryptography.X509Certificates;

namespace MTG.Scores2.IdentityServer
{
  public class Startup
  {
    public static IConfiguration Configuration { get; private set; }
    public IWebHostEnvironment Environment { get; }

    public Startup(IConfiguration configuration, IWebHostEnvironment environment)
    {
      Configuration = configuration;
      Environment = environment;
    }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddDbContext<ApplicationDbContext>(options =>
          options.UseSqlServer(Configuration.GetConnectionString("IdentityServerDatabase")));

      services.AddIdentity<ApplicationUser, IdentityRole>()
          .AddEntityFrameworkStores<ApplicationDbContext>()
          .AddDefaultTokenProviders();

      services.AddControllersWithViews();

      // configures IIS out-of-proc settings (see https://github.com/aspnet/AspNetCore/issues/14882)
      services.Configure<IISOptions>(iis =>
      {
        iis.AuthenticationDisplayName = "Windows";
        iis.AutomaticAuthentication = false;
      });

      // configures IIS in-proc settings
      services.Configure<IISServerOptions>(iis =>
      {
        iis.AuthenticationDisplayName = "Windows";
        iis.AutomaticAuthentication = false;
      });

      services.Configure<IISOptions>(iis =>
      {
        iis.AuthenticationDisplayName = "Windows";
        iis.AutomaticAuthentication = false;
      });

      var builder = services.AddIdentityServer(options =>
      {
        options.Events.RaiseErrorEvents = true;
        options.Events.RaiseInformationEvents = true;
        options.Events.RaiseFailureEvents = true;
        options.Events.RaiseSuccessEvents = true;
      })
          .AddInMemoryIdentityResources(Config.GetIdentityResources())
          .AddInMemoryApiResources(Config.GetApis())
          .AddInMemoryClients(Config.GetClients())
          .AddAspNetIdentity<ApplicationUser>();

      if (Environment.IsDevelopment())
      {
        builder.AddDeveloperSigningCredential();
      }
      else
      {
        string signingCertPath = Configuration["Certificates:Signing:Path"];
        string signingCertPass = Configuration["Certificates:Signing:Password"];
        string validationCertPath = Configuration["Certificates:Validation:Path"];
        string validationCertPass = Configuration["Certificates:Validation:Password"];

        builder.AddSigningCredential(new X509Certificate2(signingCertPath, signingCertPass));
        builder.AddValidationKey(new X509Certificate2(validationCertPath, validationCertPass));
      }
 
      services.AddAuthentication()  
          .AddGoogle(options =>
          {
                  // register your IdentityServer with Google at https://console.developers.google.com
                  // enable the Google+ API
                  // set the redirect URI to http://localhost:5000/signin-google
                  options.ClientId = "copy client ID from Google here";
            options.ClientSecret = "copy client secret from Google here";
          });
      services.AddCors(options => options.AddPolicy("RegistrerEndpointCorsPolicy", corsBuilder =>
      {
        corsBuilder.WithOrigins(Startup.Configuration["SpaClientUrl"]);
        corsBuilder.AllowAnyMethod();
        corsBuilder.AllowAnyHeader();
      }));
    }

    public void Configure(IApplicationBuilder app)
    {
      if (Environment.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        app.UseDatabaseErrorPage();
      }
      else
      {
        app.UseExceptionHandler("/Home/Error");
      }

      app.UseStaticFiles();
      app.UseRouting();
      app.UseIdentityServer();
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapDefaultControllerRoute();
      });
    }
  }
}