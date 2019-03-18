using MTG.Scores2.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MTG.Scores2.Api.DataAccess
{
  public class MtgContextSeedData
  {
    private MtgContext _context;

    public MtgContextSeedData(MtgContext context)
    {
      _context = context;
    }

    public async Task Seed()
    {
      //if (!_context.Players.Any())
      //{
      //  int numberOfPlayers = 10;

      //  var players = new List<Player>();

      //  for (int i = 1; i <= numberOfPlayers; i++)
      //  {
      //    players.Add(new Player
      //    {
      //      Name = "Player " + i.ToString(),
      //    });
      //  }

      //  players.ForEach(p => _context.Players.Add(p));
      //  await _context.SaveChangesAsync();

      //  var matches = new List<Match>();

      //  matches.Add(new Match { Player1Score = 2, Player2Score = 0, Player1 = players[0], Player2 = players[1] });
      //  matches.Add(new Match { Player1Score = 2, Player2Score = 1, Player1 = players[1], Player2 = players[2] });
      //  matches.Add(new Match { Player1Score = 2, Player2Score = 0, Player1 = players[2], Player2 = players[3] });
      //  matches.Add(new Match { Player1Score = 0, Player2Score = 2, Player1 = players[3], Player2 = players[4] });
      //  matches.Add(new Match { Player1Score = 1, Player2Score = 2, Player1 = players[4], Player2 = players[5] });

      //  matches.ForEach(m => _context.Matches.Add(m));
      //  await _context.SaveChangesAsync();
      //}
    }

  }
}
