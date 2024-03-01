import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import roomsReducer from '../slices/roomsSlice';
import mainSaga from '../sagas/mainSaga';
import socketMiddleware from './socketsMiddleware';
import socketReducer from '../slices/SocketSlice';
import usersReducer from '../slices/usersSlice';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    socket: socketReducer,
    users: usersReducer,
  },
  middleware:
    (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware, socketMiddleware),
});

sagaMiddleware.run(mainSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
