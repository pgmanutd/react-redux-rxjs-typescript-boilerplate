import { combineReducers } from 'redux';

import {
  counterInitialState,
  counterReducer,
} from '@webui/components/Counter';

export const initialState = {
  counter: counterInitialState,
};

export default combineReducers({
  counter: counterReducer,
});
