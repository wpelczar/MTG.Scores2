using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MTG.Scores2.Api.DataAccess;
using MTG.Scores2.Api.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MTG.Scores2.Api.Controllers
{
  [Route("api/tournaments/{tournamentId}/participants")]
  public class ParticipantsController : Controller
  {
    private IPlayerRepository _playerRepository;
    private IMapper _mapper;
    
    public ParticipantsController(IPlayerRepository playerRepository, IMapper mapper)
    {
      _playerRepository = playerRepository;
      _mapper = mapper;
    }

    [HttpGet("")]
    public async Task<IActionResult> Get(int tournamentId)
    {
      var players = await _playerRepository.GetAllParticipants(tournamentId, false);
      var playersModel = _mapper.Map<IEnumerable<PlayerViewModel>>(players);
      return Ok(playersModel);
    }
  }
}
