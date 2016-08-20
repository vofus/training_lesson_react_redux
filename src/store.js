import { applyMiddleware, createStore } from 'redux';
import * as types from './constants/actionTypes';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const initialState = {
    color: '#000000',
    colorName: 'Black',
    fetching: false,
    fetched: false,
    photos: [],
    error: null,
    imgId: 0
};

const middleware = applyMiddleware(thunk, logger());
const store = createStore(reducer, middleware);

function reducer(state = initialState, action) {
    switch (action.type) {
        case types.CHANGE_COLOR:
            return {...state, color: action.color, colorName: action.colorName};
            break;
        case types.FETCH_PHOTOS_START:
            return {...state, fetching: true};
            break;
        case types.RECEIVE_PHOTOS:
            return {...state, fetching: false, fetched: true, photos: action.payload};
            break;
        case types.FETCH_PHOTOS_ERROR:
            return {...state, fetching: false, error: action.payload};
            break;
        case types.SELECT_IMG:
            return {...state, imgId: action.payload};
            break;
        default:
            return state;
    }
}

export default store;