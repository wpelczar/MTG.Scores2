
import { Component, OnInit } from '@angular/core';
import { IMatch } from './match';
import { MatchService } from './match.service';

@Component({
    selector: 'scores',
    templateUrl: './scores.component.html',
    styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
    matches: IMatch[];
    errorMessage: string;

    constructor(private _matchService: MatchService) {
    }

    ngOnInit(): void {
        this._matchService.getMatches()
            .subscribe(matches => this.matches = matches,
            error => this.errorMessage = <any>error);
    }

    edit(): void {
        console.log('EDITED!!!');
    }

    delete(): void {
        console.log('DELETED!!!');

    }
}