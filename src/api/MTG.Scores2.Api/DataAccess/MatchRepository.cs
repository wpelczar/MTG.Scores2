using Microsoft.EntityFrameworkCore;
using MTG.Scores2.Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;

namespace MTG.Scores2.Api.DataAccess
{
  public class MatchRepository : IMatchRepository
  {
    private MtgContext _context;

    public MatchRepository(MtgContext context)
    {
      _context = context;
    }

    public void Add(Match match)
    {
      _context.Add(match);
    }

    public void Delete(Match match)
    {
      _context.Remove(match);
    }

    public Task<List<Match>> GetAllMatches(int tournamnetId)
    {
      return _context.Matches
        .Where(x => x.TournamentID == tournamnetId)
        .Include(m => m.Player1)
        .Include(m => m.Player2)
        .ToListAsync();
    }

    public Task<Match> GetMatchById(int tournamentId, int id)
    {
      return _context.Matches
        .Where(x => x.TournamentID == tournamentId)
        .Include(m => m.Player1)
        .Include(m => m.Player2)
        .FirstOrDefaultAsync(m => m.ID == id);
    }

    public async Task<bool> SaveAllAsync()
    {
      return (await _context.SaveChangesAsync()) > 0;
    }
  }
}
