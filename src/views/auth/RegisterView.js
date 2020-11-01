import React, { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Page from 'src/components/Page';
import { firebaseApp, db } from '../../firebase';
import { SignUpSchema } from '../../utils';
import AppAlerts from '../../components/AppAlerts';
import { showAlert } from '../../store/actions/alertActions';
import {
  setLogIn, loggedInUser, authLoading, authError
} from '../../store/actions/authActions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const authReducer = useSelector((state) => state.authReducer);
  const { error, loading, isLoggedIn } = authReducer;
  const dispatch = useDispatch();

  const navigateToDashboard = () => {
    navigate('/shuppa/dashboard', { replace: true });
  };

  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    policy: false
  };

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
    const {
      email, password, firstName, lastName
    } = values;
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const displayName = `${firstName} ${lastName}`;
        const { currentUser } = firebaseApp.auth();
        currentUser.updateProfile({ displayName });

        db.doc(`/users/${currentUser.uid}`)
          .set({
            phone: currentUser.phoneNumber || '',
            email: currentUser.email || '',
            name: displayName || '',
            uid: currentUser.uid || '',
            emailVerified: currentUser.emailVerified || false,
            image: currentUser.photoURL || '',
            admin: true,
            createdAt: Date.now(),
          }).then((res) => {
            console.log(res);
            dispatch(dispatch(setLogIn()));
            dispatch(loggedInUser(result.user));
            navigateToDashboard();
          }).catch((err) => {
            dispatch(authError(err.message));
            dispatch(showAlert());
          });
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
          title="Register"
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
                validationSchema={SignUpSchema}
                validate={validate}
                onSubmit={submitForm}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  touched,
                  values
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box mb={3}>
                      <Typography
                        color="textPrimary"
                        variant="h2"
                      >
                        Create new account
                      </Typography>
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="body2"
                      >
                        Use your email to create new Shuppa account
                      </Typography>
                    </Box>
                    <TextField
                      error={Boolean(touched.firstName && errors.firstName)}
                      fullWidth
                      helperText={touched.firstName && errors.firstName}
                      label="First name"
                      margin="normal"
                      name="firstName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      label="Last name"
                      margin="normal"
                      name="lastName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      variant="outlined"
                    />
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
                    <Box
                      alignItems="center"
                      display="flex"
                      ml={-1}
                    >
                      <Checkbox
                        checked={values.policy}
                        name="policy"
                        onChange={handleChange}
                      />
                      <Typography
                        color="textSecondary"
                        variant="body1"
                      >
                        I have read the
                        {' '}
                        <Link
                          color="primary"
                          component={RouterLink}
                          to="#"
                          underline="always"
                          variant="h6"
                        >
                          Terms and Conditions
                        </Link>
                      </Typography>
                    </Box>
                    {Boolean(touched.policy && errors.policy) && (
                      <FormHelperText error>
                        {errors.policy}
                      </FormHelperText>
                    )}
                    <Box my={2}>
                      <Button
                        color="primary"
                        disabled={loading}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Sign up now
                      </Button>
                    </Box>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                    >
                      Have an account?
                      {' '}
                      <Link
                        component={RouterLink}
                        to="/login"
                        variant="h6"
                      >
                        Sign in
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

export default RegisterView;
