import { Injectable, } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { IPlayer } from '../models/player';
import { environment } from '../../../environments/environment';

@Injectable()
export class PlayerService {
  private _dataChange: BehaviorSubject<IPlayer[]> = new BehaviorSubject<IPlayer[]>([]);

  public readonly dataChange: Observable<IPlayer[]> = this._dataChange.asObservable();

  get data(): IPlayer[] { return this._dataChange.value; }

  constructor(private _http: Http) {
  }

  getParticipants(tournamentId: number): Observable<IPlayer[]> {
    return this._http.get(environment.apiUrl + '/tournaments/' + tournamentId + '/participants').pipe(
      map((response: Response) => <IPlayer[]> response.json()),
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError));
  }

  getParticipants2(tournamentId: number): void {
    this._http.get(environment.apiUrl + '/tournaments/' + tournamentId + '/participants' )
      .subscribe((response: Response) => {
        const participants = <IPlayer[]>response.json();
        this._dataChange.next(participants);
      }, (errorResponse: Response) => this.handleError(errorResponse));
  }

  deleteParticipant(tournamentId:number, id: number): void {
    this._http.delete(environment.apiUrl + '/tournaments/' + tournamentId + '/participants/' + id)
      .subscribe(response => {
        const newData = this._dataChange.value.filter(m => m.id !== id);
        this._dataChange.next(newData);
      }, errorResponse => {
        this.handleError(errorResponse);
      });
  }

  addParticipant(tournamentId: number,  participant: IPlayer): void {
    this._http.post((environment.apiUrl + '/tournaments/' + tournamentId + '/participants' ), participant)
      .subscribe(response => {
        const createdParticipant = <IPlayer>(JSON.parse(response.text()));
        const newdata = this._dataChange.value.concat(createdParticipant);
        this._dataChange.next(newdata);
      }, errorResponse => {
        this.handleError(errorResponse);
      });
  }

  editParticipant(tournamentId: number, participant: IPlayer): void {
    this._http.put((environment.apiUrl + '/tournaments/' + tournamentId + '/participants/' + participant.id ), participant)
      .subscribe(response => {
        const copiedData = this._dataChange.value.slice();
        const index = copiedData.findIndex(elem => elem.id === participant.id);
        Object.assign(copiedData[index], participant);
      }, errorResponse => {
        this.handleError(errorResponse);
      });
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
