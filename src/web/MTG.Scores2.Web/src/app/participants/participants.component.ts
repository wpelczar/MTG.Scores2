import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from '../shared/services/player.service';
import { IPlayer } from '../shared/models/player';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { merge, map } from 'rxjs/operators';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {
  @Input() tournamentId: number;

  participantsDataSource: ParticipantsDataSource | null;

  displayedColumns = ['name'];

  constructor(private _playerService: PlayerService) { }

  ngOnInit() {
    this.participantsDataSource = new ParticipantsDataSource(this._playerService);
    this._playerService.getParticipants2(this.tournamentId);
  }

  applyFilter(filterValue: string) {
    this.participantsDataSource.filter = filterValue;
  }

}

export class ParticipantsDataSource extends DataSource<IPlayer> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  constructor(private _playerService: PlayerService, ) {
    super();
  }

  connect(): Observable<IPlayer[]> {

    return this._playerService.dataChange.pipe(
      merge(this._filterChange),
      map(() => {
        return this._playerService.data.filter(
          m =>
            m.name.toLowerCase().includes(this._filterChange.value));
      }));
  }

  disconnect(): void {
  }
}
