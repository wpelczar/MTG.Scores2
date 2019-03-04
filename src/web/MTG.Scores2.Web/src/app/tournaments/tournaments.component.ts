import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITournament } from '../shared/models/tournament';
import { DataSource } from '@angular/cdk/table';
import { TournamentService } from '../shared/services/tournament.service';
import { map, merge } from 'rxjs/operators';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {
  tournamentsDataSource: TournamentDataSource | null;
  displayedColumns = ['ID', 'name'];
  errorMessage: string;
  filterChange = new BehaviorSubject('');


  constructor(private _tournamentService: TournamentService) { }

  ngOnInit() {
    this.tournamentsDataSource = new TournamentDataSource(this._tournamentService);
    this._tournamentService.getTournaments();
  }

  applyFilter(filterValue: string) {
    this.tournamentsDataSource.filter = filterValue;
  }
}

export class TournamentDataSource extends DataSource<ITournament> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  constructor(private _tournamentService: TournamentService, ) {
    super();
  }

  connect(): Observable<ITournament[]> {
    return this._tournamentService.dataChange.pipe(
      merge(this._filterChange),
      map(() => {
        return this._tournamentService.data.filter(
          t => t.name.toLowerCase().includes(this._filterChange.value));
      }));
  }

  disconnect(): void {
  }
}

