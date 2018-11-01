using Microsoft.EntityFrameworkCore;
using MTG.Scores2.Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

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

    public async Task<IEnumerable<Match>> GetAllMatches()
    {
      return await _context.Matches
        .Include(m => m.Player1)
        .Include(m => m.Player2)
        .ToListAsync();
    }

    public async Task<Match> GetMatchById(int id)
    {
      return await _context.Matches
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
