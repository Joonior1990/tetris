import { Component } from '@angular/core';
@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: './app.component.template.html'
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