import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { RankingComponent } from './ranking/ranking.component';
import { RankingService } from './shared/services/ranking.service';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ScoresComponent } from './scores/scores.component';
import { EditMatchDialogComponent } from './shared/edit-match-dialog/edit-match-dialog.component';
import { DeleteConfirmationDialogComponent } from './shared/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatchService } from './shared/services/match.service';
import { PlayerService } from './shared/services/player.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    RankingComponent,
    ScoresComponent,
    EditMatchDialogComponent,
    DeleteConfirmationDialogComponent,
    ToolbarComponent
  ],
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'ranking', pathMatch: 'full' },
      { path: 'ranking', component: RankingComponent, data: {title: 'Tabela'} },
      { path: 'scores', component: ScoresComponent, data: {title: 'Wyniki' } },
      { path: '**', redirectTo: 'ranking' }
    ]),
    BrowserModule,
    MaterialModule,
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    RankingService,
    MatchService,
    PlayerService
  ],
  entryComponents: [EditMatchDialogComponent, DeleteConfirmationDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
