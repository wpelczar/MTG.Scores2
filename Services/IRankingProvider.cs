using MTG.Scores2.Models;
using MTG.Scores2.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MTG.Scores2.Services
{
  public interface IRankingProvider
  {
    Task<IEnumerable<RankingRecordViewModel>> GetRanking();
  }
}
