import { call, put, takeLatest } from 'redux-saga/effects';
import { getRooms } from '../services/service';
import { incrementByAmount } from '../slices/roomsSlice';

function* fetchRooms() {
  try {
    // @ts-ignore
    const rooms = yield call(getRooms);
    yield put(incrementByAmount(rooms));
  } catch (e) {
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

function* roomsSaga() {
  yield takeLatest('ROOMS_FETCH_REQUESTED', fetchRooms);
}

export default roomsSaga;
