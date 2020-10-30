import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { closeAlert } from '../store/actions/alertActions';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const AppAlerts = ({ message, error }) => {
  const alertReducer = useSelector((state) => state.alertReducer);
  const { open } = alertReducer;
  const dispatch = useDispatch();

  const getMessage = () => {
    switch (message) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return '';
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeAlert());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Alert onClose={handleClose} severity={getMessage()}>
        { error }
      </Alert>
    </Snackbar>
  );
};

AppAlerts.propTypes = {
  message: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
};

export default AppAlerts;
