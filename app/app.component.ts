import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IS_START_GAME } from './store/start.game.reducer';

interface StartState {
    isGameStarted: boolean;
}

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: './app.component.template.html'
})
export class AppComponent {
    private isStarted;
    private title: string = `Tetris`;
    private startGame: string = "Start Game";

    constructor(private store: Store<StartState>) {
        store.select('isGameStarted').subscribe(e => {
            this.isStarted = e;
        });
    }

    buttonHandler() {
        this.store.dispatch({ type: IS_START_GAME });
    }
}