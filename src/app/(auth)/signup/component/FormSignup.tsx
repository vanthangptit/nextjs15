'use client';

import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import FormSettings from '@/components/molecules/Form/FormSettings';
import requester from '@/api-client/requester';
import { API_URLs, STATUS_CODE } from '@/utils/constants';
import { useToast } from '@/hooks/useToast';
import { FormikHelpers } from 'formik/dist/types';

export interface IFormFieldSignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const FormSignUpSchema = Yup.object().shape({
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

const initDataForm: IFormFieldSignUp = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: ''
};

const FormSignUp = () => {
  const { toastSuccess, toastError } = useToast();

  const handleSubmit = async (values: IFormFieldSignUp, { setSubmitting, resetForm }: FormikHelpers<IFormFieldSignUp>) => {
    const res = await requester.post(API_URLs.AUTH.SIGN_UP_URL, values);
    if (res.status === STATUS_CODE.SUCCESS) {
      resetForm({ values: initDataForm });
      toastSuccess(res.message);
    } else {
      toastError(res.message);
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initDataForm}
      validationSchema={FormSignUpSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleChange, isValid, isSubmitting, dirty, values }) => {
        return (
          <FormSettings
            formSettings={[
              {
                type: 'text',
                label: 'First Name',
                name: 'firstName',
                value: values.firstName,
                errors,
                touched,
                onChange: handleChange,
                $height: 42,
                autoFocus: true,
                isVertical: true,
                required: true,
                viewOrder: 1,
                viewRow: 1
              },
              {
                type: 'text',
                label: 'Last Name',
                name: 'lastName',
                value: values.lastName,
                errors,
                touched,
                onChange: handleChange,
                $height: 42,
                isVertical: true,
                required: true,
                viewOrder: 2,
                viewRow: 1
              },
              {
                type: 'email',
                label: 'Email',
                name: 'email',
                value: values.email,
                errors,
                touched,
                onChange: handleChange,
                $height: 42,
                required: true,
                isVertical: true,
                viewRow: 2
              },
              {
                type: 'password',
                label: 'Password',
                name: 'password',
                value: values.password,
                errors,
                touched,
                onChange: handleChange,
                $height: 42,
                required: true,
                isVertical: true,
                viewRow: 3
              },
              {
                type: 'password',
                label: 'Password Confirm',
                name: 'passwordConfirm',
                value: values.passwordConfirm,
                errors,
                touched,
                onChange: handleChange,
                $height: 42,
                required: true,
                isVertical: true,
                viewRow: 4
              }
            ]}
            submitButton={{
              text: 'Submit',
              typeHTML: 'submit',
              type: 'contained',
              size: 'md',
              disabled: !isValid || isSubmitting || !dirty
            }}
          />
        );
      }}
    </Formik>
  );
};

export default FormSignUp;
