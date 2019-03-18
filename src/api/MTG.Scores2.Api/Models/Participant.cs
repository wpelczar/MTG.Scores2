namespace MTG.Scores2.Api.Models
{
  public class Participant
  {
    public int ID { get; set; }
    public string Name { get; set; }

    public int TournamentId { get; set; }
    public Tournament Tournament { get; set; }
  }
}
