// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4.Models;
using System.Collections.Generic;

namespace MTG.Scores2.IdentityServer
{
  public static class Config
  {
    public static IEnumerable<IdentityResource> GetIdentityResources()
    {
      return new IdentityResource[]
      {
        new IdentityResources.OpenId(),
        new IdentityResources.Profile(),
      };
    }

    public static IEnumerable<ApiResource> GetApis()
    {
      return new ApiResource[]
      {
        new ApiResource("mtgscores2api", "MTG.Scores2 api")
      };
    }

    public static IEnumerable<Client> GetClients()
    {
      return new[]
      {
                // SPA client using code flow + pkce
        new Client
        {
          ClientId = "spa",
          ClientName = "SPA Client",
          RequireConsent = false,
          AllowedGrantTypes = GrantTypes.Code,
          RequirePkce = true,
          RequireClientSecret = false,

          RedirectUris =
          {
             $"{Startup.Configuration["SpaClientUrl"]}/auth-callback"
          },

          PostLogoutRedirectUris = { Startup.Configuration["SpaClientUrl"] },
          AllowedCorsOrigins = { Startup.Configuration["SpaClientUrl"] },

          AllowedScopes = { "openid", "profile", "mtgscores2api" }
        }
      };
    }
  }
}