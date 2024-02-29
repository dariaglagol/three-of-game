import { call, put, takeLatest } from 'redux-saga/effects'
import {getUsers} from './service'
import {setUsers} from './usersSlice'

function* fetchUsers() {
  try {
    // @ts-ignore
    const users = yield call(getUsers)
    yield put(setUsers(users))
  } catch (e) {
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

function* usersSaga() {
  yield takeLatest('USERS_FETCH_REQUESTED', fetchUsers)
}

export default usersSaga
