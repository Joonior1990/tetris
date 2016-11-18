import { ActionReducer, Action } from '@ngrx/store';
import { INIT_FIELD, CREATE_NEW_FIGURE, START_GAME, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_BOTTOM, ROTATE_FIGURE, CHECK_LEFT, CHECK_RIGHT, CHECK_BOTTOM } from '../constants/index';
import { helperService } from '../services/helper.service';
import {CHECK_NEXT} from "../constants/figure.constants";

let helper = new helperService();

export const gameReducer: ActionReducer<any> = (state = {}, action: Action) => {
    switch (action.type) {
        case INIT_FIELD:
            return helper.initGame();
        case CREATE_NEW_FIGURE:
            state.figure = helper.createNewFigure();
            return state;
        case START_GAME:
            return state;
        case MOVE_DOWN:
            return Object.assign({}, helper.moveHandler(state, CHECK_NEXT));
        case MOVE_LEFT:
            return Object.assign({}, helper.moveHandler(state, CHECK_LEFT));
        case MOVE_RIGHT:
            return Object.assign({}, helper.moveHandler(state, CHECK_RIGHT));
        case MOVE_BOTTOM:
            return Object.assign({}, helper.moveHandler(state, CHECK_BOTTOM));
        case ROTATE_FIGURE:
            return Object.assign({}, helper.rotateFigure(state));
        default:
            return state;
    }
}



