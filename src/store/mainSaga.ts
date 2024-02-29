import {all, fork} from 'redux-saga/effects'
import roomsSaga from './roomsSaga'
// import {watchSocketChannel} from './usersSaga'

function* rootSaga() {
  yield all([
    roomsSaga(),
    // fork(watchSocketChannel)
  ])
}

export default rootSaga