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
        var games = player.HomeMatches.Count + player.AwayMatches.Count;

        var homeWins = player.HomeMatches.Count(x => x.Player1Score == 2 && x.Player1Score > x.Player2Score);
        var awayWins = player.AwayMatches.Count(x => x.Player2Score == 2 && x.Player2Score > x.Player1Score);
        var wonMatches = homeWins + awayWins;
        var lostMatches = games - wonMatches;

        var wonPoints = player.HomeMatches.Sum(x => x.Player1Score) + player.AwayMatches.Sum(x => x.Player2Score);
        var lostPoints = player.HomeMatches.Sum(x => x.Player2Score) + player.AwayMatches.Sum(x => x.Player1Score);

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
