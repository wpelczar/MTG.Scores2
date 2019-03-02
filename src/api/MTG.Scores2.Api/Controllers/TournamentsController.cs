using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MTG.Scores2.Api.DataAccess;
using MTG.Scores2.Api.Models;
using MTG.Scores2.Api.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MTG.Scores2.Api.Controllers
{
  [Route("api/tournaments")]
  [ApiController]
  public class TournamentsController : Controller
  {
    private readonly ITournamentRepository _tournamentRepository;
    private readonly IMapper _mapper;

    public TournamentsController(ITournamentRepository tournamentRepository, IMapper mapper)
    {
      _tournamentRepository = tournamentRepository;
      _mapper = mapper;
    }

    [HttpGet("")]
    public async Task<IActionResult> Get()
    {
      var tournaments = await _tournamentRepository.GetAll();

      var tournamentsModels = _mapper.Map<List<TournamentViewModel>>(tournaments);

      return Ok(tournamentsModels);
    }

    [HttpGet("{id}", Name = "TournamentGet")]
    public async Task<IActionResult> Get(int id)
    {
      var tournament = await _tournamentRepository.Get(id);

      if (tournament == null)
      {
        return NotFound();
      }

      var tournamentModel = _mapper.Map<TournamentViewModel>(tournament);

      return Ok(tournamentModel);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody]TournamentViewModel tournamentViewModel)
    {
      var tournament =_mapper.Map<Tournament>(tournamentViewModel);
      _tournamentRepository.Add(tournament);
      await _tournamentRepository.SaveAllAsync();

      var newUri = Url.Link("TournamentGet", new { id = tournament.ID });
      tournamentViewModel.ID = tournament.ID;

      return Created(newUri, tournamentViewModel);
    }
  }
}