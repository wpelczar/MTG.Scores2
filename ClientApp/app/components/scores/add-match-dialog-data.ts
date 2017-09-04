import { IPlayer } from './player';

export interface IAddMatchDialogData {
  player1Score: number,
  player2Score: number,
  selectedPlayer1: IPlayer,
  selectedPlayer2: IPlayer,
  availablePlayers: IPlayer[]
}