import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { IRankingRecord } from './rankingRecord'

@Injectable()
export class RankingService {
  private _rankingUrl;

  constructor(private _http: Http, @Inject('ORIGIN_URL') originUrl: string) {
    this._rankingUrl = originUrl + '/api/ranking'
  }

  getRanking(): Observable<IRankingRecord[]> {
    return this._http.get(this._rankingUrl)
      .map((response: Response) => <IRankingRecord[]>response.json())
      .do(data => console.log(data))
      .catch(this.handleError);
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error')
  }
}