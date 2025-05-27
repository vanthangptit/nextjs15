import { model, models, Schema } from 'mongoose';
import { IRefreshToken } from '@/modules/auth/refreshToken/refresh-token.entities';

const TokenSchema = new Schema<IRefreshToken>({
  refreshToken: {
    type: [String],
    trim: true
  },
  /**
   * @todo Analyst user with user agent and IP address
   */
  ip: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please userToken is required']
  }
}, {
  timestamps: true
});

// Compile the post model
export const Token = models.Token || model<IRefreshToken>('Token', TokenSchema);
