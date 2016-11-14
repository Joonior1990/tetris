import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { StartStateInterface } from '../interfaces/index';
import { END_GAME, INIT_GAME_OR_FIGURE, START_SPEED, CLEAR_FIELD } from '../constants/index';

import { figureService } from '../services/index';

@Component({
    moduleId: module.id,
    selector: 'game-field',
    templateUrl: './game.field.component.template.html'
})
export class GameFildComponent {
    constructor(private store: Store<StartStateInterface>,
                private figureService: figureService) {

        this.subscribers.push(store.select('isGameStarted').subscribe(e => {
            this.isStarted = e;
        }));

        this.subscribers.push(this.store.select('gameFieldReducer').subscribe(e => {
            this.field = e;
        }));

        document.addEventListener("keydown", this.figureService.keyboardHandler.bind(this.figureService));
    }

    private isStarted;
    private field;

    private endGame: string = END_GAME;
    private subscribers: Array<any> = [];

    ngOnInit() {
        this.store.dispatch({ type: CLEAR_FIELD });
        this.store.dispatch({ type: INIT_GAME_OR_FIGURE });
        this.figureService.moveDown(START_SPEED);
    }

    ngOnDestroy() {
        this.subscribers.forEach(e => e.unsubscribe());
    }
}