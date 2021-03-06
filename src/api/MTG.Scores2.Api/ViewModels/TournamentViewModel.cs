﻿using System.Collections.Generic;

namespace MTG.Scores2.Api.ViewModels
{
  public class TournamentViewModel
  {
    public int ID { get; set; }

    public string Name { get; set; }

    public List<PlayerViewModel> Participants { get; set; }
  }
}
