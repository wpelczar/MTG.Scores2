using System.Collections.Generic;
using System.Threading.Tasks;
using MTG.Scores2.Api.Models;

namespace MTG.Scores2.Api.DataAccess
{
  public interface IPlayerRepository
  {
    Task<IEnumerable<Player>> GetAllPlayers(bool includeMatches);
    Task<Player> GetPlayerById(int id);
  }
}