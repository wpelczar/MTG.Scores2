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

    public Task<Player> GetParticipant(int tournamentId, int id)
    {
      return _context.Players
        .Where(p => p.ID == id && p.TournamentId == tournamentId)
        .FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<Player>> GetAllParticipants(int tournamentId, bool includeMatches)
    {
      var playersQuery =_context.Players.Where(p => p.TournamentId == tournamentId);

      return includeMatches
        ? await playersQuery.Include(p => p.HomeMatches).Include(p => p.AwayMatches).ToListAsync()
        : await playersQuery.ToListAsync();
    }

    public void Add(Player player)
    {
      _context.Add(player);
    }

    public async Task<bool> SaveAllAsync()
    {
      return (await _context.SaveChangesAsync()) > 0;
    }
  }
}
