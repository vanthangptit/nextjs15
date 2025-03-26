import { NextResponse } from 'next/server';
import { signUpController } from '@/modules/auth/signup/signup.controller';
import { connectDB } from '@/database';
import { ResponseData } from '@/utils/types';

export async function POST(request: Request) {
  const res = await request.json();
  await connectDB();
  const response: ResponseData = await signUpController.signUp(res);
  return NextResponse.json(response);
}