import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { sharedConfig } from './app.module.shared';
import { MatchService } from './components/scores/match.service';
import { PlayerService } from './components/scores/player.service';
import { RankingService } from './components/ranking/ranking.service';
import { MdDialogModule, MdButtonModule, MdOptionModule, MdInputModule, MdSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddMatchDialogComponent } from './components/scores/add-match-dialog.component';
import { CommonModule } from '@angular/common';

@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: sharedConfig.declarations,
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        HttpModule,
        MdDialogModule,
        MdButtonModule,
        MdInputModule,
        MdSelectModule,
        ...sharedConfig.imports
    ],
    providers: [
        MatchService,
        PlayerService,
        RankingService,
        { provide: 'ORIGIN_URL', useValue: location.origin }
    ],
        entryComponents: [AddMatchDialogComponent]

})
export class AppModule {
}
