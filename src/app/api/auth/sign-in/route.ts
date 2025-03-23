import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { signInController } from '@/modules/auth/signin/signin.controller';
import { connectDB } from '@/database';
import { AUTH_COOKIE_NAME } from '@/utils/constants';

export async function POST(request: Request) {
  //@todo: Validate body request not yet
  const cookieStore = await cookies();
  const res = await request.json();
  await connectDB();

  const {
    status,
    message,
    data
  } = await signInController.signIn(res, cookieStore);
  const { newRefreshToken, hasClearCookie, ...restData } = data;

  if (data?.hasClearCookie) {
    cookieStore.delete(AUTH_COOKIE_NAME, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
  }

  if (status === 200) {
    cookieStore.set(AUTH_COOKIE_NAME, data?.newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return NextResponse.json({
      status,
      message,
      data: restData
    });
  }

  return NextResponse.json({ status, message });
}
