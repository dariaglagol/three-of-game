import { call, put, takeLatest } from 'redux-saga/effects';
import { getUsers } from '../services/service';
import { setUsers, UserInterface } from '../slices/usersSlice';

function* fetchUsers() {
  try {
    const users: UserInterface[] = yield call(getUsers);
    yield put(setUsers(users));
  } catch (e) {
    console.log('fetchUsers error', e);
  }
}

function* usersSaga() {
  yield takeLatest('USERS_FETCH_REQUESTED', fetchUsers);
}

export default usersSaga;
