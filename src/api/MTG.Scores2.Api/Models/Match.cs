﻿using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MTG.Scores2.Api.Models
{
  public class Match
  {
    public int ID { get; set; }

    public int? TournamentID { get; set; }

    public int? Player1ID { get; set; }

    public int? Player2ID { get; set; }

    public int Player1Score { get; set; }

    public int Player2Score { get; set; }

    public virtual Player Player1 { get; set; }

    public virtual Player Player2 { get; set; }

    public virtual Tournament Tournament { get; set; }

    public int? LoserId
    {
      get
      {
        if (Player1Score > Player2Score)
          return Player2ID;
        else if (Player1Score < Player2Score)
          return Player1ID;
        else return null;
      }
    }

    public int? WinnerId
    {
      get
      {
        if (Player1Score > Player2Score)
          return Player1ID;
        else if (Player1Score < Player2Score)
          return Player2ID;
        else return null;
      }
    }
  }
}
