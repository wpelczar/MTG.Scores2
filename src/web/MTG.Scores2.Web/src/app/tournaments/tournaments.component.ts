import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ITournament } from '../shared/models/tournament';
import { DataSource } from '@angular/cdk/table';
import { TournamentService } from '../shared/services/tournament.service';
import { map, merge } from 'rxjs/operators';
import { IDeleteConfirmationDialogData } from '../shared/models/delete-confirmation-dialog-data';
import { MatDialog } from '@angular/material/dialog';
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
    private authService: AuthService) { }

  ngOnInit() {
    this.tournamentsDataSource = new TournamentDataSource(this._tournamentService);
    this._tournamentService.getTournaments();
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
        this._tournamentService.delete(id);
      }
    });
  }
}

export class TournamentDataSource extends DataSource<ITournament> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  constructor(private _tournamentService: TournamentService, ) {
    super();
  }

  connect(): Observable<ITournament[]> {
    return this._tournamentService.dataChange.pipe(
      merge(this._filterChange),
      map(() => {
        return this._tournamentService.data.filter(
          t => t.name.toLowerCase().includes(this._filterChange.value));
      }));
  }

  disconnect(): void {
  }
}

