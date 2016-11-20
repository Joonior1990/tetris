import { Injectable } from '@angular/core';
import { ROW_COUNT, COL_COUNT, START_X_COORD, START_Y_COORD, RIGHT_OFFSET, LEFT_OFFSET, RIGHT_LIMIT, LEFT_TOP_LIMIT, MULTIPLIER } from "../constants/grid.constants";
import { LIST_OF_FIGURES, LIST_VIEWS, CHECK_NEXT, CHECK_LEFT, CHECK_RIGHT, CHECK_BOTTOM } from '../constants/figure.constants';

@Injectable()
export class helperService {
    initGame() {
        let gameObject = {
            field: this.createEmptyField(ROW_COUNT, COL_COUNT),
            figure: this.createNewFigure(),
            isMoveNext: true,
            isFieldUpdate: true,
            exp: {
                level: 1,
                exp: 0,
                range: [0, 1, 2, 3, 6, 10, 15, 21, 28, 36],
                multiplier: MULTIPLIER,
                expByCountsOfRows: [0, 1, 2.4, 4, 6]
            }

        };

        return gameObject;
    }

    createEmptyField(countOfRow, countOfCol) {
        return new Array(countOfRow).fill('').map(e => new Array(countOfCol).fill('').map(e => false));
    }

    clearFullRowsCntrolResults(field, exp) {
        let newField = field.slice();
        let startIndex = ROW_COUNT - 1;

        let count = 0;

        do {
            if (newField[startIndex].every(e => e)) {
                newField.splice(startIndex, 1);
                newField.unshift(new Array(COL_COUNT).fill('').map(e => false));
                count++;
            } else {
                startIndex--;
            }
        } while (startIndex);

        // count exp
        if (count) {
            exp.exp += exp.expByCountsOfRows[count] * exp.multiplier;
            if (exp.exp >= exp.range[exp.level] * Math.pow(exp.multiplier, 2)) {
                exp.level++;
            }
        }

        return [newField, exp];
    }

    createNewFigure() {
        let typeOfFigure = LIST_OF_FIGURES[this.randomInteger(0, LIST_OF_FIGURES.length - 1)];
        let currentView = LIST_VIEWS[this.randomInteger(0, LIST_VIEWS.length - 1)];
        let mainPoint = {x: START_X_COORD, y: START_Y_COORD};
        let views = typeOfFigure.views;
        let coords = this.getCoords(mainPoint, views[currentView]);

        let figure = {
            coords: coords,
            coordsToCheck: typeOfFigure.cordsToCheck,
            mainPoint: mainPoint,
            views: views,
            currentView: currentView
        };

        return figure;
    }

    getCoords(mainPoint, currentView) {
        return currentView.map(e => ({x: mainPoint.x + e.x, y: mainPoint.y + e.y}));
    }

    renderCoordsInView(coords) {
        return coords.filter(e => e.y >= 0 && e);
    }

    randomInteger(min, max) {
        let rand = min + Math.random() * (max - min);
        rand = Math.round(rand);
        return rand;
    }

    moveHandler(state, action) {
        let figure = state.figure;
        let field = state.field;
        let exp = state.exp;

        let coordsToCheck = action === CHECK_BOTTOM
            ? figure.coordsToCheck[figure.currentView][CHECK_NEXT]
            : figure.coordsToCheck[figure.currentView][action];
        let coords = state.figure.coords;

        let isActionPossible;
        let changeCurrentPositionX = (action === CHECK_LEFT) ? LEFT_OFFSET: RIGHT_OFFSET;

        switch (action) {
            case CHECK_NEXT:
                state.isMoveNext = this.checkNextStep(field, figure.coords, coordsToCheck);
                isActionPossible = state.isMoveNext;
                break;
            case CHECK_BOTTOM:
                state.isMoveNext = false;
                let _currentView = figure.views[figure.currentView];
                let _coords = this.getCoords(figure.mainPoint, _currentView);

                isActionPossible = this.checkNextStep(field, _coords, coordsToCheck);

                while (this.checkNextStep(field, _coords, coordsToCheck)) {
                    figure.mainPoint.y++;
                    _coords = this.getCoords(figure.mainPoint, _currentView);
                }
                break;
            case CHECK_LEFT:
                isActionPossible = coordsToCheck.every(i => coords[i].y < LEFT_TOP_LIMIT || coords[i].x > LEFT_TOP_LIMIT && !field[coords[i].y][coords[i].x + LEFT_OFFSET]);
                break;
            case CHECK_RIGHT:
                isActionPossible = coordsToCheck.every(i => coords[i].y < LEFT_TOP_LIMIT || coords[i].x < RIGHT_LIMIT && !field[coords[i].y][coords[i].x + RIGHT_OFFSET]);
                break;
        }

        if (isActionPossible) {
            this.clearCurrent(state);

            switch (action) {
                case CHECK_NEXT:
                    figure.mainPoint.y++;
                    break;
                case CHECK_LEFT:
                case CHECK_RIGHT:
                    figure.mainPoint.x += changeCurrentPositionX;
                    break;
            }

            state.figure.coords = this.getCoords(figure.mainPoint, figure.views[figure.currentView]);
            this.renderCoordsInView(figure.coords).forEach(e => field[e.y][e.x] = true );
        }

        if (!state.isMoveNext) {
            [state.field, state.exp] = this.clearFullRowsCntrolResults(field, exp);
        }

        state.isFieldUpdate = true;
        return state;
    }

    rotateFigure(state) {
        let figure = state.figure;
        let field = state.field;
        let indexCurrentView = +figure.currentView.split('_')[1];
        let nextView = indexCurrentView  === LIST_VIEWS.length - 1 ? LIST_VIEWS[0]: LIST_VIEWS[indexCurrentView + 1];

        let currentFigureCoords = this.getCoords(figure.mainPoint, figure.views[figure.currentView]);
        let nextFigureCoords = this.getCoords(figure.mainPoint, figure.views[nextView]);

        // c ~ currentFigureCoords;
        let c = this.renderCoordsInView(currentFigureCoords);
        let renderNextCoordsInView = this.renderCoordsInView(nextFigureCoords);

        // n ~ nextFigureCoords;
        let isRotatePossible = renderNextCoordsInView.every((n, i) => n.x >= 0 && n.x < 10 && (c.some(e => e.x === n.x && e.y === n.y) || !field[n.y][n.x]));

        if (isRotatePossible && state.isMoveNext) {
            this.clearCurrent(state);
            figure.currentView = nextView;

            state.figure.coords = this.getCoords(figure.mainPoint, figure.views[figure.currentView]);
            this.renderCoordsInView(figure.coords).forEach(e => field[e.y][e.x] = true );
        }

        state.isFieldUpdate = true;
        return state;
    }

    checkNextStep(field, coords, coordsToCheck) {
        return coordsToCheck.every(i => coords[i].y < -1 || coords[i].y < 19 && !field[coords[i].y + 1][coords[i].x]);
    }

    clearCurrent(state) {
        this.renderCoordsInView(state.figure.coords).forEach(e => state.field[e.y][e.x] = false);

        return state;
    }
}


