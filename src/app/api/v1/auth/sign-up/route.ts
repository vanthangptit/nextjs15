import signupController from '@/modules/auth/signup/signup.controller';
import { ResponseData } from '@/utils/types';
import { appResponse, validation } from '@/utils/helpers';
import { SignUpSchema } from '@/app/api/v1/auth/sign-up/schema';

export async function POST(request: Request) {
  const dataRequest = await request.json();
  const { isValid, errors } = await validation(SignUpSchema, dataRequest);
  if (!isValid && errors) {
    return appResponse({ message: errors.message, status: 400 });
  }
  const response: ResponseData = await signupController.signUp(dataRequest);
  return appResponse(response);
}