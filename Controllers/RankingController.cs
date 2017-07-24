using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using MTG.Scores2.DataAccess;
using MTG.Scores2.Services;
using System;
using System.Threading.Tasks;

namespace MTG.Scores2.Controllers
{
  [Route("api/ranking")]
  public class RankingController : Controller
  {
    private IRankingProvider _rankingProvider;

    public RankingController(IRankingProvider rankingProvider)
    {
      _rankingProvider = rankingProvider;
    }

    [HttpGet("")]
    public async Task<IActionResult> Get()
    {
      try
      {
        var ranking = await _rankingProvider.GetRanking();
        return Ok(ranking);
      }
      catch (Exception)
      {
      }

      return StatusCode(StatusCodes.Status500InternalServerError);
    }
  }
}
