import { model, models, Schema } from 'mongoose';
import { IForgotPassword } from '@/modules/auth/forgot-password/forgot-password.entities';

const ForgotPasswordSchema = new Schema<IForgotPassword>({
  token: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please userToken is required']
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
});

// Compile the post model
export const ForgotPasswordModel = models.ForgotPassword || model<IForgotPassword>('ForgotPassword', ForgotPasswordSchema);
