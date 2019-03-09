import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { ITournament } from '../models/tournament';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private _tournamentUrl;

  dataChange: BehaviorSubject<ITournament[]> = new BehaviorSubject<ITournament[]>([]);

  get data(): ITournament[] { return this.dataChange.value; }

  constructor(private _http: Http, private _snackBar: MatSnackBar) {
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
    this._http.post(this._tournamentUrl, tournament)
      .subscribe((response: Response) => {
        const createdTournament = <ITournament>response.json();
        const newData = this.data.concat(createdTournament);
        this.dataChange.next(newData);
      }, (errorResponse: Response) => this.handleError(errorResponse));
  }

  delete(id: number): void {
    this._http.delete(this._tournamentUrl + '/' + id)
      .subscribe(response => {
        const newData = this.dataChange.value.filter(m => m.id !== id);
        this.dataChange.next(newData);
        this._snackBar.open('Turniej usunięty', 'OK', {
          duration: 2000
        });
      }, errorResponse => {
        this.handleError(errorResponse);
      });
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
