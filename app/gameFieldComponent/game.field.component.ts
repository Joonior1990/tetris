import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { StartStateInterface } from '../interfaces/index';
import { END_GAME, ROW_COUNT, COL_COUNT, GAME_OVER, INIT_GAME, TEMPRORARY_START_POINT } from '../constants/index';

import { figureService } from '../services/index';

@Component({
    moduleId: module.id,
    selector: 'game-field',
    templateUrl: './game.field.component.template.html'
})
export class GameFildComponent {
    constructor(private store: Store<StartStateInterface>,
                private figureService: figureService) {

        this.store.dispatch({ type: INIT_GAME });

        this.subscribers.push(store.select('isGameStarted').subscribe(e => {
            this.isStarted = e;
        }));

        this.subscribers.push(this.store.select('gameFieldReducer').subscribe(e => {
            this.field = e;
        }));

        document.addEventListener("keydown", this.figureService.moveHorisontal.bind(this.figureService, this.field.gameField,  this.field.gameFigure));
        // document.onkeydown = this.figureService.moveHorisontal.bind(null, this.temroraryStartPoint, this.gameField);
    }

    private isStarted;
    private field;

    private endGame: string = END_GAME;
    private subscribers: Array<any> = [];

    private temroraryStartPoint = TEMPRORARY_START_POINT;

    ngOnInit() {
        this.figureService.initFigure(this.field.gameField, this.field.gameFigure);
    }

    ngOnDestroy() {
        this.subscribers.forEach(e => e.unsubscribe());
    }
}