import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { ITournament } from '../models/tournament';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private _tournamentUrl;

  private _dataChange: BehaviorSubject<ITournament[]> = new BehaviorSubject<ITournament[]>([]);

  public readonly dataChange: Observable<ITournament[]> = this._dataChange.asObservable();

  get data(): ITournament[] { return this._dataChange.value; }

  constructor(private _http: HttpClient, private _snackBar: MatSnackBar) {
    this._tournamentUrl = environment.apiUrl + '/tournaments';
  }

  getTournament(id: number): Observable<ITournament> {
    return this._http.get<ITournament>(this._tournamentUrl + '/' + id);
  }

  getTournaments(): void {
    this._http.get(this._tournamentUrl)
      .subscribe((tournaments: ITournament[]) => {
        this._dataChange.next(tournaments);
      }, (errorResponse: HttpErrorResponse) => this.handleError(errorResponse));
  }

  addTournament(tournament: ITournament): void {
    this._http.post(this._tournamentUrl, tournament)
      .subscribe((createdTournament: ITournament) => {
        const newData = this.data.concat(createdTournament);
        this._dataChange.next(newData);
      }, (errorResponse: HttpErrorResponse) => this.handleError(errorResponse));
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

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.error || 'Server error');
  }
}
