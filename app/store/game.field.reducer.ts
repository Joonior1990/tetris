import { ActionReducer, Action } from '@ngrx/store';
import { gameFieldService } from '../services/index';
import { INIT_GAME, MOVE_DOWN, ROW_COUNT, COL_COUNT, INIT_NEW_FIGURE, MOVE_RIGHT, MOVE_LEFT, TEMPRORARY_START_POINT, RIGHT_LIMIT, LEFT_LIMIT } from '../constants/index';

const gameFS = new gameFieldService();

export const gameFieldReducer: ActionReducer<any> = (state = {}, action: Action) => {
    switch (action.type) {
        case INIT_GAME:
            return initNewFigureOnTheField(state, true, gameFS);
        case MOVE_DOWN:
            return moveDown(state);
        case INIT_NEW_FIGURE:
            return initNewFigureOnTheField(state, false, null);
        case MOVE_LEFT:
            return moveHorisontal(state, false);
        case MOVE_RIGHT:
            return moveHorisontal(state, true);
        default:
            return state;
    }
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

function initNewFigureOnTheField(state, isInitField, gameFS) {
    let newGameField;
    if (isInitField) {
        newGameField = gameFS.createArrayWithElements(ROW_COUNT, COL_COUNT);
    } else {
        state.gameField[state.gameFigure.y][state.gameFigure.x] = true;
    }

    return {
        gameField: isInitField? newGameField: state.gameField,
        gameFigure: Object.create(TEMPRORARY_START_POINT)
    }
}

function moveHorisontal(state, isRight) {
    let field = state.gameField;
    let figure = state.gameFigure;

    if ((isRight && (figure.x >= RIGHT_LIMIT || field[figure.y][figure.x + 1]))
    || (!isRight && (figure.x <= LEFT_LIMIT || field[figure.y][figure.x - 1]))) {
        return state;
    }

    field[figure.y][figure.x] = false;

    // change horisontal position of figure
    isRight ? ++figure.x : --figure.x;
    field[figure.y][figure.x] = true;

    return state;
}