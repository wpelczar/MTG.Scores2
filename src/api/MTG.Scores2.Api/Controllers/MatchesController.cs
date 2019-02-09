using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MTG.Scores2.Api.DataAccess;
using MTG.Scores2.Api.Models;
using MTG.Scores2.Api.ViewModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MTG.Scores2.Api.Controllers
{
  [Route("api/matches")]
  public class MatchesController : Controller
  {
    private IMapper _mapper;
    private IMatchRepository _matchRepository;
    private ILogger<MatchesController> _logger;

    public MatchesController(IMatchRepository matchRepository, IMapper mapper)
    {
      _matchRepository = matchRepository;
      _mapper = mapper;
    }

    [HttpGet("")]
    public async Task<IActionResult> Get()
    {
      var matches = await _matchRepository.GetAllMatches();

      var matchesModels = _mapper.Map<IEnumerable<MatchViewModel>>(matches);

      return Ok(matchesModels);
    }

    [HttpGet("{id}", Name = "MatchGet"),]
    public async Task<IActionResult> Get(int id)
    {

      var match = await _matchRepository.GetMatchById(id);

      if (match == null)
      {
        return NotFound();
      }

      var matchModel = _mapper.Map<MatchViewModel>(match);
      return Ok(matchModel);
    }

    [HttpPost("")]
    public async Task<IActionResult> Post([FromBody]MatchViewModel matchModel)
    {
      var match = _mapper.Map<Match>(matchModel);
      _matchRepository.Add(match);
      await _matchRepository.SaveAllAsync();

      var newUri = Url.Link("MatchGet", new { id = match.ID });
      matchModel.ID = match.ID;

      _logger.LogInformation($"Match creaated. ID = {match.ID}");
      return Created(newUri, matchModel);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody]MatchViewModel matchModel)
    {

      var match = await _matchRepository.GetMatchById(id);
      if (match == null)
      {
        return NotFound($"Match with id {id} not found");
      }

      _mapper.Map(matchModel, match);

      await _matchRepository.SaveAllAsync();
      
      _logger.LogInformation($"Match with id [{id}] succesfully updated");
      return Ok(_mapper.Map<MatchViewModel>(match));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
      var match = await _matchRepository.GetMatchById(id);

      if (match == null)
      {
        return NotFound();
      }

      _matchRepository.Delete(match);
      await _matchRepository.SaveAllAsync();

      _logger.LogInformation($"Match with id [{id}] deleted");
      return Ok();
    }
  }
}
