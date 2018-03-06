import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { sharedConfig } from './app.module.shared';
import { MatchService } from './components/scores/match.service';
import { PlayerService } from './components/scores/player.service';
import { RankingService } from './components/ranking/ranking.service';
import { MatDialogModule, MatButtonModule, MatOptionModule, MatInputModule, MatSelectModule, MatGridListModule, MatFormFieldModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddMatchDialogComponent } from './components/scores/add-match-dialog.component';
import { CommonModule } from '@angular/common';
import { DeleteConfirmationDialogComponent } from './components/scores/delete-confirmation-dialog.component';

@NgModule({
  bootstrap: sharedConfig.bootstrap,
  declarations: sharedConfig.declarations,
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatFormFieldModule,
    MatOptionModule,
    ...sharedConfig.imports
  ],
  providers: [
    MatchService,
    PlayerService,
    RankingService,
    { provide: 'ORIGIN_URL', useValue: location.origin }
  ],
  entryComponents: [AddMatchDialogComponent, DeleteConfirmationDialogComponent]

})
export class AppModule {
}
