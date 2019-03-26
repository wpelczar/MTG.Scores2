using Microsoft.EntityFrameworkCore;
using MTG.Scores2.Api.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MTG.Scores2.Api.DataAccess
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

    public async Task<IEnumerable<Player>> GetAllParticipants(int tournamentId, bool includeMatches)
    {
      var playersQuery =_context.Players.Where(p => p.TournamentId == tournamentId);

      return includeMatches
        ? await playersQuery.Include(p => p.HomeMatches).Include(p => p.AwayMatches).ToListAsync()
        : await playersQuery.ToListAsync();
    }
  }
}
