import * as Yup from 'yup';
import getInitials from './getInitials';

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Firstname is required'),

  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Lastname is required'),

  // phoneNumber: Yup.string()
  //   .required('Phone number is required')
  //   .matches(
  //     /^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g,
  //     'Invalid phone number'
  //   ),

  email: Yup.string().email().required('Email is required'),

  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password is too short - should be 6 chars minimum'),
});

const LoginSchema = Yup.object().shape({

  email: Yup.string().email().required('Email is required'),

  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password is too short - should be 6 chars minimum'),
});

export {
  SignUpSchema,
  LoginSchema,
  getInitials,
};
