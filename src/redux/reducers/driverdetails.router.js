const driverdetailReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_CURRENT_DRIVER':
      return action.payload;
    case 'UNSET_CURRENT_DRIVER':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default driverdetailReducer;
