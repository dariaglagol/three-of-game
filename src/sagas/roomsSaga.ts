import { call, put, takeLatest } from 'redux-saga/effects';
import { getRooms } from '../services/service';
import { RoomInterface, updateRooms } from '../slices/roomsSlice';

function* fetchRooms() {
  try {
    const rooms: RoomInterface[] = yield call(getRooms);
    yield put(updateRooms(rooms));
  } catch (e) {
    console.log('fetchRooms error', e);
  }
}

function* roomsSaga() {
  yield takeLatest('ROOMS_FETCH_REQUESTED', fetchRooms);
}

export default roomsSaga;
