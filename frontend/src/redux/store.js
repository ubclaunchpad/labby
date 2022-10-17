import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'
import rootReducer from './reducers'

const sagaMiddleware = createSagaMiddleware()
applyMiddleware(sagaMiddleware)

sagaMiddleware.run(rootSaga);

export const store = configureStore({
  reducer: {
    reducer: rootReducer
  },
  middleware: [sagaMiddleware],
});
