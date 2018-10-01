﻿using Microsoft.EntityFrameworkCore;
using MTG.Scores2.Api.Extensions;
using MTG.Scores2.Api.Models;

namespace MTG.Scores2.Api.DataAccess
{
  public class MtgContext : DbContext
  {
    public MtgContext(DbContextOptions<MtgContext> dbContextOptions) : base(dbContextOptions) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.RemovePluralizingTableNameConvention();

      base.OnModelCreating(modelBuilder);
    }

    public DbSet<Match> Matches { get; set; }

    public DbSet<Player> Players { get; set; }
  }
}
