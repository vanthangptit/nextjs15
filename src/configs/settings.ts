
const devConfig = {
  accessDomain: ['http://localhost:3000'],
  email: {
    from: 'no-reply@nguyenthangdev.com',
    subject: {
      login: 'Welcome to NTD, --Username--! Confirm Your Email',
      resetPassword: 'Forgot password: One-time verification code'
    },
    name: 'NTD',
    color: '#bc2e1d',
    clickTrackingValue: '',
    url: 'http://localhost:3000',
    urlLogin: 'http://localhost:3000/login',
    mailVerificationUrl: 'http://localhost:9200/auth/verify',
    mailChangeUrl: 'http://localhost:9200/auth/change-email',
    resetPasswordUrl: 'http://localhost:9200/auth/reset-password',
    termsOfServiceUrl: 'https://nguyenthangdev.com/terms'
  }
};

const stagingConfig = {
  accessDomain: ['https://nguyenthangdev.com'],
  email: {
    from: 'no-reply@nguyenthangdev.com',
    subject: {
      login: 'Welcome to NTD, --Username--! Confirm Your Email',
      resetPassword: 'Welcome to NTD, --Username--! Confirm Your Email'
    },
    name: 'NTD',
    color: '#bc2e1d',
    clickTrackingValue: '',
    url: 'https://nguyenthangdev.com',
    urlLogin: 'https://nguyenthangdev.com/login',
    mailVerificationUrl: 'https://account.nguyenthangdev.com/auth/verify',
    mailChangeUrl: 'https://account.nguyenthangdev.com/auth/change-email',
    resetPasswordUrl: 'https://account.nguyenthangdev.com/auth/reset-password',
    termsOfServiceUrl: 'https://nguyenthangdev.com/terms'
  }
};

const prodConfig = {
  accessDomain: ['https://nguyenthangdev.com'],
  email: {
    from: 'no-reply@nguyenthangdev.com',
    subject: {
      login: 'Welcome to NTD, --Username--! Confirm Your Email',
      resetPassword: 'Welcome to NTD, --Username--! Confirm Your Email'
    },
    name: 'NTD',
    color: '#bc2e1d',
    clickTrackingValue: '',
    url: 'https://nguyenthangdev.com',
    urlLogin: 'https://nguyenthangdev.com/login',
    mailVerificationUrl: 'https://account.nguyenthangdev.com/auth/verify',
    mailChangeUrl: 'https://account.nguyenthangdev.com/auth/change-email',
    resetPasswordUrl: 'https://account.nguyenthangdev.com/auth/reset-password',
    termsOfServiceUrl: 'https://nguyenthangdev.com/terms'
  }
};

const masterConfig = 
  process.env.APP_ENV === 'production' 
    ? prodConfig : process.env.APP_ENV === 'staging' 
      ? stagingConfig : devConfig;

export const config = {
  ...masterConfig,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASS,
  LENGTH_HASH_SALT: process.env.LENGTH_HASH_SALT,
  PORT: process.env.PORT,
  ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_PRIVATE_KEY: process.env.REFRESH_TOKEN_PRIVATE_KEY
};
