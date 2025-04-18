import { refreshTokenRepository } from '@/modules/auth/refreshToken/refreshToken.repository';

export const signOutService = {
  deleteRefreshToken: async (userId: string, session: any): Promise<void> => {
    await refreshTokenRepository.deleteRefreshToken(userId, session);
  }
};