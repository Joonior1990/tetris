import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { startGameReducer } from './store/start.game.reducer';

import { AppComponent }   from './app.component';
import { GameFildComponent } from './gameFieldComponent/game.field.component';

@NgModule({
    imports:      [
        BrowserModule,
        StoreModule.provideStore({ isGameStarted: startGameReducer }, {isGameStarted: false})
    ],
    declarations: [ AppComponent, GameFildComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }