import { NextRequest } from 'next/server';
import { signInController } from '@/modules/auth/signin/signin.controller';
import { connectDB } from '@/libs/database';
import { ResponseData } from '@/utils/types';
import { setCookie, validation } from '@/utils/helpers';
import { SignInSchema } from '@/app/api/v1/auth/sign-in/schema';
import { logger } from '@/modules/logging';
import { STATUS_CODE } from '@/utils/constants';

async function signIn(req: NextRequest) {
  const dataRequest = await req.json();
  const { isValid, errors } = await validation(SignInSchema, dataRequest);
  if (!isValid && errors) {
    return logger.appResponse({ message: errors.message, status: 400 });
  }

  await connectDB();
  const {
    status,
    message,
    data
  }: ResponseData = await signInController.signIn(dataRequest);

  if (status !== STATUS_CODE.SUCCESS) {
    return logger.appResponse({ message, status });
  }

  const { newRefreshToken, ...restData } = data;
  const cookie = setCookie(newRefreshToken);
  return logger.appResponse({
    status,
    message,
    data: restData
  }, {
    'Set-Cookie': cookie
  });
}

export const POST = signIn;