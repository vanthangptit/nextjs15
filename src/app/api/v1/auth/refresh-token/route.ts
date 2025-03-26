import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME } from '@/utils/constants';
import { ResponseData } from '@/utils/types';
import tokenRefreshController from '@/modules/auth/refreshToken/refreshToken.controller';

export async function GET() {
  const cookieStore = await cookies();
  const refreshToken =
    cookieStore.has('authToken')
      ? cookieStore.get('authToken')?.value
      : null;

  //@todo: Double check
  // cookieStore.delete(AUTH_COOKIE_NAME, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: 'none',
  // });

  if (!refreshToken) {
    return NextResponse.json({
      status: 401,
      message: 'Access Denied. No token provided or invalid refresh token'
    });
  }

  const {
    status,
    message,
    data
  }: ResponseData =
    await tokenRefreshController.getTokenCtrl(refreshToken);

  if (status === 200) {
    cookieStore.set(AUTH_COOKIE_NAME, data?.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return NextResponse.json({
      status,
      message,
      data: {
        accessToken: data.accessToken,
        user: data.user
      }
    });
  }

  return NextResponse.json({ status, message });
}
