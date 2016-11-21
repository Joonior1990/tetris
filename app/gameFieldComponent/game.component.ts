import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { StartStateInterface } from '../interfaces/index';
import { END_GAME } from '../constants/index';

import { gameService } from '../services/index';

@Component({
    moduleId: module.id,
    selector: 'game-field',
    templateUrl: 'game.component.template.html'
})
export class GameComponent {
    constructor(private store: Store<StartStateInterface>,
                private gameService: gameService) {

        this.subscribers.push(store.select('isGameStarted').subscribe(e => {
            this.isStarted = e;
        }));

        this.subscribers.push(this.store.select('gameReducer').subscribe(e => {
            this.gameStore = e;

            if (this.gameStore.figure) {
                this.nextFigureField = this.gameService.compliteFieldWithNextFigure(this.gameStore.figure.viewNextFigure, {x: 2, y: 3}, 4, 4);
            }
        }));

        this.bindKeyboardHandler = this.gameService.keyboardHandler.bind(this.gameService);
        document.addEventListener("keydown", this.bindKeyboardHandler);
    }

    private isStarted;
    private gameStore;
    private nextFigureField;
    private bindKeyboardHandler;

    private endGame: string = END_GAME;
    private subscribers: Array<any> = [];

    ngOnInit() {
        this.gameService.startGame();
    }

    ngOnDestroy() {
        this.subscribers.forEach(e => e.unsubscribe());
        document.removeEventListener("keydown", this.bindKeyboardHandler);
    }
}