namespace MTG.Scores2.ViewModels
{
  public class MatchViewModel
  {
    public int ID { get; set; }
    public PlayerScoreViewModel Player1Score { get; set; }
    public PlayerScoreViewModel Player2Score { get; set; }
  }
}
