import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { startGameReducer } from './store/start.game.reducer';

import { AppComponent }   from './app.component';
import { GameFildComponent } from './gameFieldComponent/game.field.component';

// common Components
import { ButtonComponent } from './commonComponent/buttonComponent/button.component';

@NgModule({
    imports:      [
        BrowserModule,
        StoreModule.provideStore({ isGameStarted: startGameReducer }, {isGameStarted: false})
    ],
    declarations: [
        AppComponent,
        GameFildComponent,
        ButtonComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }