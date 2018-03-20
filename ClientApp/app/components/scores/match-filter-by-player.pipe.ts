import { Pipe, PipeTransform } from '@angular/core';
import { IMatch } from './match';
import { IPlayer } from './player';

@Pipe({
  name: 'matchFilterByPlayer'
})
export class MatchFilterByPlayerPipe implements PipeTransform {
  transform(value: IMatch[], filterBy: IPlayer): IMatch[] {
    console.log('Filetring by: ' + JSON.stringify(filterBy))

    if (filterBy == null) {
      return value;
    }

    return value.filter((match: IMatch) =>
      match.player1.id === filterBy.id || match.player2.id === filterBy.id);
  }
}