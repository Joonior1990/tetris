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

const FIGURE_TYPE_T = {
    views: {
        STATE_0: [
            {x: -1, y: -1},
            {x:  0, y: -1},
            {x:  0, y:  0},
            {x:  1, y: -1}
        ],
        STATE_1: [
            {x:  0, y: -2},
            {x:  0, y: -1},
            {x:  0, y:  0},
            {x:  1, y: -1}
        ],
        STATE_2: [
            {x: -1, y:  0},
            {x:  0, y:  0},
            {x:  1, y:  0},
            {x:  0, y: -1}
        ],
        STATE_3: [
            {x: -1, y: -1},
            {x:  0, y: -2},
            {x:  0, y: -1},
            {x:  0, y:  0}
        ]
    },
    cordsToCheck: {
        STATE_0: {
            nextStep: [0, 2, 3],
            moveRight: [2, 3],
            moveLeft: [0, 2]
        },
        STATE_1: {
            nextStep: [2, 3],
            moveRight: [0, 2, 3],
            moveLeft: [0, 1, 2]
        },
        STATE_2: {
            nextStep: [0, 1, 2],
            moveRight: [2, 3],
            moveLeft: [0, 3]
        },
        STATE_3: {
            nextStep: [0, 3],
            moveRight: [1, 2, 3],
            moveLeft: [0, 1, 3]

        }
    }
};

const FIGURE_TYPE_O = {
    views: {
        STATE_0: [
            {x: -1, y: -1},
            {x:  0, y: -1},
            {x: -1, y:  0},
            {x:  0, y:  0}
        ],
        STATE_1: [
            {x: -1, y: -1},
            {x:  0, y: -1},
            {x: -1, y:  0},
            {x:  0, y:  0}
        ],
        STATE_2: [
            {x: -1, y: -1},
            {x:  0, y: -1},
            {x: -1, y:  0},
            {x:  0, y:  0}
        ],
        STATE_3: [
            {x: -1, y: -1},
            {x:  0, y: -1},
            {x: -1, y:  0},
            {x:  0, y:  0}
        ]
    },
    cordsToCheck: {
        STATE_0: {
            nextStep: [2, 3],
            moveRight: [1, 3],
            moveLeft: [0, 2]
        },
        STATE_1: {
            nextStep: [2, 3],
            moveRight: [1, 3],
            moveLeft: [0, 2]
        },
        STATE_2: {
            nextStep: [2, 3],
            moveRight: [1, 3],
            moveLeft: [0, 2]
        },
        STATE_3: {
            nextStep: [2, 3],
            moveRight: [1, 3],
            moveLeft: [0, 2]
        }
    }
};

const FIGURE_TYPE_J = {
    views: {
        STATE_0: [
            {x: -1, y:  0},
            {x:  0, y: -2},
            {x:  0, y: -1},
            {x:  0, y:  0}
        ],
        STATE_1: [
            {x: -1, y: -1},
            {x:  0, y: -1},
            {x:  1, y: -1},
            {x:  1, y:  0}
        ],
        STATE_2: [
            {x: -1, y: -2},
            {x: -1, y: -1},
            {x: -1, y:  0},
            {x:  0, y: -2}
        ],
        STATE_3: [
            {x: -1, y: -1},
            {x: -1, y:  0},
            {x:  0, y:  0},
            {x:  1, y:  0}
        ]
    },
    cordsToCheck: {
        STATE_0: {
            nextStep: [0, 3],
            moveRight: [1, 2, 3],
            moveLeft: [0, 1, 2]
        },
        STATE_1: {
            nextStep: [0, 1, 3],
            moveRight: [2, 3],
            moveLeft: [0, 3]
        },
        STATE_2: {
            nextStep: [2, 3],
            moveRight: [1, 2, 3],
            moveLeft: [0, 1, 2]
        },
        STATE_3: {
            nextStep: [1, 2, 3],
            moveRight: [0, 3],
            moveLeft: [0, 1]
        }
    }
};

export const CHECK_NEXT = `nextStep`;
export const CHECK_LEFT = `moveLeft`;
export const CHECK_RIGHT = `moveRight`;
export const CHECK_BOTTOM = `CHECK_BOTTOM`;
export const LIST_OF_FIGURES = [FIGURE_TYPE_I, FIGURE_TYPE_T, FIGURE_TYPE_O, FIGURE_TYPE_J];
// export const LIST_OF_FIGURES = [FIGURE_TYPE_J];
export const LIST_VIEWS = [`STATE_0`, `STATE_1`, `STATE_2`, `STATE_3`];