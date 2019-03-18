import { IPlayer } from './player';

export interface ITournament {
  id: number;
  name: string;
  participants: IPlayer[];
}
