import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { IRankingRecord } from '../models/ranking-record';
import { environment } from '../../../environments/environment';

@Injectable()
export class RankingService {
  constructor(private _http: Http) {
  }

  getRanking(tournamentId: number): Observable<IRankingRecord[]> {
    return this._http.get(environment.apiUrl + '/tournaments/' + tournamentId + '/ranking')
    .pipe(
      map((response: Response) => <IRankingRecord[]>response.json()),
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
