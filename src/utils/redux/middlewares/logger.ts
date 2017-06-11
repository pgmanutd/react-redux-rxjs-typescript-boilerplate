import * as clogy from 'clogy';
import {
  Action,
  Dispatch,
  Store,
} from 'redux';

/**
 * Logs all actions and states after they are dispatched.
 */
const logger = <S>(store: Store<S>) => (next: Dispatch<S>) => (action: Action) => {
  clogy.info(`\n***************** ${action.type} *****************\n`);

  clogy.log('dispatching', action);

  const result = next(action);
  clogy.log('next state', store.getState());

  clogy.info(`\n***************** ${action.type} *****************\n`);

  return result;
};

export default logger;
