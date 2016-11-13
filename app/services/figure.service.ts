import { Injectable } from '@angular/core';
import { GAME_OVER, TEMPRORARY_START_POINT } from '../constants/index';

@Injectable()
export class figureService {
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
                    this.initFigure(gameField, Object.create(TEMPRORARY_START_POINT));
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
}