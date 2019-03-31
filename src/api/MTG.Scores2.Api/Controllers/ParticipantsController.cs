using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MTG.Scores2.Api.DataAccess;
using MTG.Scores2.Api.Models;
using MTG.Scores2.Api.ViewModels;
using System;
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
    public async Task<IActionResult> GetAll(int tournamentId)
    {
      var players = await _playerRepository.GetAllParticipants(tournamentId, false);
      var playersModel = _mapper.Map<IEnumerable<PlayerViewModel>>(players);
      return Ok(playersModel);
    }

    [HttpGet("{id}", Name = "ParticipantGet")]
    public async Task<IActionResult> Get(int tournamentId, int id)
    {
      var participant = await _playerRepository.GetParticipant(tournamentId, id);
      if (participant == null)
      {
        return NotFound();
      }
      var participantModel = _mapper.Map<PlayerViewModel>(participant);
      return Ok(participantModel);
    }

    [HttpPost("")]
    public async Task<IActionResult> Post(int tournamentId, [FromBody] PlayerViewModel participantModel)
    {
      var participant = _mapper.Map<Player>(participantModel);
      _playerRepository.Add(participant);
      await _playerRepository.SaveAllAsync();

      var createdUri = Url.Link("ParticipantGet", new { tournamentId, id = participant.ID });
      participantModel.Id = participant.ID;

      return Created(createdUri, participantModel);
    }
  }
}
 