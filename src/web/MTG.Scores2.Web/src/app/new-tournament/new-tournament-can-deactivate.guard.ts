import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { NewTournamentComponent } from './new-tournament.component';

@Injectable({providedIn: 'root'})
export class NewTournamentCanDeactivateGuard implements CanDeactivate<NewTournamentComponent> {
  canDeactivate(
    component: NewTournamentComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if (component.unsavedChanges()){
      return confirm('Jesteś pewien? Zmaiany nie zostaną zapisane');
    } else {
      return true;
    }
  }
}