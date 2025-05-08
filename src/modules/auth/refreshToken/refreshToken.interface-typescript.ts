import { Document, Schema } from 'mongoose';

export interface ICreateTokenParams {
  user: string,
  refreshToken: string[],
  userAgent: string,
  ip: string,
}

export interface ITokenModel extends Document {
  refreshToken: string[]
  ip: string
  userAgent: string
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please user is required'],
  }
}
