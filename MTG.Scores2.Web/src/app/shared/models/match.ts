import { IPlayerScore } from './player-score';

export interface IMatch {
  id: number;
  player1: IPlayerScore;
  player2: IPlayerScore;
}
