import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from '../shared/services/tournament.service';
import { ITournament } from '../shared/models/tournament';

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.component.html',
  styleUrls: ['./tournament-details.component.scss']
})
export class TournamentDetailsComponent implements OnInit {
  id: number;
  private sub: any;
  tournament: ITournament;

  constructor(private route: ActivatedRoute,
    private tournamentService: TournamentService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];

      this.tournamentService.getTournament(this.id).subscribe(
        tournament => {
          this.tournament = tournament;
        });
   });
  }

}
