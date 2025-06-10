'use client';

import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import FormSettings from '@/components/molecules/Form/FormSettings';
import { useToast } from '@/hooks/useToast';
import { FormikHelpers } from 'formik/dist/types';
import { APP_ROUTES, STATUS_CODE } from '@/utils/constants';
import { redirect, RedirectType } from 'next/navigation';
import { IFSignUp } from '@/utils/types';
import { SignUpSchema } from '@/app/api/v1/auth/sign-up/schema';
import { useAuth } from '@/hooks/useAuth';

const initDataForm: IFSignUp = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: ''
};

const FormSignUp = () => {
  const { toastError } = useToast();
  const { signUpApi } = useAuth();
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();

  const handleSubmit = async (
    values: IFSignUp,
    { setSubmitting }: FormikHelpers<IFSignUp>
  ) => {
    try {
      const res = await signUpApi(values);
      if (res.status === STATUS_CODE.SUCCESS) {
        setSuccess(true);
        setEmail(values.email);
      } else {
        toastError(res.message);
      }
    } catch (e: any) {
      toastError(e.message);
    }
    setSubmitting(false);
  };

  useEffect(() => {
    if (isSuccess) {
      redirect(`${APP_ROUTES.SIGN_IN}?email=${email}`, RedirectType.push);
    }
  }, [isSuccess]);

  return (
    <Formik
      initialValues={initDataForm}
      validationSchema={SignUpSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        touched,
        handleChange,
        isValid,
        isSubmitting,
        dirty,
        values
      }) => {
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
