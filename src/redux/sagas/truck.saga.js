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

function* fetchAllTrucks() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/truck', config);

    yield put({ type: 'SET_TRUCKS', payload: response.data });
  } catch (error) {
    console.log('GET truck request failed', error);
  }
}

function* fetchUnassginedTrucks() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/truck/unassigned', config);

    yield put({ type: 'SET_UNASSIGNED_TRUCKS', payload: response.data });
  } catch (error) {
    console.log('GET truck request failed', error);
  }
}

// create genereator for get truck details it should take truck id in the payload
function* fetchTruckDetails(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/truck/details/' + action.payload , config);

    yield put({ type: 'SET_CURRENT_TRUCK', payload: response.data[0] });
  } catch (error) {
    console.log('GET truck details request failed', error);
  }
}

function* updateTruckDetails(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json'},
      withCredentials: true,
    };
    const response = yield axios.put('/api/truck' + action.payload.id, action.payload, config);

    yield put({ type: 'FETCH_TRUCK_DETAILS', payload: action.payload.id });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* deleteTruck(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json'},
      withCredentials: true,
    };
    const response = yield axios.delete('/api/truck/' + action.payload, config);

    yield put({ type: 'FETCH_TRUCKS'});
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* trucksaga() {
  yield takeLatest('ADD_TRUCK', addTruck);
  yield takeLatest('FETCH_TRUCKS', fetchAllTrucks );
  yield takeLatest('FETCH_TRUCK_DETAILS', fetchTruckDetails);
  yield takeLatest('FETCH_UNASSIGNED_TRUCKS', fetchUnassginedTrucks);
  yield takeLatest('UPDATE_TRUCK_DETAILS', updateTruckDetails);
  yield takeLatest('DELETE_TRUCK', deleteTruck);
}

export default trucksaga;
