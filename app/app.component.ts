import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { StartStateInterface } from './interfaces/index';
import { START_GAME, TITLE } from './constants/index';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: './app.component.template.html'
})
export class AppComponent {
    private isStarted;
    private title: string = TITLE;
    private startGame: string = START_GAME;
    private subscribers: Array<any> = [];

    constructor(private store: Store<StartStateInterface>) {
        this.subscribers.push(store.select('isGameStarted').subscribe(e => {
            this.isStarted = e;
        }));
    }

    ngOnDestroy() {
        this.subscribers.forEach(e => e.unsubscribe());
    }
}