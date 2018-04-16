export const WORK_ALL = 'WORK_ALL';
export const WORK_ADD = 'WORK_ADD';
export const WORK_CLEAR = 'WORK_CLEAR';

export function datamd(state, {type, payload}) {
    switch (type) {
        case WORK_CLEAR:
            return [];
        case WORK_ADD:
            return[...state, payload];
        case WORK_ALL:
            return payload;

        default:
            return state;
    }
};

