import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { IMatch } from './match';

@Injectable()
export class MatchService {
  private _matchUrl;

  constructor(private _http: Http, @Inject('ORIGIN_URL') originUrl: string) { 
    this._matchUrl = originUrl + '/api/matches'
  }

  getMatches(): Observable<IMatch[]> {
    return this._http.get(this._matchUrl)
      .map((response: Response) => <IMatch[]> response.json())
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteMatch(id): Observable<any> {
    return this._http.delete(this._matchUrl + '/' + id)
    .do(data => console.log(JSON.stringify(data)))
    .catch(this.handleError);
  }

  private handleError(error: Response){
    console.error(error);
    return Observable.throw(error.json().error || 'Server error')
  }
}