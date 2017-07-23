import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { IPlayer } from './player';

@Injectable()
export class PlayerService {
  private _matchUrl;

  constructor(private _http: Http, @Inject('ORIGIN_URL') originUrl: string) { 
    this._matchUrl = originUrl + '/api/players'
  }

  getPlayers(): Observable<IPlayer[]> {
    return this._http.get(this._matchUrl)
      .map((response: Response) => <IPlayer[]> response.json())
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(error: Response){
    console.error(error);
    return Observable.throw(error.json().error || 'Server error')
  }
}