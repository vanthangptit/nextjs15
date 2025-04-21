import { refreshTokenRepository } from '@/modules/auth/refreshToken/refreshToken.repository';
import { Token } from '@/modules/auth/refreshToken/refreshToken.model';

export const signOutService = {
  deleteRefreshToken: async (userId: string, session: any): Promise<void> => {
    await refreshTokenRepository.deleteRefreshToken(userId, session);
  },
  getUserToken: async (userId: string, refreshToken: string) => {
    return Token.findOne({ refreshToken, user: userId });
  }
};