'use client';

import React, { Fragment, useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import FormSettings from '@/components/molecules/Form/FormSettings';
import { useAuth } from '@/hooks/useAuth';
import { IFormForgotPassword } from '@/utils/types';
import { ForgotPasswordSchema } from '@/app/api/v1/auth/forgot-password/schema';
import { STATUS_CODE } from '@/utils/constants';
import MessageError from '@/components/atoms/MessageError';

export const FormForgotPassword = () => {
  const { forgotPasswordApi } = useAuth();
  const [isEmailFound, setEmailFound] = useState<boolean>();

  const handleSubmit = async (
    values: IFormForgotPassword,
    { setSubmitting }: FormikHelpers<any>
  ) => {
    const res = await forgotPasswordApi(values);
    if (res.status === STATUS_CODE.SUCCESS) {
      setEmailFound(true);
    } else {
      setEmailFound(false);
    }
    setSubmitting(false);
  };

  return (
    <Fragment>
      {!isEmailFound ? (
        <>
          <strong className={ 'flex mb-[15px] text-base mb-[25px] font-normal text-black dark:text-white' }>
            Enter the email address you used to sign up for your <br/>
            DN account, and we’ll send you a password reset link.
          </strong>
          <Formik
            initialValues={ { email: '' } }
            validationSchema={ ForgotPasswordSchema }
            onSubmit={ handleSubmit }
          >
            { ({
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
                    formSettings={ [
                      {
                        type: 'email',
                        name: 'email',
                        placeholder: 'Ex: example@gmail.com',
                        value: values.email,
                        errors,
                        touched,
                        onChange: handleChange,
                        $height: 42,
                        required: true,
                        isVertical: true
                      }
                    ] }
                    submitButton={ {
                      text: 'Send',
                      typeHTML: 'submit',
                      type: 'contained',
                      size: 'md',
                      disabled: !isValid || isSubmitting || !dirty
                    } }
                  />
                  { isEmailFound === false && (
                    <MessageError
                      message={ 'Email not found or not registered. Please try another email.' }
                      $align={ 'center' }
                    />
                  ) }
                </>
              );
            } }
          </Formik>
        </>
      ) : (
        <div>
          <h5 className={'mb-[15px]'}>
            Please check your email inbox for a link to complete the reset.
          </h5>
          <em className={'text-[13px] text-gray-700 dark:text-gray-400'}>
            <strong>Note</strong>: If you don&#39;t see in your Inbox.
            Please check your spam folder in your email.
          </em>
        </div>
      )}
    </Fragment>
  );
};
