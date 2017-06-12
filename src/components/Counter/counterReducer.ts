import {
  Action,
  Reducer,
} from '@webui/utils/redux';

export const counterInitialState = 0;

const counterReducer: Reducer<number> = (state = counterInitialState, action: Action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

export default counterReducer;
