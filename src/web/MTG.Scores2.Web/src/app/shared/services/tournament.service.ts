import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { ITournament } from '../models/tournament';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private _tournamentUrl;

  private _dataChange: BehaviorSubject<ITournament[]> = new BehaviorSubject<ITournament[]>([]);

  public readonly dataChange: Observable<ITournament[]> = this._dataChange.asObservable();

  get data(): ITournament[] { return this._dataChange.value; }

  constructor(private _http: Http, private _snackBar: MatSnackBar) {
    this._tournamentUrl = environment.apiUrl + '/tournaments';
  }

  getTournament(id: number): Observable<ITournament>{
    return this._http.get(this._tournamentUrl + '/' + id)
    .pipe(
      map((response: Response) => <ITournament> response.json())
    );
  }

  getTournaments(): void {
    this._http.get(this._tournamentUrl)
      .subscribe((response: Response) => {
        const tournaments = <ITournament[]>response.json();
        this._dataChange.next(tournaments);
      }, (errorResponse: Response) => this.handleError(errorResponse));
  }

  addTournament(tournament: ITournament): void {
    this._http.post(this._tournamentUrl, tournament)
      .subscribe((response: Response) => {
        const createdTournament = <ITournament>response.json();
        const newData = this.data.concat(createdTournament);
        this._dataChange.next(newData);
      }, (errorResponse: Response) => this.handleError(errorResponse));
  }

  delete(id: number): void {
    this._http.delete(this._tournamentUrl + '/' + id)
      .subscribe(response => {
        const newData = this._dataChange.value.filter(m => m.id !== id);
        this._dataChange.next(newData);
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
