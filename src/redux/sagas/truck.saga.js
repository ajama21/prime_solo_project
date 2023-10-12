import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* addTruck(action) {
  try {

    // passes the username and password from the payload to the server
    yield axios.post('/api/truck', action.payload);

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: 'FETCH_TRUCKS' });
  } catch (error) {
    console.log('Error with fetching trucks:', error);
  }
}

function* getAllTrucks() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/truck', config);

    yield put({ type: 'SET_TRUCKS', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* trucksaga() {
  yield takeLatest('ADD_TRUCK', addTruck);
  yield takeLatest('FETCH_TRUCKS', getAllTrucks );

}

export default trucksaga;
