import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'game-field',
    templateUrl: './game.field.component.template.html'
})
export class GameFildComponent {
    private gameField: string = 'game field';
}