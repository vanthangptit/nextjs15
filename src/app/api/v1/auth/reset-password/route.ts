import { NextRequest } from 'next/server';
import { appResponse, validation } from '@/utils/helpers';
import { ResetPasswordSchema } from '@/app/api/v1/auth/reset-password/schema';
import resetPasswordController from '@/modules/auth/reset-password/reset-password.controller';
import { IResetPassword } from '@/modules/auth/reset-password/reset-password.entities';

async function resetPassword(req: NextRequest) {
  const dataRequest: IResetPassword = await req.json();
  const {
    isValid,
    errors
  } = await validation(ResetPasswordSchema, dataRequest);
  if (!isValid && errors) {
    return appResponse({ message: errors.message, status: 400 });
  }

  const response = await resetPasswordController.resetPassword(dataRequest);

  return appResponse(response);
}

export const POST = resetPassword;