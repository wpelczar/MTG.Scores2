using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MTG.Scores2.DataAccess;
using MTG.Scores2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MTG.Scores2.Controllers
{
  [Route("api/[controller]")]
  public class ScoresController : Controller
  {
    private MtgContext _db;

    public ScoresController(MtgContext db)
    {
      _db = db;
    }

    [HttpGet("[action]")]
    public IEnumerable<Match> Matches()
    {
      return _db.Matches.Include(m => m.Player1).Include(m => m.Player2);
    }
  }
}
