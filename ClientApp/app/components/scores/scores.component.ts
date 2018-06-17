
import { Component, OnInit } from '@angular/core';
import { IMatch } from './match';
import { MatchService } from './match.service';
import { IPlayer } from './player';
import { PlayerService } from './player.service';
import { EditMatchDialogComponent } from './edit-match-dialog.component';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { IEditMatchDialogData } from './edit-match-dialog-data';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog.component';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
  matches: IMatch[];
  matchesDataSource: MatchesDataSource | null;
  players: IPlayer[];
  selectedPlayer: IPlayer = null;
  errorMessage: string;
  displayedColumns = ['player1.name', 'score', 'player2.name', 'actions'];

  constructor(private _matchService: MatchService,
    private _playerServise: PlayerService,
    public _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this._playerServise.getPlayers()
      .subscribe(players => this.players = players,
      error => this.errorMessage = <any>error);

    this.matchesDataSource = new MatchesDataSource(this._matchService);
    this._matchService.getMatches();
  }

  edit(match: IMatch): void {
    let dialogRef = this._dialog.open(
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
        let matchEditModel: IMatch = {
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
    let dialogRef = this._dialog.open(
      DeleteConfirmationDialogComponent)

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Result is ${JSON.stringify(result)}`);
      if (result !== undefined) {
        this._matchService.deleteMatch(id);
      }
    })
  }

  openAddMatchDialog(): void {
    let dialogRef = this._dialog.open(
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
        let match = <IMatch>{
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
        }

        this._matchService.addMatch(match);
      }
    });
  }
}

export class MatchesDataSource extends DataSource<IMatch> {

  constructor(private _matchService: MatchService){
    super();
  }

  connect(): BehaviorSubject<IMatch[]> {
    return this._matchService.dataChange;
  }

  disconnect(): void {
  }
}