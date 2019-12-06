import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { ITournament } from '../models/tournament';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private _tournamentUrl;

  constructor(private _http: HttpClient, private authService: AuthService) {
    this._tournamentUrl = environment.apiUrl + '/tournaments';
  }

  getTournament(id: number): Observable<ITournament> {
    return this._http.get<ITournament>(this._tournamentUrl + '/' + id);
  }

  getTournaments(): Observable<ITournament[]>  {
    return this._http.get<ITournament[]>(this._tournamentUrl);
  }

  addTournament(tournament: ITournament): Observable<ITournament> {
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this._http.post<ITournament>(this._tournamentUrl, tournament, httpOptions);
  }

  delete(id: number): Observable<any> {
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this._http.delete(this._tournamentUrl + '/' + id, httpOptions);
  }

  private getHeaders(): HttpHeaders {
    if (this.authService.isAuthenticated()) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.authorizationHeaderValue
      });
    }
    return null;
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.error || 'Server error');
  }
}
