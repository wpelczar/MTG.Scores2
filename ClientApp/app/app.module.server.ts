import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { sharedConfig } from './app.module.shared';
import { MatchService } from './components/scores/match.service';
import { PlayerService } from './components/scores/player.service';
import { FormsModule } from '@angular/forms';
import { RankingService } from './components/ranking/ranking.service';

@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: sharedConfig.declarations,
    providers:[
        MatchService,
        PlayerService,
        RankingService
    ],
    imports: [
        FormsModule,
        ServerModule,
        ...sharedConfig.imports
    ]
})
export class AppModule {
}
