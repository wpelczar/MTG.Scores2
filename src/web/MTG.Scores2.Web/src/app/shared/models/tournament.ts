import { IParticipant } from './participant';

export interface ITournament {
  id: number;
  name: string;
  participants: IParticipant[];
}
