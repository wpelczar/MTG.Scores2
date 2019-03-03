import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { ITournament } from '../models/tournament';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private _tournamentUrl;

  dataChange: BehaviorSubject<ITournament[]> = new BehaviorSubject<ITournament[]>([]);

  get data(): ITournament[] { return this.dataChange.value; }

  constructor(private _http: Http) {
    this._tournamentUrl = environment.apiUrl + '/tournaments';
  }

  getTournaments(): void {
    this._http.get(this._tournamentUrl)
      .subscribe((response: Response) => {
        const tournaments = <ITournament[]>response.json();
        this.dataChange.next(tournaments);
      }, (errorResponse: Response) => this.handleError(errorResponse));
  }

  addTournament(tournament: ITournament): void {
    this._http.post(this._tournamentUrl + '/' + tournament.id, tournament)
      .pipe(
        map((response: Response) => <ITournament[]>response.json()),
        tap(createdTournament => {
          const newData = this.data.concat(createdTournament);
          this.dataChange.next(newData);
        }),
        catchError(this.handleError)
      );
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
