using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using MTG.Scores2.Api.DataAccess;
using MTG.Scores2.Api.Services;
using System;
using System.Threading.Tasks;

namespace MTG.Scores2.Api.Controllers
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

      var ranking = await _rankingProvider.GetRanking();
      return Ok(ranking);
    }
  }
}
