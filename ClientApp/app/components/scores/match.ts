import { IPlayerScore } from './playerScore';

export interface IMatch {
  id: number;
  player1: IPlayerScore;
  player2: IPlayerScore;
}