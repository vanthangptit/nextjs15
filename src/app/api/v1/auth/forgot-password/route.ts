import { NextRequest } from 'next/server';
import { appResponse, validation } from '@/utils/helpers';
import { ForgotPasswordSchema } from '@/app/api/v1/auth/forgot-password/schema';
import { IFForgotPasswordRequest } from '@/modules/auth/forgot-password/forgot-password.entities';
import forgotPasswordController from '@/modules/auth/forgot-password/forgot-password.controller';

async function forgotPassword(req: NextRequest) {
  const dataRequest: IFForgotPasswordRequest = await req.json();
  const {
    isValid,
    errors
  } = await validation(ForgotPasswordSchema, dataRequest);
  if (!isValid && errors) {
    return appResponse({ message: errors.message, status: 400 });
  }

  const response = await forgotPasswordController.forgotPassword(dataRequest);

  return appResponse(response);
}

export const POST = forgotPassword;