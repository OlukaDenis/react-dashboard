import appConstants from '../constants';

const {
  APP_LOADING, ALERT_ERROR, CUSTOMER_SUCCESS,
} = appConstants;

const customerError = (message) => ({ type: ALERT_ERROR, message });

const customerLoading = () => ({ type: APP_LOADING });

const customerSuccess = () => ({ type: CUSTOMER_SUCCESS });

export {
  customerError,
  customerLoading,
  customerSuccess,
};
