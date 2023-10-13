import { combineReducers } from 'redux';


const truckreducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TRUCKS':
      return action.payload;
    case 'UNSET_USER':
      return [];
    default:
      return state;
  }
};

const truckdetailreducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TRUCK_DETAILS':
      return action.payload;
    case 'UNSET_USER':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default combineReducers({
  truckreducer,
  truckdetailreducer,
});
