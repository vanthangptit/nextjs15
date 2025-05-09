import { SignupController } from '@/modules/auth/signup/signup.controller';
import { ResponseData } from '@/utils/types';
import { logger } from '@/modules/logging';
import { validation } from '@/utils/helpers';
import { SignUpSchema } from '@/app/api/v1/auth/sign-up/schema';

const signupController = new SignupController();

export async function POST(request: Request) {
  const dataRequest = await request.json();
  const { isValid, errors } = await validation(SignUpSchema, dataRequest);
  if (!isValid && errors) {
    return logger.appResponse({ message: errors.message, status: 400 });
  }
  const response: ResponseData = await signupController.signUp(dataRequest);
  return logger.appResponse(response);
}