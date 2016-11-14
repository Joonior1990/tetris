import { ActionReducer, Action } from '@ngrx/store';
import { gameFieldService } from '../services/index';
import { INIT_GAME, MOVE_DOWN, ROW_COUNT, COL_COUNT, INIT_NEW_FIGURE, MOVE_RIGHT, MOVE_LEFT, TEMPRORARY_START_POINT, RIGHT_LIMIT, LEFT_LIMIT, MOVE_BOTTOM, FIELD_NAME, FIGURE_NAME } from '../constants/index';

const gameFS = new gameFieldService();

export const gameFieldReducer: ActionReducer<any> = (state = {}, action: Action) => {
    let field = getPropertyFromState(state, FIELD_NAME);
    let figure = getPropertyFromState(state, FIGURE_NAME);

    switch (action.type) {
        case INIT_GAME:
            return initNewFigureOnTheField(field, figure, FIELD_NAME, FIGURE_NAME, gameFS);
        case MOVE_DOWN:
            return moveDown(state);
        case INIT_NEW_FIGURE:
            return initNewFigureOnTheField(field, figure, FIELD_NAME, FIGURE_NAME, null);
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

function combineStateProperty(field, figure, fieldNameProperty, figureNameProperty) {
    let newState = {};

    newState[fieldNameProperty] = field;
    newState[figureNameProperty] = figure;

    return newState;
}

function getPropertyFromState(state, property) {
    return state[property];
}

function moveDown(state) {
    let field = state.gameField;
    let figure = state.gameFigure;

    field[figure.y][figure.x] = false;
    field[++figure.y][figure.x] = true;

    return {
        gameField: field,
        gameFigure: figure
    };
}

function initNewFigureOnTheField(field, figure, fieldNameProperty, figureNameProperty, gameFS) {
    if (!field) {
        field = gameFS.createArrayWithElements(ROW_COUNT, COL_COUNT);
    } else {
        field[figure.y][figure.x] = true;
    }

    return combineStateProperty(field, Object.assign({}, TEMPRORARY_START_POINT), fieldNameProperty, figureNameProperty);
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