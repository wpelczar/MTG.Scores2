import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IRankingRecord } from '../shared/models/ranking-record';
import { RankingService } from '../shared/services/ranking.service';

@Component({
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
  selector: 'app-ranking'
})
export class RankingComponent implements OnInit {
  @Input() tournamentId: number;

  ranking: IRankingRecord[];
  errorMessage: string;
  displayedColumns = ['position', 'name', 'matches', 'wonMatches', 'lostMatches', 'wonPoints', 'lostPoints'];

  constructor(private _rankigService: RankingService) {}

  ngOnInit(): void {
    this.getRanking();
  }

  refreshData() {
    this.getRanking();
  }

  private getRanking() {
    this._rankigService.getRanking(this.tournamentId)
        .subscribe(rankingRecords => this.ranking = rankingRecords,
            error => this.errorMessage = <any>error);
  }
}
