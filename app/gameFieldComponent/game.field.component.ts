import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { StartStateInterface } from '../interfaces/index';
import { END_GAME, ROW_COUNT, COL_COUNT, GAME_OVER } from '../constants/index';

@Component({
    moduleId: module.id,
    selector: 'game-field',
    templateUrl: './game.field.component.template.html'
})
export class GameFildComponent {
    private isStarted;
    private endGame: string = END_GAME;
    private subscribers: Array<any> = [];
    private gameField: Array<Array<boolean>> = this.createArrayWithElements(ROW_COUNT, COL_COUNT);

    private temporaryStartPoint = {x: 0, y: 0};

    constructor(private store: Store<StartStateInterface>) {
        this.subscribers.push(store.select('isGameStarted').subscribe(e => {
            this.isStarted = e;
        }));
    }

    createArrayWithElements(countOfRow, countOfCol) {
        return new Array(countOfRow).fill('').map(e => new Array(countOfCol).fill('').map(e => false));
    }

    initFigure(gameField: Array<Array<boolean>>, cellOfField: {x:number, y:number}) {
        gameField[cellOfField.y][cellOfField.x] = true;

        this.moveDown(gameField, cellOfField, 100);
    }

    moveDown(gameField, cellOfField, speedOfMovement) {
        setTimeout(() => {
            gameField[cellOfField.y][cellOfField.x] = false;
            gameField[++cellOfField.y][cellOfField.x] = true;

            if (cellOfField.y < gameField.length - 1 && this.isNextFieldEmpty(gameField, cellOfField)) {
                this.moveDown(gameField, cellOfField, speedOfMovement);
            } else {
                if (cellOfField.y > 1) {
                    this.initFigure(gameField, Object.create(this.temporaryStartPoint));
                } else {
                    alert(GAME_OVER);
                }
            }
        }, speedOfMovement);
    }

    isNextFieldEmpty(gameField, cellOfField) {
        if (!gameField[cellOfField.y + 1][cellOfField.x]) {
            return true;
        }
    }

    ngOnInit() {
        this.initFigure(this.gameField, Object.create(this.temporaryStartPoint));
    }

    ngOnDestroy() {
        this.subscribers.forEach(e => e.unsubscribe());
    }
}