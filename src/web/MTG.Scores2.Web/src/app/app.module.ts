import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { RankingComponent } from './ranking/ranking.component';
import { RankingService } from './shared/services/ranking.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ScoresComponent } from './scores/scores.component';
import { EditMatchDialogComponent } from './shared/edit-match-dialog/edit-match-dialog.component';
import { DeleteConfirmationDialogComponent } from './shared/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatchService } from './shared/services/match.service';
import { PlayerService } from './shared/services/player.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { NewTournamentComponent } from './new-tournament/new-tournament.component';
import { TournamentDetailsComponent } from './tournament-details/tournament-details.component';
import { TournamentService } from './shared/services/tournament.service';
import { ParticipantsComponent } from './participants/participants.component';

@NgModule({
  declarations: [
    AppComponent,
    RankingComponent,
    ScoresComponent,
    EditMatchDialogComponent,
    DeleteConfirmationDialogComponent,
    ToolbarComponent,
    TournamentsComponent,
    NewTournamentComponent,
    TournamentDetailsComponent,
    ParticipantsComponent
  ],
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'tournaments', pathMatch: 'full' },
      { path: 'tournaments', component: TournamentsComponent, data: { title: 'Turnieje' } },
      { path: 'new-tournament', component: NewTournamentComponent, data: { title: 'Dodaj turniej' } },
      { path: 'tournament-details/:id', component: TournamentDetailsComponent} ,
      { path: '**', redirectTo: 'ranking' }
    ]),
    BrowserModule,
    MaterialModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    RankingService,
    MatchService,
    PlayerService,
    TournamentService
  ],
  entryComponents: [EditMatchDialogComponent, DeleteConfirmationDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
