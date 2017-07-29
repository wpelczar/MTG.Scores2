import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { ScoresComponent } from './components/scores/scores.component';
import { MatchFilterByPlayerPipe } from './components/scores/match-filter-by-player.pipe';
import { RankingComponent } from './components/ranking/ranking.component';

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        ScoresComponent,
        RankingComponent,
        MatchFilterByPlayerPipe
    ],
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'scores', component: ScoresComponent },
            { path: 'ranking', component: RankingComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
};
