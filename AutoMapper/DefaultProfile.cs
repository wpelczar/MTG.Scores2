using AutoMapper;
using MTG.Scores2.Models;
using MTG.Scores2.ViewModels;

namespace MTG.Scores2.AutoMapper
{
  public class DefaultProfile : Profile
  {
    public DefaultProfile()
    {
      CreateMap<Match, MatchViewModel>()
        .ForMember(x => x.Player1Score, opt => opt.ResolveUsing(
          m => new PlayerScoreViewModel {
            ID = m.Player1.ID,
            Name = m.Player1.Name,
            Score = m.Player1Score }))
        .ForMember(x => x.Player2Score, opt => opt.ResolveUsing(
          m => new PlayerScoreViewModel {
            ID = m.Player2.ID,
            Name = m.Player2.Name,
            Score = m.Player2Score }));
    }
  }
}
