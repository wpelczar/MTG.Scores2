using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MTG.Scores2.DataAccess;
using MTG.Scores2.Models;
using MTG.Scores2.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MTG.Scores2.Controllers
{
  [Route("api/matches")]
  public class MatchesController : Controller
  {
    private IMapper _mapper;
    private IMatchRepository _matchRepository;

    public MatchesController(IMatchRepository matchRepository, IMapper mapper)
    {
      _matchRepository = matchRepository;
      _mapper = mapper;
    }

    [HttpGet("")]
    public async Task<IActionResult> Get()
    {
      try
      {
        var matches = await _matchRepository.GetAllMatches();

        var matchesModels = _mapper.Map<IEnumerable<MatchViewModel>>(matches);

        return Ok(matchesModels);
      }
      catch (Exception)
      {
      }

      return StatusCode(StatusCodes.Status500InternalServerError);
    }

    [HttpGet("{id}", Name = "MatchGet"),]
    public async Task<IActionResult> Get(int id)
    {
      try
      {
        var match = await _matchRepository.GetMatchById(id);

        if (match == null)
        {
          return NotFound();
        }

        var matchModel = _mapper.Map<MatchViewModel>(match);
        return Ok(matchModel);
      }
      catch (Exception ex)
      {
      }

      return StatusCode(StatusCodes.Status500InternalServerError);
    }

    [HttpPost("")]
    public async Task<IActionResult> Post([FromBody]MatchViewModel matchModel)
    {
      try
      {
        var match = _mapper.Map<Match>(matchModel);
        _matchRepository.Add(match);
        await _matchRepository.SaveAllAsync();

        var newUri = Url.Link("MatchGet", new { id = match.ID });

        return Created(newUri, _mapper.Map<MatchViewModel>(match));
      }
      catch (Exception ex)
      {
      }

      return StatusCode(StatusCodes.Status500InternalServerError);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
      try
      {
        var match = await _matchRepository.GetMatchById(id);

        if (match == null)
        {
          return NotFound();
        }

        _matchRepository.Delete(match);
        await _matchRepository.SaveAllAsync();

        return Ok();

      }
      catch (Exception ex)
      {
      }

      return StatusCode(StatusCodes.Status500InternalServerError);
    }
  }
}
