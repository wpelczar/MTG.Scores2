using AutoMapper;
using MTG.Scores2.Api.Models;
using MTG.Scores2.Api.ViewModels;

namespace MTG.Scores2.Api.AutoMapper
{
  public class DefaultProfile : Profile
  {
    public DefaultProfile()
    {
      CreateMap<Match, MatchViewModel>()
        .ForMember(x => x.Player1, opt => opt.ResolveUsing(
          m => new PlayerScoreViewModel
          {
            ID = m.Player1ID.Value,
            Name = m.Player1?.Name,
            Score = m.Player1Score
          }))
        .ForMember(x => x.Player2, opt => opt.ResolveUsing(
          m => new PlayerScoreViewModel
          {
            ID = m.Player2ID.Value,
            Name = m.Player2?.Name,
            Score = m.Player2Score
          }))
        .ReverseMap()
          .ForMember(x => x.ID, opt => opt.Ignore())
          .ForMember(x => x.Player1, opt => opt.Ignore())
          .ForMember(x => x.Player2, opt => opt.Ignore())
          .ForMember(x => x.Player1ID, opt => opt.MapFrom(y => y.Player1.ID))
          .ForMember(x => x.Player1Score, opt => opt.MapFrom(y => y.Player1.Score))
          .ForMember(x => x.Player2ID, opt => opt.MapFrom(y => y.Player2.ID))
          .ForMember(x => x.Player2Score, opt => opt.MapFrom(y => y.Player2.Score));

      CreateMap<Tournament, TournamentViewModel>()
        .ReverseMap();

      CreateMap<Player, PlayerViewModel>()
        .ReverseMap()
        .ForMember(x => x.ID, opt => opt.Ignore())
        .ForMember(x => x.Tournament, opt => opt.Ignore());

    }
  }
}
