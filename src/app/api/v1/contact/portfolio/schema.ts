import * as Yup from 'yup';

export const ContactPortfolioSchema = Yup.object().shape({
  customerName: Yup.string().required('Email is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  subject: Yup.string().required('Email is required'),
  message: Yup.string().required('Email is required')
});
