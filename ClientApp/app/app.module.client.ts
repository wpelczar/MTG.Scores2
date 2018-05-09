import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { sharedConfig } from './app.module.shared';
import { MatchService } from './components/scores/match.service';
import { PlayerService } from './components/scores/player.service';
import { RankingService } from './components/ranking/ranking.service';
import { MaterialModule} from './shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditMatchDialogComponent } from './components/scores/edit-match-dialog.component';
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
    MaterialModule,
    ReactiveFormsModule,
    ...sharedConfig.imports
  ],
  providers: [
    MatchService,
    PlayerService,
    RankingService,
    { provide: 'ORIGIN_URL', useValue: location.origin }
  ],
  entryComponents: [EditMatchDialogComponent, DeleteConfirmationDialogComponent]

})
export class AppModule {
}
