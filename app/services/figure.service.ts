import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GAME_OVER, MOVE_DOWN, INIT_NEW_FIGURE, START_SPEED, MOVE_LEFT, MOVE_RIGHT } from '../constants/index';
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

            if (cellOfField.y < gameField.length - 1 && this.isNextFieldEmpty(gameField, cellOfField)) {
                this.store.dispatch({ type: MOVE_DOWN });
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

    moveHorisontal(e) {
        if (!this.isStarted) {
            return;
        }

        switch (e.code) {
            case 'ArrowRight':
                this.store.dispatch({ type: MOVE_RIGHT });
                break;
            case 'ArrowLeft':
                this.store.dispatch({ type: MOVE_LEFT });
                break;
        }
    }
}