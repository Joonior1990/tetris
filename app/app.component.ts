import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { StartStateInterface } from './interfaces/index';
import { START_GAME_MESSAGE, TITLE } from './constants/index';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: './app.component.template.html'
})
export class AppComponent {
    constructor(private store: Store<StartStateInterface>) {
        this.subscribers.push(store.select('isGameStarted').subscribe(e => {
            this.isStarted = e;
        }));
    }

    private isStarted;
    private title: string = TITLE;
    private startGame: string = START_GAME_MESSAGE;
    private subscribers: Array<any> = [];

    ngOnDestroy() {
        this.subscribers.forEach(e => e.unsubscribe());
    }
}