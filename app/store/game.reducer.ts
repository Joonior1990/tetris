import { ActionReducer, Action } from '@ngrx/store';
import { INIT_FIELD, CREATE_NEW_FIGURE, START_GAME, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_BOTTOM, ROTATE_FIGURE, CLEAR_FIGURE_POSITION } from '../constants/index';
import { helperService } from '../services/helper.service';

let helper = new helperService();

export const gameFieldReducer: ActionReducer<any> = (state = {}, action: Action) => {
    switch (action.type) {
        case INIT_FIELD:
            return helper.initGame();
        case CREATE_NEW_FIGURE:
            state.figure = helper.createNewFigure();
            return state;
        case START_GAME:
            return state;
        case CLEAR_FIGURE_POSITION:
            return helper.clearCurrent(state);
        case MOVE_DOWN:
            return helper.moveDown(state);
        case MOVE_LEFT:
            return state;
        case MOVE_RIGHT:
            return state;
        case MOVE_BOTTOM:
            return state;
        case ROTATE_FIGURE:
            return state;
        default:
            return state;
    }
}



