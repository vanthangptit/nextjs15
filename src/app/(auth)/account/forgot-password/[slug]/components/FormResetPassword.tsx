'use client';

import React, { useEffect, useState } from 'react';
import FormSettings from '@/components/molecules/Form/FormSettings';
import MessageError from '@/components/atoms/MessageError';
import { Formik } from 'formik';
import { IFResetPassword } from '@/utils/types';
import { redirect, RedirectType, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { APP_ROUTES, STATUS_CODE } from '@/utils/constants';
import { FormikHelpers } from 'formik/dist/types';
import Button from '@/components/atoms/Button';
import { ResetPasswordSchema } from '@/app/api/v1/auth/reset-password/schema';

const initDataForm: IFResetPassword = {
  email: '',
  password: '',
  passwordConfirm: ''
};

const FormResetPassword = ({ slug }: { slug: string }) => {
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [disabledEmail, setDisabledEmail] = useState<boolean>(true);
  const [messageError, setMessageError] = useState<string>();
  const [emailChanged, setEmailChanged] = useState<string>();
  const searchParams = useSearchParams();
  const { resetPasswordApi } = useAuth();

  const email: string | null = searchParams.get('email');

  const handleSubmit = async (
    values: IFResetPassword,
    { setSubmitting }: FormikHelpers<IFResetPassword>
  ) => {
    if (values.password !== values.passwordConfirm) {
      setMessageError('The passwords do not match. Please try again.');
      return;
    }

    const res = await resetPasswordApi({
      ...values,
      token: slug
    });
    if (res.status === STATUS_CODE.SUCCESS) {
      setSuccess(true);
      if (values.email === email) {
        setEmailChanged(values.email);
      }
    } else {
      setSuccess(false);
    }
    setSubmitting(false);
  };

  useEffect(() => {
    setDisabledEmail(!!email);
  }, [email]);

  return !isSuccess ? (
    <Formik
      initialValues={{
        ...initDataForm,
        email: email || ''
      }}
      validationSchema={ ResetPasswordSchema }
      onSubmit={handleSubmit}
    >
      {({
        errors,
        touched,
        handleChange,
        values,
        isValid,
        isSubmitting,
        dirty
      }) => {
        return (
          <>
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
                  viewRow: 1,
                  disabled: disabledEmail
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
                  viewRow: 2
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
                  isVertical: true,
                  viewRow: 3
                }
              ]}
              submitButton={ {
                text: 'Save Password',
                typeHTML: 'submit',
                type: 'contained',
                size: 'md',
                disabled: !isValid || isSubmitting || !dirty
              } }
            />
            {messageError && (
              <MessageError
                message={messageError}
                $align={'center'}
              />
            )}
          </>
        );
      }}
    </Formik>
  ) : (
    <div>
      <h3>Password Changed</h3>
      <p>Your password has been changed successfully.</p>
      <Button
        text={'Sign In'}
        typeHTML={'button'}
        type={'contained'}
        onClick={() => {
          redirect(
            `${APP_ROUTES.SIGN_IN}?email=${emailChanged || email}`,
            RedirectType.push
          );
        }}
      />
    </div>
  );
};

export default FormResetPassword;
