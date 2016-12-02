import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { startGameReducer, gameReducer } from './store/index';

// main component
import { AppComponent }   from './app.component';
import { GameComponent } from './gameFieldComponent/game.component';

// common Components
import { ButtonComponent } from './commonComponent/buttonComponent/button.component';
import { PopupComponent } from './commonComponent/popupComponent/popup.component';

// service
import { gameService, helperService } from './services/index';

@NgModule({
    imports:      [
        BrowserModule,
        StoreModule.provideStore({
            isGameStarted: startGameReducer,
            gameReducer: gameReducer
        },
        {
            isGameStarted: false,
            gameReducer: {}
        }
    )],
    declarations: [
        AppComponent,
        GameComponent,
        ButtonComponent,
        PopupComponent
    ],
    providers: [
        gameService,
        helperService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }