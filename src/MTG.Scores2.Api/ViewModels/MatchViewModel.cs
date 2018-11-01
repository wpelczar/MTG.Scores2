namespace MTG.Scores2.Api.ViewModels
{
  public class MatchViewModel
  {
    public int ID { get; set; }
    public PlayerScoreViewModel Player1 { get; set; }
    public PlayerScoreViewModel Player2 { get; set; }
  }
}
