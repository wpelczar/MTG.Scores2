
import { Component, OnInit } from '@angular/core';
import { IMatch } from './match';
import { MatchService } from './match.service';
import { IPlayer } from './player';
import { PlayerService } from './player.service';

@Component({
    selector: 'scores',
    templateUrl: './scores.component.html',
    styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
    matches: IMatch[];
    players: IPlayer[];
    selectedPlayer: IPlayer = null;
    errorMessage: string;

    constructor(private _matchService: MatchService, 
                private _playerServise: PlayerService) {
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
        this._matchService.deleteMatch(id)
        .subscribe(data =>{
          console.log('OK. ' + data);
          this.matches = this.matches.filter(m => m.id != id);  
        }, 
            error => console.log('ERROR. ', error));
    }
}