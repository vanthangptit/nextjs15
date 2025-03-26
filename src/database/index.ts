import mongoose from 'mongoose';
import { config } from '@/configs';

export const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@cluster0.aicje.mongodb.net`
    );
    // eslint-disable-next-line no-console
    console.log('MongoDB connected!');
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log('Error::connectDatabaseFailure ' + err.message);
    process.exit(1);
  }
};
