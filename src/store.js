import { createStore } from 'redux';
import * as types from './constants/actionTypes';

const initialState = {
    color: '#000000',
    colorName: 'Black'
};

function setColor(state = initialState, action) {
    switch (action.type) {
        case types.CHANGE_COLOR:
            return {...state, color: action.color, colorName: action.colorName};
        default:
            return state;
    }
}

const store = createStore(setColor);
export default store;