using System.ComponentModel.DataAnnotations;

namespace MTG.Scores2.Api.ViewModels
{
  public class PlayerScoreViewModel
  {
    public int ID { get; set; }

    public string Name { get; set; }

    [Range(0, 2)]
    public int Score { get; set; }
  }
}