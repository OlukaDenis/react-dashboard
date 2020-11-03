import appConstants from '../constants';
import initialState from '../initialState';

const {
  APP_LOADING, ALERT_ERROR, CUSTOMER_SUCCESS,
} = appConstants;

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case APP_LOADING:
      return {
        ...state,
        loading: true,
      };

    case ALERT_ERROR:
      return {
        ...state,
        error: action.message,
      };

    default:
      return state;
  }
};

export default customerReducer;
