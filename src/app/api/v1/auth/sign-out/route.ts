import { NextRequest } from 'next/server';
import { IFContextSignOut } from '@/utils/types';
import { logger } from '@/modules/logging';
import { withAuth } from '@/libs/auth';
import { SignOutController } from '@/modules/auth/signout/sign-out.controller';

const signOutController = new SignOutController();

async function signOut(_req: NextRequest, context: IFContextSignOut) {
  const response = await signOutController.signOut(context);
  return logger.appResponse(response);
}

export const DELETE = withAuth(signOut);