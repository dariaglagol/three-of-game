import {all} from 'redux-saga/effects'
import roomsSaga from './roomsSaga'
import usersSaga from './usersSaga'

function* rootSaga() {
  yield all([
    roomsSaga(),
    usersSaga()
  ])
}

export default rootSaga