using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using MTG.Scores2.DataAccess;

namespace MTG.Scores2.Migrations
{
    [DbContext(typeof(MtgContext))]
    [Migration("20170706195827_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MTG.Scores2.Models.Match", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("Player1ID");

                    b.Property<int>("Player1Score");

                    b.Property<int?>("Player2ID");

                    b.Property<int>("Player2Score");

                    b.HasKey("ID");

                    b.HasIndex("Player1ID");

                    b.HasIndex("Player2ID");

                    b.ToTable("Match");
                });

            modelBuilder.Entity("MTG.Scores2.Models.Player", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("ID");

                    b.ToTable("Player");
                });

            modelBuilder.Entity("MTG.Scores2.Models.Match", b =>
                {
                    b.HasOne("MTG.Scores2.Models.Player", "Player1")
                        .WithMany()
                        .HasForeignKey("Player1ID");

                    b.HasOne("MTG.Scores2.Models.Player", "Player2")
                        .WithMany()
                        .HasForeignKey("Player2ID");
                });
        }
    }
}
