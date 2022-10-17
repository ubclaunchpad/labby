import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'
import rootReducer from './reducers'

const sagaMiddleware = createSagaMiddleware()
applyMiddleware(sagaMiddleware)

const Store = configureStore({
  reducer: {
    reducer: rootReducer
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default Store;