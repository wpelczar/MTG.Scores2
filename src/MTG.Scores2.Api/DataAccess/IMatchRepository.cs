using System.Collections.Generic;
using System.Threading.Tasks;
using MTG.Scores2.Api.Models;

namespace MTG.Scores2.Api.DataAccess
{
  public interface IMatchRepository
  {
    void Add(Match match);
    void Delete(Match match);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<Match>> GetAllMatches();
    Task<Match> GetMatchById(int id);
  }
}