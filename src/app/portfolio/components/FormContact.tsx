'use client';

import React from 'react';
import FormSettings from '@/components/molecules/Form/FormSettings';
import { Formik, FormikHelpers } from 'formik';
import { IFContactPortfolio } from '@/utils/types';
import { ContactPortfolioSchema } from '@/app/api/v1/contact/portfolio/schema';
import { API_URLs, STATUS_CODE } from '@/utils/constants';
import requester from '@/libs/requester';
import { useToast } from '@/hooks/useToast';

const FormContact = () => {
  const { toastSuccess, toastWarn } = useToast();

  const handleSubmit = async (
    values: IFContactPortfolio,
    { setSubmitting, resetForm }: FormikHelpers<any>
  ) => {
    const res = await requester.post(API_URLs.PORTFOLIO.CONTACT, values);
    if (res.status === STATUS_CODE.SUCCESS) {
      toastSuccess(res.message);
      resetForm();
    } else {
      toastWarn(res.message);
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        customerName: '',
        email: '',
        subject: '',
        message: ''
      }}
      validationSchema={ContactPortfolioSchema}
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
          <FormSettings
            formSettings={[
              {
                type: 'text',
                label: 'Name',
                name: 'customerName',
                value: values.customerName,
                errors,
                touched,
                onChange: handleChange,
                $height: 42,
                isVertical: true,
                required: true,
                viewRow: 1
              },
              {
                type: 'email',
                label: 'Email address',
                name: 'email',
                value: values.email,
                errors,
                touched,
                onChange: handleChange,
                $height: 42,
                isVertical: true,
                required: true,
                viewRow: 2
              },
              {
                type: 'text',
                label: 'Subject',
                name: 'subject',
                value: values.subject,
                errors,
                touched,
                onChange: handleChange,
                $height: 42,
                required: true,
                isVertical: true,
                viewRow: 3
              },
              {
                type: 'text',
                label: 'Message',
                name: 'message',
                formType: 'TEXTAREA',
                value: values.message,
                errors,
                touched,
                onChange: handleChange,
                $height: 42,
                required: true,
                isVertical: true,
                viewRow: 4
              }
            ]}
            submitButton={ {
              text: 'Send message',
              typeHTML: 'submit',
              type: 'outlined',
              size: 'md',
              disabled: !isValid || isSubmitting || !dirty
            }}
          />
        );
      }}
    </Formik>
  );
};

export default FormContact;
