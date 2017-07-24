using Microsoft.EntityFrameworkCore;
using MTG.Scores2.Models;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MTG.Scores2.DataAccess
{
  public class PlayerRepository : IPlayerRepository
  {
    private MtgContext _context;

    public PlayerRepository(MtgContext context)
    {
      _context = context;
    }
    public Task<Player> GetPlayerById(int id)
    {
      return _context.Players.Where(p => p.ID == id).FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<Player>> GetAllPlayers(bool includeMatches)
    {
      return includeMatches
        ? await _context.Players.Include(p => p.HomeMatches).Include(p => p.AwayMatches).ToListAsync()
        : await _context.Players.ToListAsync();
    }
  }
}
