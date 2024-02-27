import {all} from 'redux-saga/effects'
import roomsSaga from './roomsSaga'

function* rootSaga() {
  yield all([
    roomsSaga()
  ])
}

export default rootSaga