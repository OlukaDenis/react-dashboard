import appConstants from '../constants';
import initialState from '../initialState';

const {
  APP_LOADING, SET_LOG_IN, SET_LOG_OUT, LOGGED_USER,
} = appConstants;

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
      };

    case SET_LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
      };

    case LOGGED_USER:
      return {
        ...state,
        user: action.user,
        loading: false,
      };

    case APP_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default authReducer;
