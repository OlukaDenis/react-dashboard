import appConstants from '../constants';
import initialState from '../initialState';

const {
  CLOSE_ALERT, SHOW_ALERT,
} = appConstants;

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_ALERT:
      return {
        ...state,
        open: false,
      };

    case SHOW_ALERT:
      return {
        ...state,
        open: true,
      };

    default:
      return state;
  }
};

export default alertReducer;
