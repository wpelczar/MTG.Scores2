using Microsoft.EntityFrameworkCore;
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
      modelBuilder.Entity<Player>().Ignore(p => p.Matches);
      modelBuilder.Entity<Match>().HasOne(m => m.Player1).WithMany(p => p.HomeMatches).HasForeignKey(m => m.Player1ID);
      modelBuilder.Entity<Match>().HasOne(m => m.Player2).WithMany(p => p.AwayMatches).HasForeignKey(m => m.Player2ID);
      base.OnModelCreating(modelBuilder);
    }

    public DbSet<Match> Matches { get; set; }

    public DbSet<Player> Players { get; set; }
  }
}
