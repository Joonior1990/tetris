import { ActionReducer, Action } from '@ngrx/store';

export const IS_START_GAME = "IS_START_GAME";

export const startGameReducer: ActionReducer<boolean> = (state: boolean = false, action: Action) => {
    switch (action.type) {
        case IS_START_GAME:
            return !state;
        default:
            return state;
    }
}