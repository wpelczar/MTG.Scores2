import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { sharedConfig } from './app.module.shared';
import { MatchService } from './components/scores/match.service';

@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: sharedConfig.declarations,
    providers:[
        MatchService,
    ],
    imports: [
        ServerModule,
        ...sharedConfig.imports
    ]
})
export class AppModule {
}
