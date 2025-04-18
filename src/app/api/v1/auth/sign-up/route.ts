import { signUpController } from '@/modules/auth/signup/signup.controller';
import { connectDB } from '@/database';
import { ResponseData } from '@/utils/types';
import { logger } from '@/modules/logging';
import { validation } from '@/utils/helpers';
import { SignUpSchema } from '@/app/api/v1/auth/sign-up/schema';

export async function POST(request: Request) {
  const dataRequest = await request.json();
  const { isValid, errors } = await validation(SignUpSchema, dataRequest);
  if (!isValid && errors) {
    return logger.appResponse({ message: errors.message, status: 400 });
  }
  await connectDB();
  const response: ResponseData = await signUpController.signUp(dataRequest);
  return logger.appResponse(response);
}