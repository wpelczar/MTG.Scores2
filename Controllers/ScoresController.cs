using AutoMapper;
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
  [Route("api/Matches")]
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
      var matches = await _db.Matches.Include(m => m.Player1).Include(m => m.Player2).ToListAsync();

      var matchesModels = _mapper.Map<IEnumerable<MatchViewModel>>(matches);

      return Ok(matchesModels);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
      var match =  await _db.Matches.Where(m => m.ID == id).Include(m => m.Player1).Include(m => m.Player2).FirstOrDefaultAsync();

      if(match == null)
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
      _db.Matches.Add(match);
      await _db.SaveChangesAsync();

      return Created("some uri", _mapper.Map<MatchViewModel>(match));
    }

    
  }
}
