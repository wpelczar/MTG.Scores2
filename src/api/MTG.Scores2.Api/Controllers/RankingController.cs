using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using MTG.Scores2.Api.DataAccess;
using MTG.Scores2.Api.Services;
using System;
using System.Threading.Tasks;

namespace MTG.Scores2.Api.Controllers
{

  public class RankingController : Controller
  {
    private IRankingProvider _rankingProvider;

    public RankingController(IRankingProvider rankingProvider)
    {
      _rankingProvider = rankingProvider;
    }

    [HttpGet("api/tournaments/{id}/ranking")]
    public async Task<IActionResult> Get(int id)
    {

      var ranking = await _rankingProvider.GetRanking(id);
      return Ok(ranking);
    }
  }
}
