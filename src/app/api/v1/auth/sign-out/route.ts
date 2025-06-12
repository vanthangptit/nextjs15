import { NextRequest } from 'next/server';
import { IFContextSignOut } from '@/utils/types';
import { withAuth } from '@/libs/auth';
import signOutController from '@/modules/auth/signout/sign-out.controller';
import { appResponse } from '@/utils/helpers';

async function signOut(_req: NextRequest, context: IFContextSignOut) {
  const response = await signOutController.signOut(context);
  return appResponse(response);
}

export const DELETE = withAuth(signOut);