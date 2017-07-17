import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { IMatch } from './match';

@Injectable()
export class MatchService {
  private _matchUrl = 'http://localhost:65028/api/matches'

  constructor(private _http: Http) { }

  getMatches(): Observable<IMatch[]> {
    return this._http.get(this._matchUrl)
      .map((response: Response) => <IMatch[]> response.json())
      .do(data => console.log('All' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(error: Response){
    console.error(error);
    return Observable.throw(error.json().error || 'Server error')
  }
}