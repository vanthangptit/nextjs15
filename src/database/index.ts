import mongoose from 'mongoose';
import { config } from '@/configs';

export const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@cluster0.pnejq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log('MongoDB connected!');
  } catch (err: any) {
    console.log('Error::connectDatabaseFailure ' + err.message);
    process.exit(1);
  }
};
