import { createStore } from 'redux';
import { reducer, initialState } from './reducers';

export const store = createStore(reducer, initialState);







