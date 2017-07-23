using System.Collections.Generic;
using System.Threading.Tasks;
using MTG.Scores2.Models;

namespace MTG.Scores2.DataAccess
{
  public interface IPlayerRepository
  {
    Task<IEnumerable<Player>> GetAllPlayers();
    Task<Player> GetPlayerById(int id);
  }
}