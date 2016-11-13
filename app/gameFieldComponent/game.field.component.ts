import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { StartStateInterface } from '../interfaces/index';
import { END_GAME, ROW_COUNT, COL_COUNT, GAME_OVER, TEMPRORARY_START_POINT } from '../constants/index';

import { figureService, gameFieldService } from '../services/index';

@Component({
    moduleId: module.id,
    selector: 'game-field',
    templateUrl: './game.field.component.template.html'
})
export class GameFildComponent {
    constructor(private store: Store<StartStateInterface>,
                private gameFieldService: gameFieldService,
                private figureService: figureService) {
        this.subscribers.push(store.select('isGameStarted').subscribe(e => {
            this.isStarted = e;
        }));
    }

    private isStarted;
    private endGame: string = END_GAME;
    private subscribers: Array<any> = [];
    private gameField: Array<Array<boolean>> = this.gameFieldService.createArrayWithElements(ROW_COUNT, COL_COUNT);

 ngOnInit() {
        this.figureService.initFigure(this.gameField, Object.create(TEMPRORARY_START_POINT));
    }

    ngOnDestroy() {
        this.subscribers.forEach(e => e.unsubscribe());
    }
}