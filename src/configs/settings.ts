const devConfig = {
  baseURL: 'http://localhost:3000',
  accessDomain: ['http://localhost:3000'],
  email: {
    from: 'no-reply@nguyenthangdev.com',
    to: 'thang.dev.ptit@gmail.com',
    subject: {
      login: 'Welcome to DN, --Username--! Confirm Your Email',
      resetPassword: 'Forgot password: ',
      contactPortfolio: 'Contact Portfolio'
    },
    message: {
      contactPortfolio: '<p>Subject: <b>--SUBJECT--</b></p><p>Customer: <b>--CUSTOMER_NAME--</b></p><p>Email: <b>--EMAIL--</b></p><p>Message: <b>--MESSAGE--</b></p>'
    },
    name: 'DN',
    logo: 'http://localhost:3000/logo/logo.png',
    color: '#bc2e1d',
    clickTrackingValue: '',
    url: 'http://localhost:3000',
    urlLogin: 'http://localhost:3000/signin',
    urlContact: 'http://localhost:9200/contact',
    resetPasswordUrl: 'http://localhost:3000/account/forgot-password'
  }
};

const prodConfig = {
  baseURL: 'https://nguyenthangdev.com',
  accessDomain: ['https://nguyenthangdev.com'],
  email: {
    from: 'no-reply@nguyenthangdev.com',
    to: 'thang.dev.ptit@gmail.com',
    subject: {
      login: 'Welcome to DN, --Username--! Confirm Your Email',
      resetPassword: 'Welcome to DN, --Username--! Confirm Your Email',
      contactPortfolio: 'Contact Portfolio'
    },
    message: {
      contactPortfolio: '<p>Subject: <b>--SUBJECT--</b></p><p>Customer: <b>--CUSTOMER_NAME--</b></p><p>Email: <b>--EMAIL--</b></p><p>Message: <b>--MESSAGE--</b></p>'
    },
    name: 'DN',
    logo: 'https://nguyenthangdev.com/logo/logo.png',
    color: '#bc2e1d',
    clickTrackingValue: '',
    url: 'https://nguyenthangdev.com',
    urlLogin: 'https://nguyenthangdev.com/signin',
    urlContact: 'https://nguyenthangdev.com/contact',
    mailVerificationUrl: 'https://account.nguyenthangdev.com/auth/verify',
    mailChangeUrl: 'https://account.nguyenthangdev.com/auth/change-email',
    resetPasswordUrl: 'https://account.nguyenthangdev.com/auth/reset-password',
    termsOfServiceUrl: 'https://nguyenthangdev.com/terms'
  }
};

const masterConfig =
  process.env.NODE_ENV === 'production'
    ? prodConfig : devConfig;

/**
 * With prefix [PRIVATE_*]: Only be used in server-side code,
 * it should not be used in any files inside /pages, /app, or components that run on the client side.
 *
 * With prefix [PUBLIC_*]: Only be used in client-side code.
 *
 * Nothing: Everything's used
 */
export const config = {
  ...masterConfig,
  // Get the values from .env file
  PRIVATE_DB_NAME: process.env.DB_NAME,
  PRIVATE_DB_USER: process.env.DB_USER,
  PRIVATE_DB_PASSWORD: process.env.DB_PASS,
  PRIVATE_LENGTH_HASH_SALT: process.env.LENGTH_HASH_SALT,
  PRIVATE_PORT: process.env.PORT,
  PRIVATE_ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY,
  PRIVATE_REFRESH_TOKEN_PRIVATE_KEY: process.env.REFRESH_TOKEN_PRIVATE_KEY,

  PUBLIC_IMAGE_PROTOCOL: process.env.NEXT_PUBLIC_IMAGE_PROTOCOL,
  PUBLIC_IMAGE_HOST: process.env.NEXT_PUBLIC_IMAGE_HOST,
  PUBLIC_IMAGE_PATH: process.env.NEXT_PUBLIC_IMAGE_PATH,
  PUBLIC_AWS_S3_URL: `${process.env.NEXT_PUBLIC_IMAGE_PROTOCOL}://${process.env.NEXT_PUBLIC_IMAGE_HOST}/${process.env.NEXT_PUBLIC_IMAGE_PATH}`,
  PUBLIC_API_ROOT_URL: process.env.NEXT_PUBLIC_AWS_S3_URL
};
