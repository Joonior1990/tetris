import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { StartStateInterface } from '../interfaces/index';
import { END_GAME, ROW_COUNT, COL_COUNT } from '../constants/index';

@Component({
    moduleId: module.id,
    selector: 'game-field',
    templateUrl: './game.field.component.template.html'
})
export class GameFildComponent {
    private isStarted;
    private endGame: string = END_GAME;
    private subscribers: Array<any> = [];

    private rowCollection: Array<{}> = this.createArrayWithElements(ROW_COUNT);
    private colCollection: Array<{}> = this.createArrayWithElements(COL_COUNT);

    constructor(private store: Store<StartStateInterface>) {
        this.subscribers.push(store.select('isGameStarted').subscribe(e => {
            this.isStarted = e;
        }));
    }

    createArrayWithElements(countOfElements) {
        return new Array(countOfElements).fill('').map((e) => false);
    }

    initFigure(index) {
        this.rowCollection[index] = true;
        this.colCollection[index] = true;

        this.moveDown(index, 100, this.rowCollection.length - 1);
    }

    moveDown(index, speedOfMovement, lastIndex) {
        setTimeout(() => {
            this.rowCollection[index] = false;
            this.rowCollection[++index] = true;

            if (index < lastIndex && this.isNextFieldEmpty(this.rowCollection, index)) {
                this.moveDown(index, speedOfMovement, lastIndex);
            } else {
                if (index > 1) {
                    this.initFigure(0);
                } else {
                    alert(`Game over!`);
                }
            }
        }, speedOfMovement);
    }

    isNextFieldEmpty(rowCollection, index) {
        if (!rowCollection[index + 1]) {
            return true;
        }
    }

    ngOnInit() {
        this.initFigure(0);
    }

    ngOnDestroy() {
        this.subscribers.forEach(e => e.unsubscribe());
    }
}