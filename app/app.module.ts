import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { startGameReducer, gameFieldReducer } from './store/index';

// main component
import { AppComponent }   from './app.component';
import { GameFildComponent } from './gameFieldComponent/game.field.component';

// common Components
import { ButtonComponent } from './commonComponent/buttonComponent/button.component';

// service
import { figureService, gameFieldService } from './services/index';

@NgModule({
    imports:      [
        BrowserModule,
        StoreModule.provideStore({
            isGameStarted: startGameReducer,
            gameFieldReducer: gameFieldReducer
        },
        {
            isGameStarted: false,
            gameFieldReducer: {}
        }
    )],
    declarations: [
        AppComponent,
        GameFildComponent,
        ButtonComponent
    ],
    providers: [
        figureService,
        gameFieldService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }