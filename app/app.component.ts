import { Component } from '@angular/core';
@Component({
    selector: 'my-app',
    template: `
        <h1 (click)="titleHandler(titleInput.value)">{{title}}</h1>
        <input #titleInput (keypress)="inputPressHandler($event, titleInput.value)">
    `
})
export class AppComponent {
    private title: string = `Tetris`;

    titleHandler(newTitle: string) {
        if (newTitle.length > 3) {
            this.title = newTitle;
        }
    }

    inputPressHandler(e, newTitle: string) {
        if (e.charCode === 13) {
            this.titleHandler(newTitle);
        }
    }
}