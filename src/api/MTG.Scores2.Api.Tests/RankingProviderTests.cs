using NUnit.Framework;
using Moq;
using MTG.Scores2.Api.DataAccess;
using AutoFixture;
using AutoFixture.AutoMoq;
using MTG.Scores2.Api.Services;
using System.Collections.Generic;
using MTG.Scores2.Api.Models;
using System.Threading.Tasks;
using Match = MTG.Scores2.Api.Models.Match;
using System.Linq;

namespace MTG.Scores2.Api.Tests
{
  public class RankingProviderTests
  {
    private Mock<IPlayerRepository> _playerReposityoryMock;

    private IRankingProvider _sut;

    private Fixture _autoFixture;

    [SetUp]
    public void Setup()
    {
      _autoFixture = new Fixture();
      _autoFixture.Customize(new AutoMoqCustomization());
      _autoFixture.Behaviors.Remove(new ThrowingRecursionBehavior());
      _autoFixture.Behaviors.Add(new OmitOnRecursionBehavior());
      _playerReposityoryMock = _autoFixture.Freeze<Mock<IPlayerRepository>>();
      _sut = _autoFixture.Create<RankingProvider>();
    }

    [Test]
    public async Task GetRanking_ShoulReturnOrderedResults()
    {
      var playerWith2Wins = new Player 
      { 
        Name = "vanilla",
        ID = 1,
        AwayMatches = new List<Match>
        { 
          new Match { Player1Score = 1, Player2Score = 2, Player1ID = 123, Player2ID = 1 },
          new Match { Player1Score = 2, Player2Score = 0, Player1ID = 123, Player2ID = 1  },
        },
        HomeMatches = new List<Match>
        { 
          new Match { Player1Score = 2, Player2Score = 1, Player1ID = 1, Player2ID = 123  },
          new Match { Player1Score = 0, Player2Score = 2, Player1ID = 1, Player2ID = 123  },
        }
      };
      var playerWith0Wins = new Player 
      { 
        Name = "loser",
        ID = 2,
        AwayMatches = new List<Match>
        { 
          new Match { Player1Score = 2, Player2Score = 1, Player1ID = 123, Player2ID = 2  },
          new Match { Player1Score = 2, Player2Score = 0, Player1ID = 123, Player2ID = 2  },
        },
        HomeMatches = new List<Match>
        { 
          new Match { Player1Score = 1, Player2Score = 2, Player1ID = 2, Player2ID = 123  },
          new Match { Player1Score = 0, Player2Score = 2, Player1ID = 2, Player2ID = 123  },
        }
      };
      var playerWith3Wins = new Player 
      { 
        Name = "master",
        ID = 3,
        AwayMatches = new List<Match>
        { 
          new Match { Player1Score = 0, Player2Score = 2, Player1ID = 123, Player2ID = 3  },
          new Match { Player1Score = 2, Player2Score = 0, Player1ID = 123, Player2ID = 3  },
        },
        HomeMatches = new List<Match>
        { 
          new Match { Player1Score = 2, Player2Score = 1, Player1ID = 3, Player2ID = 123  },
          new Match { Player1Score = 2, Player2Score = 0, Player1ID = 3, Player2ID = 123  },
        }
      };

      IEnumerable<Player> players = new List<Player> { playerWith3Wins, playerWith0Wins, playerWith2Wins };
      _playerReposityoryMock.Setup(x => x.GetAllPlayers(true)).Returns(Task.FromResult(players));

      var result = (await _sut.GetRanking()).ToList();

      Assert.AreEqual(playerWith3Wins.Name, result[0].Name);
      Assert.AreEqual(playerWith2Wins.Name, result[1].Name);
      Assert.AreEqual(playerWith0Wins.Name, result[2].Name);
    }
  }
}