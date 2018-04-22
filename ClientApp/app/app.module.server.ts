import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { sharedConfig } from './app.module.shared';
import { MatchService } from './components/scores/match.service';
import { PlayerService } from './components/scores/player.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RankingService } from './components/ranking/ranking.service';
import { MatDialogModule, MatSelectModule, MatOptionModule, MatTableModule, MatIconModule, MatToolbarModule, MatProgressSpinnerModule } from '@angular/material';


@NgModule({
  bootstrap: sharedConfig.bootstrap,
  declarations: sharedConfig.declarations,
  providers: [
    MatchService,
    PlayerService,
    RankingService
  ],
  imports: [
    FormsModule,
    ServerModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    ...sharedConfig.imports
  ]
})
export class AppModule {
}
