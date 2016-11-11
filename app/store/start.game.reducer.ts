import { ActionReducer, Action } from '@ngrx/store';
import { IS_START_GAME } from '../constants/index';

export const startGameReducer: ActionReducer<boolean> = (state: boolean = false, action: Action) => {
    switch (action.type) {
        case IS_START_GAME:
            return !state;
        default:
            return state;
    }
}