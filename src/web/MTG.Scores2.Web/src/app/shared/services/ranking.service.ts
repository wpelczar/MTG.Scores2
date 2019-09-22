import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { IRankingRecord } from '../models/ranking-record';
import { environment } from '../../../environments/environment';

@Injectable()
export class RankingService {
  constructor(private _http: HttpClient) {
  }

  getRanking(tournamentId: number): Observable<IRankingRecord[]> {
    return this._http.get(environment.apiUrl + '/tournaments/' + tournamentId + '/ranking')
    .pipe(
      tap((data: IRankingRecord[])  => console.log(data)),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.error || 'Server error');
  }
}
