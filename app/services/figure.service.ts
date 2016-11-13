import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GAME_OVER, MOVE_DOWN, INIT_NEW_FIGURE, START_SPEED } from '../constants/index';
import { StartStateInterface } from '../interfaces/index';

@Injectable()
export class figureService {
    constructor(private store: Store<StartStateInterface>) {
        this.store.select('isGameStarted').subscribe(e => {
            this.isStarted = e;
        });

        this.store.select('gameFieldReducer').subscribe(e => {
            this.field = e;
        });
    }

    private isStarted;
    private field;

    initFigure(gameField, cellOfField) {
        gameField[cellOfField.y][cellOfField.x] = true;

        this.moveDown(gameField, cellOfField, START_SPEED);
    }

    moveDown(gameField, cellOfField, speedOfMovement) {
        setTimeout(() => {
            if (!this.isStarted) {
                return;
            }

            this.store.dispatch({ type: MOVE_DOWN });

            if (cellOfField.y < gameField.length - 1 && this.isNextFieldEmpty(gameField, cellOfField)) {
                this.moveDown(gameField, cellOfField, speedOfMovement);
            } else {
                if (cellOfField.y > 1) {
                    this.store.dispatch({ type: INIT_NEW_FIGURE });
                    this.initFigure(this.field.gameField, this.field.gameFigure);
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

    moveHorisontal(gameField, cellOfField, e) {
        if (this.isStarted) {
            return;
        }

        // switch (e.code) {
        //     case 'ArrowRight':
        //         if (cellOfField.x === 19) {
        //             break;
        //         }
        //
        //         gameField[cellOfField.y][cellOfField.x] = false;
        //         gameField[cellOfField.y][++cellOfField.x] = true;
        //
        //         break;
        //     case 'ArrowLeft':
        //         if (cellOfField.x === 0) {
        //             break;
        //         }
        //
        //         gameField[cellOfField.y][cellOfField.x] = false;
        //         gameField[cellOfField.y][--cellOfField.x] = true;
        //         break;
            // }
    }
}