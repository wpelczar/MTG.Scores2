import { Component, OnInit } from '@angular/core';
import { IRankingRecord } from '../shared/models/ranking-record';
import { RankingService } from '../shared/services/ranking.service';

@Component({
  templateUrl: './ranking.component.html',
  selector: 'app-ranking'
})
export class RankingComponent implements OnInit {
  ranking: IRankingRecord[];
  errorMessage: string;
  displayedColumns = ['position', 'name', 'matches', 'wonMatches', 'lostMatches', 'wonPoints', 'lostPoints'];

  constructor(private _rankigService: RankingService) {}

  ngOnInit(): void {
    this._rankigService.getRanking()
        .subscribe(rankingRecords => this.ranking = rankingRecords,
            error => this.errorMessage = <any>error);
  }

}
