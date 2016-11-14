import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { INIT_GAME_OR_FIGURE, GAME_OVER, MOVE_DOWN, START_SPEED, MOVE_LEFT, MOVE_RIGHT, ROTATE_FIGURE, MOVE_BOTTOM } from '../constants/index';
import { StartStateInterface } from '../interfaces/index';
import { gameFieldService } from './game.field.service';

@Injectable()
export class figureService {
    constructor(private store: Store<StartStateInterface>,
                private gameFS: gameFieldService) {

        this.store.select('isGameStarted').subscribe(e => {
            this.isStarted = e;
        });

        this.store.select('gameFieldReducer').subscribe(e => {
            this.field = e;
        });
    }

    private isStarted;
    private field;

    isCanToMoveDown(field, figure, maxValue) {
        let pointsToRender = this.gameFS.getPointsToRender(figure).sort((a,b) => b.y - a.y);
        let xCoords = pointsToRender.map(e => e.x);
        let yCoords = pointsToRender.map(e => e.y);

        let bottomPointsOfFigure = [];

        xCoords.forEach((e, index) => {
            addElementToArray(e, index, xCoords.lastIndexOf(e));
        });

        function addElementToArray(xCoord, index, lastIndex) {
            if (index === lastIndex) {
                bottomPointsOfFigure.push({
                    x: xCoord,
                    y: yCoords[index]
                });
            } else {
                xCoords.splice(lastIndex, 1);
                yCoords.splice(lastIndex, 1);
                addElementToArray(xCoord, index, xCoords.lastIndexOf(xCoord));
            }
        }

        return bottomPointsOfFigure.every(e => e.y < maxValue && !field[e.y + 1][e.x])
    }

    moveDown(speedOfMovement) {
        setTimeout(() => {
            if (!this.isStarted) {
                return;
            }

            if (this.isCanToMoveDown(this.field.gameField, this.field.gameFigure, this.field.gameField.length - 1)) {
                this.store.dispatch({ type: MOVE_DOWN });
                this.moveDown(speedOfMovement);
            } else {
                // TODO change condition to lenght current figure
                if (this.field.gameFigure.middlePoint.y > 1) {
                    this.moveDown(speedOfMovement);
                    this.store.dispatch({ type: INIT_GAME_OR_FIGURE });
                } else {
                    // TODO create popup with the message
                    alert(GAME_OVER);
                }
            }
        }, speedOfMovement);
    }

    keyboardHandler(e) {
        if (!this.isStarted) {
            return;
        }

        switch (e.code) {
            case 'ArrowRight':
                this.store.dispatch({ type: MOVE_RIGHT } );
                break;
            case 'ArrowLeft':
                this.store.dispatch({ type: MOVE_LEFT } );
                break;
            case 'ArrowDown':
                this.store.dispatch({ type: MOVE_BOTTOM } );
                break;
            case 'Space':
                this.store.dispatch({ type: ROTATE_FIGURE} );
                break;
        }
    }
}