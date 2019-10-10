using Microsoft.EntityFrameworkCore.Migrations;

namespace MTG.Scores2.Api.Migrations
{
    public partial class cascade_delete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Match_Tournament_TournamentID",
                table: "Match");

            migrationBuilder.AddForeignKey(
                name: "FK_Match_Tournament_TournamentID",
                table: "Match",
                column: "TournamentID",
                principalTable: "Tournament",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Match_Tournament_TournamentID",
                table: "Match");

            migrationBuilder.AddForeignKey(
                name: "FK_Match_Tournament_TournamentID",
                table: "Match",
                column: "TournamentID",
                principalTable: "Tournament",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
