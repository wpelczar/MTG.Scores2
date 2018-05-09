import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { ScoresComponent } from './components/scores/scores.component';
import { MatchFilterByPlayerPipe } from './components/scores/match-filter-by-player.pipe';
import { RankingComponent } from './components/ranking/ranking.component';
import { EditMatchDialogComponent } from './components/scores/edit-match-dialog.component';
import { DeleteConfirmationDialogComponent } from './components/scores/delete-confirmation-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        ScoresComponent,
        RankingComponent,
        MatchFilterByPlayerPipe,
        EditMatchDialogComponent,
        DeleteConfirmationDialogComponent,
    ],
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'scores', pathMatch: 'full' },
            { path: 'scores', component: ScoresComponent },
            { path: 'ranking', component: RankingComponent },
            { path: '**', redirectTo: 'scores' }
        ])
    ],
};
