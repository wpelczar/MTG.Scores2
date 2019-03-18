using System.Collections.Generic;
using System.Linq;

namespace MTG.Scores2.Api.Models
{
  public class Player
  {
    public int ID { get; set; }

    public string Name { get; set; }

    public virtual ICollection<Match> HomeMatches { get; set; }

    public virtual ICollection<Match> AwayMatches { get; set; }

    public IEnumerable<Match> Matches => HomeMatches.Concat(AwayMatches).Distinct();
  }
}
