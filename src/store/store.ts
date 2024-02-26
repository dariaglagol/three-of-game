import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import roomsReducer from './roomsSlice'
import movesReducer from './gameMoveSlice'
import mySaga from './roomsSaga'
import userDataReducer from './userDataSlice'

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

sagaMiddleware.run(mySaga)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
