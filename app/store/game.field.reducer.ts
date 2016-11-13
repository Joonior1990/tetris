import { ActionReducer, Action } from '@ngrx/store';
import { gameFieldService } from '../services/index';
import { INIT_GAME, MOVE_DOWN, ROW_COUNT, COL_COUNT, INIT_NEW_FIGURE, TEMPRORARY_START_POINT } from '../constants/index';

const gameFS = new gameFieldService();

export const gameFieldReducer: ActionReducer<any> = (state = {}, action: Action) => {
    switch (action.type) {
        case INIT_GAME:
            return initNewFigureOnTheField(state, true);
        case MOVE_DOWN:
            return moveDown(state);
        case INIT_NEW_FIGURE:
            return initNewFigureOnTheField(state, false);
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

function initNewFigureOnTheField(state, isInitField) {
    let gameField;
    if (isInitField) {
        gameField = gameFS.createArrayWithElements(ROW_COUNT, COL_COUNT);
    } else {
        state.gameField[state.gameFigure.y][state.gameFigure.x] = true;
    }

    return {
        gameField: isInitField? gameField: state.gameField,
        gameFigure: Object.create(TEMPRORARY_START_POINT)
    }
}