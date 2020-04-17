import { put, takeEvery, all, call } from 'redux-saga/effects';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* helloSaga() {
  console.log('Hello Sagas!')
}

// Our worker Saga: will perform the async increment task
function* incrementAsync() {
  // Use the call effect to test our code more effectively
  yield call(delay(1000))
  yield put({ type: 'INCREMENT' })
}

// Our watcher saga: spawn a new incrementASync task on each increment_async
function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

// Notice how we now only export the root saga
// single entry point to start all sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ])
}