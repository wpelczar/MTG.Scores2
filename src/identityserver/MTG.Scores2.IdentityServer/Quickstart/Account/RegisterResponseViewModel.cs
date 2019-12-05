// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using MTG.Scores2.IdentityServer.Models;

namespace IdentityServer4.Quickstart.UI
{
  public class RegisterResponseViewModel
  {
    public string Id { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }

    public RegisterResponseViewModel(ApplicationUser user)
    {
      Id = user.Id;
      UserName = user.UserName;
      Email = user.Email;
    }
  }
}