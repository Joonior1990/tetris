const FIGURE_TYPE_I = {
    views: {
        STATE_0: [
            {x:-2, y: 0},
            {x:-1, y: 0},
            {x: 0, y: 0},
            {x: 1, y: 0}
        ],
        STATE_1: [
            {x: 0, y: -3},
            {x: 0, y: -2},
            {x: 0, y: -1},
            {x: 0, y: 0}
        ],
        STATE_2: [
            {x:-2, y: 0},
            {x:-1, y: 0},
            {x: 0, y: 0},
            {x: 1, y: 0}
        ],
        STATE_3: [
            {x: 0, y: -3},
            {x: 0, y: -2},
            {x: 0, y: -1},
            {x: 0, y: 0}
        ]
    },
    cordsToCheck: {
        STATE_0: {
            nextStep: [0, 1, 2, 3],
            moveRight: [3],
            moveLeft: [0]
        },
        STATE_1: {
            nextStep: [3],
            moveRight: [0, 1, 2, 3],
            moveLeft: [0, 1, 2, 3]
        },
        STATE_2: {
            nextStep: [0, 1, 2, 3],
            moveRight: [3],
            moveLeft: [0]
        },
        STATE_3: {
            nextStep: [3],
            moveRight: [0, 1, 2, 3],
            moveLeft: [0, 1, 2, 3]

        }
    }
};

export const CHECK_NEXT = `nextStep`;
export const CHECK_LEFT = `moveLeft`;
export const CHECK_RIGHT = `moveRight`;
export const LIST_OF_FIGURES = [FIGURE_TYPE_I];
export const LIST_VIEWS = [`STATE_0`, `STATE_1`, `STATE_2`, `STATE_3`];