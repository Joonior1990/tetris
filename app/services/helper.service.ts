import { Injectable } from '@angular/core';
import { ROW_COUNT, COL_COUNT, START_X_COORD, START_Y_COORD } from "../constants/grid.constants";
import { LIST_OF_FIGURES, LIST_VIEWS, CHECK_NEXT, CHECK_LEFT, CHECK_RIGHT } from '../constants/figure.constants';
import {MOVE_LEFT, MOVE_RIGHT} from "../constants/reducer.constants";

@Injectable()
export class helperService {
    initGame() {
        let gameObject = {
            field: this.createEmptyField(ROW_COUNT, COL_COUNT),
            figure: this.createNewFigure(),
            isMoveNext: true,
            isFieldUpdate: true
        };

        return gameObject;
    }

    createEmptyField(countOfRow, countOfCol) {
        return new Array(countOfRow).fill('').map(e => new Array(countOfCol).fill('').map(e => false));
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

    moveDown(state) {
        let figure = state.figure;
        let field = state.field;
        let coordsToCheck = figure.coordsToCheck[figure.currentView][CHECK_NEXT];

        state.isMoveNext = this.checkNextStep(field, figure.coords, coordsToCheck);

        if (state.isMoveNext) {
            this.clearCurrent(state);

            figure.mainPoint.y++;
            figure.coords = this.getCoords(figure.mainPoint, figure.views[figure.currentView]);

            this.renderCoordsInView(figure.coords).forEach(e => field[e.y][e.x] = true );
        }

        return state;
    }

    moveHorisontal(state, action) {
        let figure = state.figure;
        let field = state.field;

        let coordsToCheck = figure.coordsToCheck[figure.currentView][action];
        let coords = state.figure.coords;

        let isActionPossible;
        let changeCurrentPositionX = action === CHECK_LEFT ? -1: 1;

        switch (action) {
            case CHECK_LEFT:
                isActionPossible = coordsToCheck.every(i => coords[i].y < 0 || coords[i].x > 0 && !field[coords[i].y][coords[i].x - 1]);
                break;
            case CHECK_RIGHT:
                isActionPossible = coordsToCheck.every(i => coords[i].y < 0 || coords[i].x < 9 && !field[coords[i].y][coords[i].x + 1]);
                break;
        }

        if (isActionPossible) {
            this.clearCurrent(state);

            figure.mainPoint.x += changeCurrentPositionX;
            state.figure.coords = this.getCoords(figure.mainPoint, figure.views[figure.currentView]);

            this.renderCoordsInView(figure.coords).forEach(e => field[e.y][e.x] = true );
        }

        state.isFieldUpdate = true;
        return state;
    }

    checkNextStep(field, coords, coordsToCheck) {
        return coordsToCheck.every(i => coords[i].y < 19 && !field[coords[i].y + 1][coords[i].x]);
    }

    clearCurrent(state) {
        this.renderCoordsInView(state.figure.coords).forEach(e => state.field[e.y][e.x] = false);

        return state;
    }
}


