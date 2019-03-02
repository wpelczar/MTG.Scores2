using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MTG.Scores2.Api.Models;

namespace MTG.Scores2.Api.DataAccess
{
  public class TournamentRepository : ITournamentRepository
  {
    private readonly MtgContext _context;

    public TournamentRepository(MtgContext context)
    {
      _context = context;
    }

    public void Add(Tournament tournament)
    {
      _context.Add(tournament);
    }

    public void Delete(Tournament tournament)
    {
      _context.Remove(tournament);
    }

    public Task<Tournament> Get(int id)
    {
      return _context.Tournaments.SingleOrDefaultAsync(t => t.ID == id);
    }

    public Task<List<Tournament>> GetAll()
    {
      return _context.Tournaments.ToListAsync();
    }

    public Task<int> SaveAllAsync()
    {
      return _context.SaveChangesAsync();
    }
  }
}
