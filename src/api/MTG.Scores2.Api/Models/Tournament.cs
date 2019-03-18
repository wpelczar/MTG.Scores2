using System.Collections.Generic;

namespace MTG.Scores2.Api.Models
{
  public class Tournament
  {
    public int ID { get; set; }

    public string Name { get; set; }

    //public ICollection<Match> Matches { get; set; }

    public ICollection<Participant> Participants { get; set; }
  }
}
