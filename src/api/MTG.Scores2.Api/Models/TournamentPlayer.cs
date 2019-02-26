namespace MTG.Scores2.Api.Models
{
  public class TournamentPlayer
  {
    public int TournamentId { get; set; }

    public int PlayerId { get; set; }

    public Tournament Tournament { get; set; }

    public Player Player { get; set; }
  }
}
