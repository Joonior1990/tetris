import { ActionReducer, Action } from '@ngrx/store';
import { gameFieldService } from '../services/index';
import { CLEAR_FIELD, INIT_GAME_OR_FIGURE, MOVE_DOWN, ROW_COUNT, COL_COUNT, MOVE_RIGHT, MOVE_LEFT, RIGHT_LIMIT, LEFT_LIMIT, MOVE_BOTTOM, FIELD_NAME, FIGURE_NAME, BASE_FIGURE_PROPERTY, LIST_OF_FIGURES } from '../constants/index';

const gameFS = new gameFieldService();

export const gameFieldReducer: ActionReducer<any> = (state = {}, action: Action) => {
    let field = getPropertyFromState(state, FIELD_NAME);
    let figure = getPropertyFromState(state, FIGURE_NAME);

    switch (action.type) {
        case CLEAR_FIELD:
            return {};
        case INIT_GAME_OR_FIGURE:
            figure = getRandomFigure(BASE_FIGURE_PROPERTY, LIST_OF_FIGURES);
            return initNewFigureOnTheField(field, figure, FIELD_NAME, FIGURE_NAME, gameFS);
        case MOVE_DOWN:
            return moveDown(field, figure, FIELD_NAME, FIGURE_NAME);
        case MOVE_LEFT:
            return moveHorisontal(field, figure, FIELD_NAME, FIGURE_NAME, false);
        case MOVE_RIGHT:
            return moveHorisontal(field, figure, FIELD_NAME, FIGURE_NAME, true);
        case MOVE_BOTTOM:
            return moveFigureDown(field, figure, FIELD_NAME, FIGURE_NAME);
        default:
            return state;
    }
}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max - min);
    rand = Math.round(rand);
    return rand;
}

function getRandomFigure(baseFigure, listOfFigures) {
    // TODO change to full length of figures's list
    let typeOfFigure = listOfFigures[randomInteger(0, 0)];
    let newFigure = baseFigure;

    newFigure.coords = typeOfFigure;
    newFigure.currentState = newFigure.states[randomInteger(0, newFigure.states.length - 1)];
    newFigure.middlePoint.y = 0;

    return newFigure;
}

function combineStateProperty(field, figure, fieldNameProperty, figureNameProperty) {
    let newState = {};

    newState[fieldNameProperty] = field;
    newState[figureNameProperty] = figure;

    return newState;
}

function getPropertyFromState(state, property) {
    return state[property];
}

function moveDown(field, figure, fieldNameProperty, figureNameProperty) {
    let pointsToRender = gameFS.getPointsToRender(figure);
    pointsToRender.forEach(e => field[e.y][e.x] = false);

    figure.middlePoint.y++;
    field = initFigurePositionOntheField(field, figure, gameFS);

    return combineStateProperty(field, figure, fieldNameProperty, figureNameProperty);
}

function initNewFigureOnTheField(field, figure, fieldNameProperty, figureNameProperty, gameFS) {
    if (!field) {
        field = initFigurePositionOntheField(gameFS.createArrayWithElements(ROW_COUNT, COL_COUNT), figure, gameFS);
    } else {
        figure = getRandomFigure(BASE_FIGURE_PROPERTY, LIST_OF_FIGURES);
        field = initFigurePositionOntheField(field, figure, gameFS);
    }

    return combineStateProperty(field, figure, fieldNameProperty, figureNameProperty);
}

function initFigurePositionOntheField(field, figure, gameFS) {
    let pointsToRender = gameFS.getPointsToRender(figure);
    pointsToRender.forEach(point => field[point.y][point.x] = true);

    return field;
}

function moveHorisontal(field, figure, fieldNameProperty, figureNameProperty, isRight) {
    let isFigureCanModify = (isRight && (figure.x >= RIGHT_LIMIT || field[figure.y][figure.x + 1]))
        || (!isRight && (figure.x <= LEFT_LIMIT || field[figure.y][figure.x - 1]));

    if (isFigureCanModify) {
        return combineStateProperty(field, figure, fieldNameProperty, figureNameProperty);
    }

    field[figure.y][figure.x] = false;

    // change horisontal position of figure
    isRight ? ++figure.x : --figure.x;
    field[figure.y][figure.x] = true;

    return combineStateProperty(field, figure, fieldNameProperty, figureNameProperty);
}

function moveFigureDown(field, figure, fieldNameProperty, figureNameProperty) {
    field[figure.y][figure.x] = false;

    field.forEach((elem, index) => {
        if (elem[figure.x] === true) {
            field[index - 1][figure.x] = true;
            figure.y = index - 1;
        }

        if (index === 19) {
            field[index][figure.x] = true;
            figure.y = index;
        }
    });

    return combineStateProperty(field, figure, fieldNameProperty, figureNameProperty);
}