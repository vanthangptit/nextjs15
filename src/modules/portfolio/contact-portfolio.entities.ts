import { Document } from 'mongoose';

export interface IContactPortfolioRequest {
  customerName: string;
  email: string;
  subject: string;
  message: string;
}

export interface IContactPortfolioModel extends Document, IContactPortfolioRequest {}
