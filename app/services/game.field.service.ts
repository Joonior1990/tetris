import { Injectable } from '@angular/core';

@Injectable()
export class gameFieldService {
    createArrayWithElements(countOfRow, countOfCol) {
        return new Array(countOfRow).fill('').map(e => new Array(countOfCol).fill('').map(e => false));
    }
}