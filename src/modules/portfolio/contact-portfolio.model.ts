import { model, models, Schema } from 'mongoose';
import { IContactPortfolioModel } from './contact-portfolio.entities';

const ContactPortfolioSchema = new Schema<IContactPortfolioModel>({
  customerName: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'email is required']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    unique: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
});

// Compile the post model
export const ContactPortfolio = models.ContactPortfolio || model<IContactPortfolioModel>('ContactPortfolio', ContactPortfolioSchema);
