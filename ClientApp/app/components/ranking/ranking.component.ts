import { Component, OnInit } from '@angular/core';
import { IRankingRecord } from './rankingRecord';
import { RankingService } from './ranking.service';

@Component({
  templateUrl: './ranking.component.html',
  selector: 'ranking'
})
export class RankingComponent implements OnInit{
  ranking: IRankingRecord[];
  errorMessage: string;
  displayedColumns = ['position', 'name', 'matches', 'wonMatches', 'lostMatches', 'wonPoints', 'lostPoints'];

  constructor(private _rankigService: RankingService){}

  ngOnInit(): void {
    this._rankigService.getRanking()
        .subscribe(rankingRecords => this.ranking = rankingRecords,
            error => this.errorMessage = <any>error)
  }

}