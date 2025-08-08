'use client';

import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import FormSettings from '@/components/molecules/Form/FormSettings';
import { Formik } from 'formik';
import { IFResetPassword } from '@/utils/types';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { APP_ROUTES, STATUS_CODE } from '@/utils/constants';
import { FormikHelpers } from 'formik/dist/types';
import Button from '@/components/atoms/Button';
import { ResetPasswordSchema } from '@/app/api/v1/auth/reset-password/schema';
import { useToast } from '@/hooks/useToast';
import CountdownTimer from '@/components/molecules/CountdownTimer';

const initDataForm: IFResetPassword = {
  email: '',
  password: '',
  passwordConfirm: ''
};

const TOKEN_EXPIRED_TIME = 5 * 60;

const FormResetPassword = ({ slug }: { slug: string }) => {
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [disabledEmail, setDisabledEmail] = useState<boolean>(true);
  const [emailChanged, setEmailChanged] = useState<string>();
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const { resetPasswordApi } = useAuth();
  const { toastWarn, toastSuccess } = useToast();
  const { forgotPasswordApi } = useAuth();

  const email: string | null = searchParams.get('email');

  const handleResend = async () => {
    if (!email) {
      toastWarn('Your request is invalid');
      return;
    }

    const res = await forgotPasswordApi({
      email
    });
    if (res.status === STATUS_CODE.SUCCESS) {
      toastSuccess('Resent successfully! Please check your email.');
      setIsExpired(true);
    } else {
      toastWarn(res.message);
    }
  };

  const handleSubmit = async (
    values: IFResetPassword,
    { setSubmitting }: FormikHelpers<IFResetPassword>
  ) => {
    if (values.password !== values.passwordConfirm) {
      toastWarn('The passwords do not match. Please try again.');
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
      toastWarn(res.message);
    }
    setSubmitting(false);
  };

  useEffect(() => {
    setDisabledEmail(!!email);
  }, [email]);

  return !isSuccess ? (
    <Fragment>
      <Formik
        initialValues={{
          ...initDataForm,
          email: email || ''
        }}
        validationSchema={ResetPasswordSchema}
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
                submitButton={{
                  text: 'Save Password',
                  typeHTML: 'submit',
                  type: 'contained',
                  size: 'md',
                  disabled: !isValid || isSubmitting || !dirty
                }}
              />
            </>
          );
        }}
      </Formik>
      <div className={'mb-[15px] mt-[20px] flex justify-between text-[14px]'}>
        <CountdownTimer
          duration={TOKEN_EXPIRED_TIME}
          text={'Time will expire in: '}
          onComplete={() => setIsExpired(true)}
        />
        <button
          className={'outline-none border-none cursor-pointer underline text-[#228822]'}
          disabled={!isExpired}
          onClick={async () => await handleResend()}
        >
          Retry?
        </button>
      </div>
    </Fragment>
  ) : (
    <div className={'text-center mb-[20px]'}>
      <h3 className={'text-[20px] mb-[10px]'}>Password Changed</h3>
      <p className={'italic mb-[30px]'}>Your password has been changed successfully.</p>
      <Button typeHTML={'button'} type={'contained'}>
        <Link
          href={
            `${APP_ROUTES.SIGN_IN}?email=${
              encodeURIComponent(emailChanged || email || '')
            }`
          }
        >
          Sign In
        </Link>
      </Button>
    </div>
  );
};

export default FormResetPassword;
