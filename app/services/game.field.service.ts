import { Injectable } from '@angular/core';

@Injectable()
export class gameFieldService {
    createArrayWithElements(countOfRow, countOfCol) {
        return new Array(countOfRow).fill('').map(e => new Array(countOfCol).fill('').map(e => false));
    }

    getPointsToRender(figure) {
        let mainPoint = figure.middlePoint;
        let coords = figure.coords[figure.currentState];

        let pointsToRender = coords.map(elem => {
            let xCoord = mainPoint.x + elem.x;
            let yCoord = mainPoint.y + elem.y;

            if ((xCoord >= 0 && xCoord < 10)
                && (yCoord >= 0 && yCoord < 20)) {
                return {x: xCoord, y: yCoord};
            }
        }).filter(e => e);

        return pointsToRender;
    }
}