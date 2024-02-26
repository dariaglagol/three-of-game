import { call, put, takeLatest } from 'redux-saga/effects'
import {getRooms} from './service'
import {incrementByAmount} from './roomsSlice'

function* fetchRooms() {
  try {
    // @ts-ignore
    const rooms = yield call(getRooms)
    yield put(incrementByAmount(rooms))
  } catch (e) {
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

function* mySaga() {
  yield takeLatest('USER_FETCH_REQUESTED', fetchRooms)
}

export default mySaga
