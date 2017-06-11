// import {
//   Action,
//   applyMiddleware,
//   compose,
//   createStore
// } from 'redux';

// import {
//   logger
// } from './middlewares';
// import reducer, { initialState } from './reducer';

// import { Observable } from '@webui/utils/rxjs';

// const resetAction = {
//   type: 'reset'
// };

// const getStore = () => {
//   const composeEnhancers =
//   (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
//   || compose;

//   const store = createStore(
//     reducer,
//     initialState,
//     composeEnhancers(
//       applyMiddleware(logger)
//     )
//   );

//   return store;
// };

// const store = getStore();
// const rxStore = Observable.from(store);

// export type dispatchT = (action: Action) => Action;
// const dispatch: dispatchT = (action) => store.dispatch(action);

// const getState = () => store.getState();

// export default store;
// export {
//   initialState,
//   resetAction,
//   getStore,
//   store,
//   rxStore,
//   dispatch,
//   getState
// };
