import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import roomsReducer from './roomsSlice'
import movesReducer from './gameMoveSlice'
import userDataReducer from './userDataSlice'
import mainSaga from './mainSaga'

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    moves: movesReducer,
    userData: userDataReducer
    // users: usersReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(mainSaga)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
