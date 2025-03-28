'use server';

import { redirect } from 'next/navigation';
import requester from '@/api-client/requester';
import { API_URLs } from '@/utils/constants';
import { IFormFieldSignUp } from '@/app/(auth)/signup/component/FormSignup';
import { IFormFieldSignIn } from '@/app/(auth)/signin/component/FormSignIn';
import { ResponseData } from '@/utils/types';

export const signUp = async (formData: IFormFieldSignUp): Promise<ResponseData> => {
  return await requester.post(API_URLs.AUTH.SIGN_UP_URL, formData);
};

export const signIn = async (formData: IFormFieldSignIn): Promise<ResponseData> => {
  return await requester.get(API_URLs.AUTH.SIGN_IN_URL, formData);
};

export async function signOut() {
  redirect('/sign-in');
}
