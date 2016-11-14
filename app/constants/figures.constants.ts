const STATE_0 = `STATE_0`;
const STATE_1 = `STATE_1`;
const STATE_2 = `STATE_2`;
const STATE_3 = `STATE_3`;

export const BASE_FIGURE_PROPERTY = {
    coords: {},
    middlePoint: {
        x: 5,
        y: 0,
    },
    states: [STATE_0, STATE_1, STATE_2, STATE_3],
    currentState: STATE_0
};

export const FIGURE_TYPE_I = {
    STATE_0: [
        {x: -2, y: 0},
        {x: -1, y: 0},
        {x: 0,  y: 0},
        {x: 1,  y: 0}
    ],
    STATE_1: [
        {x: 0,  y: -3},
        {x: 0,  y: -2},
        {x: 0,  y: -1},
        {x: 0,  y: 0}
    ],
    STATE_2: [
        {x: -2, y: 0},
        {x: -1, y: 0},
        {x: 0,  y: 0},
        {x: 1,  y: 0}
    ],
    STATE_3:  [
        {x: 0,  y: -3},
        {x: 0,  y: -2},
        {x: 0,  y: -1},
        {x: 0,  y: 0}
    ]
};
export const FIGURE_TYPE_J = {
    STATE_0: {},
    STATE_1: {},
    STATE_2: {},
    STATE_3: {}
};
export const FIGURE_TYPE_L = {
    STATE_0: {},
    STATE_1: {},
    STATE_2: {},
    STATE_3: {}
};
export const FIGURE_TYPE_O = {
    STATE_0: {},
    STATE_1: {},
    STATE_2: {},
    STATE_3: {}
};
export const FIGURE_TYPE_S = {
    STATE_0: {},
    STATE_1: {},
    STATE_2: {},
    STATE_3: {}
};
export const FIGURE_TYPE_T = {
    STATE_0: {},
    STATE_1: {},
    STATE_2: {},
    STATE_3: {}
};
export const FIGURE_TYPE_Z = {
    STATE_0: {},
    STATE_1: {},
    STATE_2: {},
    STATE_3: {}
};

export const LIST_OF_FIGURES = [FIGURE_TYPE_I, FIGURE_TYPE_J, FIGURE_TYPE_L, FIGURE_TYPE_O, FIGURE_TYPE_S, FIGURE_TYPE_T, FIGURE_TYPE_Z];
