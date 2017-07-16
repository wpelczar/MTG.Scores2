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
  public class ScoresController : Controller
  {
    private MtgContext _db;
    private IMapper _mapper;

    public ScoresController(MtgContext db, IMapper mapper)
    {
      _db = db;
      _mapper = mapper;
    }

    [HttpGet("")]
    public async Task<IActionResult> Get()
    {
      try
      {
        var matches = await _db.Matches.Include(m => m.Player1).Include(m => m.Player2).ToListAsync();

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
        var match = await _db.Matches.Where(m => m.ID == id).Include(m => m.Player1).Include(m => m.Player2).FirstOrDefaultAsync();

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
        _db.Matches.Add(match);
        await _db.SaveChangesAsync();

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
        var match = await _db.Matches.Where(m => m.ID == id).FirstOrDefaultAsync();

        if (match == null)
        {
          return NotFound();
        }

        _db.Remove(match);
        await _db.SaveChangesAsync();

        return Ok();

      }
      catch (Exception ex)
      {
      }

      return StatusCode(StatusCodes.Status500InternalServerError);
    }
  }
}
