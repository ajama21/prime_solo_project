import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import trucks from './truck.reducer';
import drivers from './driver.reducer';
import truckdetails from './truckdetails.reducer';
import driverdetails from './driverdetails.router';
import unassignedtrucks from './unassignedtrucks.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user,
  trucks,
  drivers,
  truckdetails,
  driverdetails,
  unassignedtrucks
});

export default rootReducer;
