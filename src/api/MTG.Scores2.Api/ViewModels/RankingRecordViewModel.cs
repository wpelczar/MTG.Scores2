namespace MTG.Scores2.Api.ViewModels
{
  public class RankingRecordViewModel
  {
    public string Name { get; set; }

    public int Matches { get; set; }

    public int WonMatches { get; set; }

    public int LostMatches { get; set; }

    public int WonPoints { get; set; }

    public int LostPoints { get; set; }

    public int PointsRatio { get; set; }
  }
}
