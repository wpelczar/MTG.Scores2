using Microsoft.EntityFrameworkCore;
using MTG.Scores2.Models;

namespace MTG.Scores2.DataAccess
{
  public class MtgContext : DbContext
  {
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      //modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

      base.OnModelCreating(modelBuilder);
    }

    public DbSet<Match> Matches { get; set; }

    public DbSet<Player> Players { get; set; }

    
  }
}
