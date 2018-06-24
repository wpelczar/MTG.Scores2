import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { IMatch } from './match';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class MatchService {
  private _matchUrl;

  dataChange: BehaviorSubject<IMatch[]> = new BehaviorSubject<IMatch[]>([]);

  get data(): IMatch[] { return this.dataChange.value }

  constructor(private _http: Http,
    private _snackBar: MatSnackBar,
    @Inject('ORIGIN_URL') originUrl: string) {
    this._matchUrl = originUrl + '/api/matches'
  }

  getMatches(): void {
    this._http.get(this._matchUrl)
      .subscribe((response: Response) => {
        let matches = <IMatch[]>response.json();
        this.dataChange.next(matches);
      }, (errorResponse: Response) => this.handleError(errorResponse))
  }

  deleteMatch(id): void {
    this._http.delete(this._matchUrl + '/' + id)
      .subscribe(response => {
        let newData = this.dataChange.value.filter(m => m.id !== id);
        this.dataChange.next(newData);
        this._snackBar.open('Mecz usunięty', 'OK', {
          duration: 2000
        });
      }, errorResponse => this.handleError)
  }

  addMatch(match: IMatch): void {
    this._http.post(this._matchUrl + '/', match)
      .subscribe(response => {
        let createdMatch = <IMatch>(JSON.parse(response.text()))
        let newdata = this.dataChange.value.concat(createdMatch);
        this.dataChange.next(newdata);
        this._snackBar.open('Mecz dodany', 'OK', {
          duration: 2000
        });
      }, errorResponse => {
        this.handleError(errorResponse);
      })
  }

  // przypisanie meczu z reponse
  editMatch(match: IMatch): void {
    this._http.put(this._matchUrl + '/' + match.id, match)
      .subscribe(response => {
        let copiedData = this.dataChange.value.slice();
        let index = copiedData.findIndex(elem => elem.id === match.id);
        Object.assign(copiedData[index], match);
        this._snackBar.open('Edycja zapisana', 'OK', {
          duration: 2000
        });
      }, errorResponse => this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    this._snackBar.open('Wystąpił błąd', 'ZAMKNIJ', {
      duration: 3000
    });
    return Observable.throw(error.statusText || 'Server error')
  }
}