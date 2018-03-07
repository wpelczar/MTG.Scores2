﻿
import { Component, OnInit } from '@angular/core';
import { IMatch } from './match';
import { MatchService } from './match.service';
import { IPlayer } from './player';
import { PlayerService } from './player.service';
import { EditMatchDialogComponent } from './edit-match-dialog.component';
import { MatDialog } from '@angular/material';
import { IEditMatchDialogData } from './edit-match-dialog-data';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog.component';

@Component({
    selector: 'scores',
    templateUrl: './scores.component.html',
    styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
    matches: IMatch[];
    players: IPlayer[];
    selectedPlayer: IPlayer = null;
    errorMessage: string; S

    constructor(private _matchService: MatchService,
        private _playerServise: PlayerService,
        public _dialog: MatDialog) {
    }

    ngOnInit(): void {
        this._matchService.getMatches()
            .subscribe(matches => this.matches = matches,
            error => this.errorMessage = <any>error);

        this._playerServise.getPlayers()
            .subscribe(players => this.players = players,
            error => this.errorMessage = <any>error)
    }

    edit(id: number): void {
        console.log('EDITED!!!' + id);
    }

    delete(id: number): void {
        let dialogRef = this._dialog.open(
            DeleteConfirmationDialogComponent)

        dialogRef.afterClosed().subscribe((result: any) => {
            console.log(`Result is ${JSON.stringify(result)}`);
            if (result !== undefined) {
                this._matchService.deleteMatch(id)
                    .subscribe(data => {
                        console.log('OK. ' + data);
                        this.matches = this.matches.filter(m => m.id !== id);
                    },
                    error => console.log('ERROR. ', error));
            }
        })
    }

    openAddMatchDialog(): void {
        let dialogRef = this._dialog.open(
            EditMatchDialogComponent, {
                data: <IEditMatchDialogData>{
                    availablePlayers: this.players,
                    selectedPlayer1: this.players[0],
                    selectedPlayer2: this.players[0]
                }
            })

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
                this._matchService.addMatch(match)
                    .subscribe(data => {
                        console.log('Created')
                        let createdMatch = <IMatch>(JSON.parse(data.text()));
                        console.log(JSON.stringify(createdMatch));
                        this.matches.push(createdMatch)
                    },
                    error => console.log('Error. ', error));
            }
        });
    }
}
