import { Document, Schema } from 'mongoose';

export interface IFForgotPasswordRequest {
  email: string
}

export interface IForgotPassword extends Document {
  token: string
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please user is required'],
  }
  createdAt?: Date
  updatedAt?: Date
}