import { actionTypes } from '../types';

export const updateFilter = (filter: string) => ({
    type: actionTypes.UPDATE_FILTER,
    payload: {
        filter,
    },
});