import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducer';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import mySaga from './saga'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose
const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancer(applyMiddleware(sagaMiddleware));
// const enhancer = composeEnhancer(applyMiddleware(thunk)); Middleware by using thunk
const store = createStore(reducer, enhancer);
sagaMiddleware.run(mySaga);
export default store;