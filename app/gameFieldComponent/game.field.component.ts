import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { StartStateInterface } from '../interfaces/index';
import { END_GAME, ROW_COUNT, COL_COUNT } from '../constants/index';

@Component({
    moduleId: module.id,
    selector: 'game-field',
    templateUrl: './game.field.component.template.html'
})
export class GameFildComponent {
    private isStarted
    private endGame: string = END_GAME;
    private subscribers: Array<any> = [];

    private rowCollection: Array<{}> = new Array(ROW_COUNT).fill('').map((e, index) => ({rowId: index, full: false}));
    private colCollection: Array<{}> = new Array(COL_COUNT).fill('').map((e, index) => ({colId: index, full: false}));

    constructor(private store: Store<StartStateInterface>) {
        this.subscribers.push(store.select('isGameStarted').subscribe(e => {
            this.isStarted = e;
        }));
    }

    ngOnDestroy() {
        this.subscribers.forEach(e => e.unsubscribe());
    }
}