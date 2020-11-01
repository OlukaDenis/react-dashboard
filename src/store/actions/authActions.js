import appConstants from '../constants';

const {
  LOGGED_USER, SET_LOG_IN, SET_LOG_OUT, APP_LOADING, SIGN_UP_USER, AUTH_ERROR,
} = appConstants;

const setLogIn = () => ({ type: SET_LOG_IN });

const setLogOut = () => ({ type: SET_LOG_OUT });

const loggedInUser = (user) => ({ type: LOGGED_USER, user });

const createUser = (user) => ({ type: SIGN_UP_USER, user });

const authLoading = () => ({ type: APP_LOADING });

const authError = (message) => ({ type: AUTH_ERROR, message });

export {
  setLogIn,
  setLogOut,
  loggedInUser,
  authLoading,
  createUser,
  authError,
};
