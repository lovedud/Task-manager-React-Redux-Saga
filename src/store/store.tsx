import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'
import reducers from '../reducers/rootReducer';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(logger, sagaMiddleware),
);

const store = createStore(reducers, enhancer);
console.log(store.getState());

sagaMiddleware.run(rootSaga);

export default store;