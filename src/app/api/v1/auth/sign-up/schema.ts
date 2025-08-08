import * as Yup from 'yup';

export const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(3, 'First name must between 3 - 25 characters')
    .max(25, 'First name must between 3 - 25 characters')
    .matches(
      /^[a-zA-Z\-\s]+$/,
      'Please enter only letter characters by alphabetical'
    ),
  lastName: Yup.string()
    .required('Last name is required')
    .min(3, 'Last name must between 3 - 25 characters')
    .max(25, 'Last name must between 3 - 25 characters')
    .matches(
      /^[a-zA-Z\-\s]+$/,
      'Please enter only letter characters by alphabetical'
    ),
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
      'Password must contain at least one number, lower case, upper case and enter 8 or more characters'
    ),
  passwordConfirm: Yup.string().required('Confirm Password is required')
});
