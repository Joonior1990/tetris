import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IS_START_GAME } from '../../constants/index';

interface StartState {
    isGameStarted: boolean;
}

@Component({
    moduleId: module.id,
    selector: 'button-component',
    template: `
    <button (click)="buttonHandler()" class="expanded button">{{title}}</button>
`
})
export class ButtonComponent {
    @Input() title: string;

    constructor(private store: Store<StartState>) {}

    buttonHandler() {
        this.store.dispatch({ type: IS_START_GAME });
    }
}