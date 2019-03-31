import { Injectable, } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { IPlayer } from '../models/player';
import { environment } from '../../../environments/environment';

@Injectable()
export class PlayerService {
  constructor(private _http: Http) {
  }

  getParticipants(tournamentId: number): Observable<IPlayer[]> {
    return this._http.get(environment.apiUrl + '/tournaments/' + tournamentId + '/participants').pipe(
      map((response: Response) => <IPlayer[]> response.json()),
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError));
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
