using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MTG.Scores2.Api.DataAccess;
using MTG.Scores2.Api.ViewModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MTG.Scores2.Api.Controllers
{
  [Route("api/players")]
  public class PlayersController : Controller
  {
    private IPlayerRepository _playerRepository;
    private IMapper _mapper;

    public PlayersController(IPlayerRepository playerRepository, IMapper mapper)
    {
      _playerRepository = playerRepository;
      _mapper = mapper;
    }

    [HttpGet("")]
    public async Task<IActionResult> Get()
    {
      try
      {
        var players = await _playerRepository.GetAllPlayers(false);
        var playersModel = _mapper.Map<IEnumerable<PlayerViewModel>>(players);

        return Ok(playersModel);
      }
      catch (Exception)
      {
      }

      return StatusCode(StatusCodes.Status500InternalServerError);
    }
  }
}
