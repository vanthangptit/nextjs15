'use client';
import React, { FormEvent, Fragment } from 'react';

export interface IFormFieldSignIn {
  email: string;
  password: string;
  demo: string;
}

const SignIn = () => {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    const response = await fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    // eslint-disable-next-line no-console
    console.log({ 'sign-in': await response.json() });

    // if (response.ok) {
    //   router.push('/profile')
    // } else {
    //   // Handle errors
    // }
  }
  async function getTokenApi(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch('/api/auth/refresh-token', {
      method: 'GET'
    });

    // eslint-disable-next-line no-console
    console.log({ 'refresh-token': await response.json() });

    // if (response.ok) {
    //   router.push('/profile')
    // } else {
    //   // Handle errors
    // }
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <form onSubmit={getTokenApi}>
        <button type="submit">Get Token</button>
      </form>
    </Fragment>
  );
};

export default SignIn;
