using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MTG.Scores2.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Player",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Player", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Match",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Player1ID = table.Column<int>(nullable: true),
                    Player1Score = table.Column<int>(nullable: false),
                    Player2ID = table.Column<int>(nullable: true),
                    Player2Score = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Match", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Match_Player_Player1ID",
                        column: x => x.Player1ID,
                        principalTable: "Player",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Match_Player_Player2ID",
                        column: x => x.Player2ID,
                        principalTable: "Player",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Match_Player1ID",
                table: "Match",
                column: "Player1ID");

            migrationBuilder.CreateIndex(
                name: "IX_Match_Player2ID",
                table: "Match",
                column: "Player2ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Match");

            migrationBuilder.DropTable(
                name: "Player");
        }
    }
}
