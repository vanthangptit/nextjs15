'use client';

import React, { useContext, useEffect, useState } from 'react';
import { FormikHelpers } from 'formik/dist/types';
import FormSettings from '@/components/molecules/Form/FormSettings';
import { Formik } from 'formik';
import { ACCESS_TOKEN_NAME, APP_ROUTES, STATUS_CODE } from '@/utils/constants';
import { redirect, RedirectType, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { SignInSchema } from '@/app/api/v1/auth/sign-in/schema';
import { IFSignIn } from '@/utils/types';
import { useAuth } from '@/hooks/useAuth';
import { AuthContext } from '@/context/AuthContext';

export const FormSignIn = () => {
  const searchParams = useSearchParams();
  const { toastError } = useToast();
  const { signInApi, setAuth } = useAuth();
  const { setAuthenticated } = useContext(AuthContext);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const email: string = searchParams.get('email') ?? '';

  const handleSubmit = async (
    values: IFSignIn,
    { setSubmitting }: FormikHelpers<IFSignIn>
  ) => {
    try {
      const res = await signInApi(values);
      if (res?.status === STATUS_CODE.SUCCESS) {
        setAuth(ACCESS_TOKEN_NAME, res.data.accessToken);
        setSuccess(true);
        setAuthenticated(true);
      } else {
        toastError(res.message);
        setSuccess(false);
      }
    } catch (e: any) {
      toastError(e.message);
      setSuccess(false);
    }
    setSubmitting(false);
  };

  useEffect(() => {
    if (isSuccess) {
      redirect(APP_ROUTES.HOME, RedirectType.push);
    }
  }, [isSuccess]);

  return (
    <Formik
      initialValues={{
        email,
        password: ''
      }}
      validationSchema={SignInSchema}
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
                type: 'email',
                label: 'Email',
                name: 'email',
                value: values.email,
                errors,
                touched,
                onChange: handleChange,
                $height: 42,
                isVertical: true,
                autoFocus: !email
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
                isVertical: true,
                autoFocus: !!email
              }
            ]}
            submitButton={{
              text: 'Sign In',
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
