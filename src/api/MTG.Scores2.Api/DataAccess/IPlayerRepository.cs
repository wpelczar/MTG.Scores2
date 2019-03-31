using System.Collections.Generic;
using System.Threading.Tasks;
using MTG.Scores2.Api.Models;

namespace MTG.Scores2.Api.DataAccess
{
  public interface IPlayerRepository
  {
    Task<Player> GetPlayerById(int id);
    Task<Player> GetParticipant(int tournamentId, int id);
    Task<IEnumerable<Player>> GetAllParticipants(int tournamentId, bool includeMatches);
    void Add(Player player);
    Task<bool> SaveAllAsync();
  }
}