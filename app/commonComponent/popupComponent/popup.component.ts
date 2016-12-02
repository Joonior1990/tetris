import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'popup',
    templateUrl: 'popup.component.template.html'
})
export class PopupComponent {
    @Input() isGameOver: string;
    @Output() isStartNewGame = new EventEmitter();

    clickHandler(isStartNewGame) {
        this.isStartNewGame.emit(isStartNewGame);
    }
}