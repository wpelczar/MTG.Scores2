import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { ITournament } from '../shared/models/tournament';
import { DataSource } from '@angular/cdk/table';
import { TournamentService } from '../shared/services/tournament.service';
import { map, merge, catchError, finalize, tap } from 'rxjs/operators';
import { IDeleteConfirmationDialogData } from '../shared/models/delete-confirmation-dialog-data';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmationDialogComponent } from '../shared/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {
  tournamentsDataSource: TournamentDataSource | null;
  displayedColumns = ['ID', 'name', 'actions'];
  errorMessage: string;
  filterChange = new BehaviorSubject('');
  isAuthenticated: boolean;
  authSubscription: Subscription;

  constructor(
    private _tournamentService: TournamentService,
    private _dialog: MatDialog,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.tournamentsDataSource = new TournamentDataSource(this._tournamentService, this._snackBar);
    this.tournamentsDataSource.loadTournaments();
    this.authSubscription = this.authService.authNavStatus$.subscribe(status => this.isAuthenticated = status);
  }

  applyFilter(filterValue: string) {
    this.tournamentsDataSource.filter = filterValue;
  }

  delete(id: number): void {
    const dialogRef = this._dialog.open(
      DeleteConfirmationDialogComponent, {
      data: <IDeleteConfirmationDialogData>{
        title: 'Usuwanie turnieju',
        text: 'Na pewno chcesz usunąć turniej?'
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Result is ${JSON.stringify(result)}`);
      if (result === true) {
        this.tournamentsDataSource.deleteTournament(id);
      }
    });
  }
}

export class TournamentDataSource extends DataSource<ITournament> {

  private tournamentsSubject = new BehaviorSubject<ITournament[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  _filterChange = new BehaviorSubject('');

  public loading$ = this.loadingSubject.asObservable();

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  constructor(
    private _tournamentService: TournamentService,
    private _snackBar: MatSnackBar) {
    super();
  }

  connect(): Observable<ITournament[]> {
    return this.tournamentsSubject.asObservable().pipe(
      merge(this._filterChange),
      map(() => {
        return this.tournamentsSubject.value.filter(
          t => t.name.toLowerCase().includes(this._filterChange.value));
      }));
  }

  disconnect(): void {
    this.tournamentsSubject.complete();
  }

  loadTournaments(): void {
    this.loadingSubject.next(true);

    this._tournamentService.getTournaments().pipe(
      catchError(() => {
        this._snackBar.open('Błąd podczas ładowania listy turniejów', 'OK', {
          duration: 5000
        });
        return of([]);
      }),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe(tournaments => this.tournamentsSubject.next(tournaments));
  }

  deleteTournament(id: number): void {
    this.loadingSubject.next(true);

    this._tournamentService.delete(id)
      .pipe(
        tap(() => {
          const newData = this.tournamentsSubject.value.filter(m => m.id !== id);
          this.tournamentsSubject.next(newData);
          this._snackBar.open('Turniej usunięty', 'OK', {
            duration: 2000
          });
        }),
        catchError(() => {
          this._snackBar.open('Błąd podczas usuwania trunieju', 'OK', {
            duration: 5000
          });
          return of([]);
        }),
        finalize(() => this.loadingSubject.next(false))

      ).subscribe();
  }

}

