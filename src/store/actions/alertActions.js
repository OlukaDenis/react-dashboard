import appConstants from '../constants';

const {
  CLOSE_ALERT, SHOW_ALERT,
} = appConstants;

const closeAlert = () => ({ type: CLOSE_ALERT });

const showAlert = () => ({ type: SHOW_ALERT });

export {
  closeAlert,
  showAlert,
};
