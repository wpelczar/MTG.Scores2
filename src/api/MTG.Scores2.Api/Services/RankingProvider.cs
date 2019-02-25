using System;
using System.Collections.Generic;
using MTG.Scores2.Api.ViewModels;
using MTG.Scores2.Api.DataAccess;
using System.Linq;
using System.Threading.Tasks;

namespace MTG.Scores2.Api.Services
{
  public class RankingProvider : IRankingProvider
  {
    private IPlayerRepository _playerRepository;

    public RankingProvider(IPlayerRepository playerRepository)
    {
      _playerRepository = playerRepository;
    }

    public async Task<IEnumerable<RankingRecordViewModel>> GetRanking()
    {
      var players = await _playerRepository.GetAllPlayers(true);
      
      var rank = new List<RankingRecordViewModel>();

      foreach (var player in players)
      {
        var games = player.Matches.Count();
        var wonMatches = player.Matches.Count(x => x.WinnerId == player.ID);
        var lostMatches = player.Matches.Count(x => x.LoserId == player.ID);

        var wonPoints = player.Matches.Sum(x => x.Player1Score);
        var lostPoints = player.Matches.Sum(x => x.Player2Score);

        rank.Add(
          new RankingRecordViewModel
          {
            Matches = games,
            WonMatches = wonMatches,
            LostMatches = lostMatches,
            Name = player.Name,
            LostPoints = lostPoints,
            WonPoints = wonPoints,
            PointsRatio = wonPoints - lostPoints
          });
      }

      rank = rank.OrderByDescending(x => x.WonMatches)
                 .ThenBy(x => x.Matches)
                 .ThenByDescending(x => x.PointsRatio)
                 .ThenByDescending(x => x.WonPoints)
                 .ToList();

      return rank;
    }
  }
}
