import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { IMatch } from '../models/match';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';

@Injectable()
export class MatchService {
  dataChange: BehaviorSubject<IMatch[]> = new BehaviorSubject<IMatch[]>([]);

  get data(): IMatch[] { return this.dataChange.value; }

  constructor(private _http: Http,
    private _snackBar: MatSnackBar) {
  }

  getMatches(tournamentId: number): void {
    this._http.get(environment.apiUrl + '/tournaments/' + tournamentId + '/matches' )
      .subscribe((response: Response) => {
        const matches = <IMatch[]>response.json();
        this.dataChange.next(matches);
      }, (errorResponse: Response) => this.handleError(errorResponse));
  }

  deleteMatch(tournamentId:number, id: number): void {
    this._http.delete(environment.apiUrl + '/tournaments/' + tournamentId + '/matches/' + id)
      .subscribe(response => {
        const newData = this.dataChange.value.filter(m => m.id !== id);
        this.dataChange.next(newData);
        this._snackBar.open('Mecz usunięty', 'OK', {
          duration: 2000
        });
      }, errorResponse => {
        this.handleError(errorResponse);
      });
  }

  addMatch(tournamentId: number,  match: IMatch): void {
    this._http.post((environment.apiUrl + '/tournaments/' + tournamentId + '/matches' ), match)
      .subscribe(response => {
        const createdMatch = <IMatch>(JSON.parse(response.text()));
        const newdata = this.dataChange.value.concat(createdMatch);
        this.dataChange.next(newdata);
        this._snackBar.open('Mecz dodany', 'OK', {
          duration: 2000
        });
      }, errorResponse => {
        this.handleError(errorResponse);
      });
  }

  editMatch(tournamentId: number, match: IMatch): void {
    this._http.put((environment.apiUrl + '/tournaments/' + tournamentId + '/matches/' + match.id ), match)
      .subscribe(response => {
        const copiedData = this.dataChange.value.slice();
        const index = copiedData.findIndex(elem => elem.id === match.id);
        Object.assign(copiedData[index], match);
        this._snackBar.open('Edycja zapisana', 'OK', {
          duration: 2000
        });
      }, errorResponse => {
        this.handleError(errorResponse);
      });
  }

  private handleError(error: Response) {
    console.error(error);
    this._snackBar.open('Wystąpił błąd', 'ZAMKNIJ', {
      duration: 3000
    });
    return Observable.throw(error.statusText || 'Server error');
  }
}
