
import { Component, OnInit } from '@angular/core';
import { IMatch } from '../shared/models/match';
import { MatchService } from '../shared/services/match.service';
import { IPlayer } from '../shared/models/player';
import { PlayerService } from '../shared/services/player.service';
import { EditMatchDialogComponent } from '../shared/edit-match-dialog/edit-match-dialog.component';
import { MatDialog } from '@angular/material';
import { IEditMatchDialogData } from '../shared/models/edit-match-dialog-data';
import { DeleteConfirmationDialogComponent } from '../shared/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {
  matches: IMatch[];
  matchesDataSource: MatchesDataSource | null;
  players: IPlayer[];
  selectedPlayer: IPlayer = null;
  errorMessage: string;
  displayedColumns = ['player1.name', 'score', 'player2.name', 'actions'];

  constructor(private _matchService: MatchService,
    private _playerService: PlayerService,
    private _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this._playerService.getPlayers()
      .subscribe(players => this.players = players,
      error => this.errorMessage = <any>error);

    this.matchesDataSource = new MatchesDataSource(this._matchService);
    this._matchService.getMatches();
  }

  edit(match: IMatch): void {
    const dialogRef = this._dialog.open(
      EditMatchDialogComponent, {
        data: <IEditMatchDialogData>{
          availablePlayers: this.players,
          selectedPlayer1: this.players.find(x => x.id === match.player1.id),
          selectedPlayer2: this.players.find(x => x.id === match.player2.id),
          player1Score: match.player1.score,
          player2Score: match.player2.score,
          title: 'Edytuj mecz'
        }
      });

    dialogRef.afterClosed().subscribe((result: IEditMatchDialogData) => {
      console.log(`Result is ${JSON.stringify(result)}`);
      if (result !== undefined) {
        const matchEditModel: IMatch = {
          id: match.id,
          player1: {
            id: result.selectedPlayer1.id,
            name: result.selectedPlayer1.name,
            score: result.player1Score
          },
          player2: {
            id: result.selectedPlayer2.id,
            name: result.selectedPlayer2.name,
            score: result.player2Score
          }
        };

        this._matchService.editMatch(matchEditModel);
      }
    });
  }

  delete(id: number): void {
    const dialogRef = this._dialog.open(
      DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Result is ${JSON.stringify(result)}`);
      if (result !== undefined) {
        this._matchService.deleteMatch(id);
      }
    });
  }

  openAddMatchDialog(): void {
    const dialogRef = this._dialog.open(
      EditMatchDialogComponent, {
        data: <IEditMatchDialogData>{
          availablePlayers: this.players,
          selectedPlayer1: this.players[0],
          selectedPlayer2: this.players[0],
          title: 'Dodaj mecz'
        }
      });

    dialogRef.afterClosed().subscribe((result: IEditMatchDialogData) => {
      console.log(`Result is ${JSON.stringify(result)}`);
      if (result !== undefined) {
        const match = <IMatch>{
          player1: {
            id: result.selectedPlayer1.id,
            score: result.player1Score,
            name: result.selectedPlayer1.name
          },
          player2: {
            id: result.selectedPlayer2.id,
            score: result.player2Score,
            name: result.selectedPlayer2.name
          }
        };

        this._matchService.addMatch(match);
      }
    });
  }
}

export class MatchesDataSource extends DataSource<IMatch> {

  constructor(private _matchService: MatchService) {
    super();
  }

  connect(): BehaviorSubject<IMatch[]> {
    return this._matchService.dataChange;
  }

  disconnect(): void {
  }
}
