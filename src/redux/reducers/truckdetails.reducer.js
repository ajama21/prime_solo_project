const truckdetailsreducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_CURRENT_TRUCK':
      return action.payload;
    default:
      return state;
  }
};


// user will be on the redux state at:
// state.user
export default truckdetailsreducer;
