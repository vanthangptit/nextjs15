import { Document, Schema } from 'mongoose';

export interface IRefreshToken extends Document {
  refreshToken: string[]
  ip: string
  userAgent: string
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please user is required'],
  }
}
