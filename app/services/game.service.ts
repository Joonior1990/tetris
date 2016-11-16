import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MOVE_LEFT, MOVE_RIGHT, ROTATE_FIGURE, MOVE_BOTTOM, INIT_FIELD, MOVE_DOWN, START_SPEED, CLEAR_FIGURE_POSITION, CREATE_NEW_FIGURE } from '../constants/index';
import { StartStateInterface } from '../interfaces/index';
import {GAME_OVER} from "../constants/message.cconstants";

@Injectable()
export class gameService {
    constructor(private store: Store<StartStateInterface>) {

        this.store.select('isGameStarted').subscribe(e => {
            this.isStarted = e;
        });

        this.store.select('gameReducer').subscribe(e => {
            this.gameData = e;
        });
    }

    private isStarted;
    private gameData;

    startGame() {
        this.store.dispatch({ type: INIT_FIELD });
        this.moveDown();
    }

    moveDown() {
        if (this.isStarted) {

            this.store.dispatch({ type: MOVE_DOWN });
            setTimeout(() => {
                if (this.gameData.isMoveNext) {
                    this.moveDown();
                } else {
                    // TODO change condition to right check
                    if (this.gameData.figure.mainPoint.y > 0) {
                        this.store.dispatch({ type: CREATE_NEW_FIGURE });
                        this.moveDown();
                    } else {
                        alert(GAME_OVER);
                    }
                }
            }, START_SPEED)
        }
    }

    keyboardHandler(e) {
        if (this.isStarted && this.gameData.isFieldUpdate) {
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
}