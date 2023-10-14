import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* addDriver(action) {
  try {

    // passes the username and password from the payload to the server
    yield axios.post('/api/driver/onboard', action.payload);

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: 'FETCH_DRIVERS' });
  } catch (error) {
    console.log('Error with fetching trucks:', error);
  }
}

function* fetchAllDrivers() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/driver', config);

    yield put({ type: 'SET_DRIVERS', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* fetchDriverDetails(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json'},
      withCredentials: true,
    };
    const response = yield axios.get('/api/driver/details/' + action.payload , config);

    yield put({ type: 'SET_CURRENT_DRIVER', payload: response.data[0] });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* driversaga() {
  yield takeLatest('ADD_DRIVER', addDriver);
  yield takeLatest('FETCH_DRIVERS', fetchAllDrivers );
  yield takeLatest('FETCH_DRIVER_DETAILS', fetchDriverDetails );


}

export default driversaga;
