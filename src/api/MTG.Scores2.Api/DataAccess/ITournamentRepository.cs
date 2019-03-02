using MTG.Scores2.Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MTG.Scores2.Api.DataAccess
{
  public interface ITournamentRepository
  {
    void Add(Tournament tournament);
    void Delete(Tournament tournament);
    Task<List<Tournament>> GetAll();
    Task<Tournament> Get(int id);
    Task<int> SaveAllAsync();
  }
}
