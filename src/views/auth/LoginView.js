import React, { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';
import AppAlerts from '../../components/AppAlerts';
import { firebaseApp } from '../../firebase';
import { LoginSchema } from '../../utils';
import { showAlert } from '../../store/actions/alertActions';
import {
  setLogIn, loggedInUser, authLoading, authError
} from '../../store/actions/authActions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const authReducer = useSelector((state) => state.authReducer);
  const { error, loading, isLoggedIn } = authReducer;
  const dispatch = useDispatch();

  const navigateToDashboard = () => {
    navigate('/shuppa/dashboard', { replace: true });
  };

  const initialValues = { email: '', password: '' };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!regex.test(values.email)) {
      errors.email = 'Invalid Email';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 4) {
      errors.password = 'Password too short';
    }
    return errors;
  };


  const submitForm = (values) => {
    dispatch(authLoading());
    const { email, password } = values;
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
        dispatch(dispatch(setLogIn()));
        console.log(result);
        dispatch(loggedInUser(result.user));
        navigateToDashboard();
      })
      .catch((err) => {
        dispatch(authError(err.message));
        dispatch(showAlert());
        console.log(err);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigateToDashboard();
    }
  }, []);

  return (
    <div>
      { loading && <LinearProgress color="secondary" /> }
      {(
        <Page
          className={classes.root}
          title="Login"
        >
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
          >
            <Container maxWidth="sm">
              <Formik
                initialValues={initialValues}
                validationSchema={LoginSchema}
                validate={validate}
                onSubmit={submitForm}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  touched,
                  values,
                  handleSubmit
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box mb={3}>
                      <Typography
                        color="textPrimary"
                        variant="h2"
                      >
                        Sign in
                      </Typography>
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="body2"
                      >
                        Welcome back to Shuppa dashboard
                      </Typography>
                    </Box>
                    <Grid
                      container
                      spacing={3}
                    >
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <Button
                          color="primary"
                          fullWidth
                          startIcon={<FacebookIcon />}
                          onClick={handleSubmit}
                          size="large"
                          variant="contained"
                        >
                          Login with Facebook
                        </Button>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <Button
                          fullWidth
                          startIcon={<GoogleIcon />}
                          onClick={handleSubmit}
                          size="large"
                          variant="contained"
                        >
                          Login with Google
                        </Button>
                      </Grid>
                    </Grid>
                    <Box
                      mt={3}
                      mb={1}
                    >
                      <Typography
                        align="center"
                        color="textSecondary"
                        variant="body1"
                      >
                        or login with email address
                      </Typography>
                    </Box>
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      label="Email Address"
                      margin="normal"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      value={values.email}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.password && errors.password)}
                      fullWidth
                      helperText={touched.password && errors.password}
                      label="Password"
                      margin="normal"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                    <Box my={2}>
                      <Button
                        color="primary"
                        disabled={loading}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Sign in now
                      </Button>
                    </Box>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                    >
                      Don&apos;t have an account?
                      {' '}
                      <Link
                        component={RouterLink}
                        to="/register"
                        variant="h6"
                      >
                        Sign up
                      </Link>
                    </Typography>
                  </form>
                )}
              </Formik>
            </Container>
          </Box>
        </Page>
          )}
      { error && <AppAlerts message="error" error={error} />}
    </div>
  );
};

export default LoginView;
