using MTG.Scores2.Api.Models;
using MTG.Scores2.Api.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MTG.Scores2.Api.Services
{
  public interface IRankingProvider
  {
    Task<IEnumerable<RankingRecordViewModel>> GetRanking();
  }
}
