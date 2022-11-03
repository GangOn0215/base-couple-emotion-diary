const initialState = {
  axiosUrl:
    process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : window.location.origin,
};

const commonReducer = (currentState = initialState, action) => {
  let newState = {};

  switch (action.type) {
    default:
      newState = currentState;
      break;
  }

  return newState;
};

export default commonReducer;
