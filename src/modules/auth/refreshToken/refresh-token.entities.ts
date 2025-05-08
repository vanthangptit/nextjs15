import { Document, Schema } from 'mongoose';

export interface IRefreshTokenParams {
  user: string,
  refreshToken: string[],
  userAgent: string,
  ip: string,
}

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
