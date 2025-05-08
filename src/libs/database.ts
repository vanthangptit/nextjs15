import mongoose, { Mongoose } from 'mongoose';
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

class DatabaseConnector {
  // eslint-disable-next-line no-use-before-define
  private static instance: DatabaseConnector;
  private connection: Mongoose | null = null;
  private readonly mongoURI: string;

  private constructor() {
    this.mongoURI = `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@cluster0.aicje.mongodb.net`;
  }

  public static getInstance(): DatabaseConnector {
    if (!DatabaseConnector.instance) {
      DatabaseConnector.instance = new DatabaseConnector();
    }
    return DatabaseConnector.instance;
  }

  public async connect(): Promise<Mongoose> {
    if (!this.mongoURI) {
      throw new Error('MONGODB_URI is not defined');
    }
    if (this.connection) {
      return this.connection;
    }

    try {
      this.connection = await mongoose.connect(this.mongoURI);
      // eslint-disable-next-line no-console
      console.log('MongoDB connected!');
      return this.connection;
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('Error connecting from MongoDB:' + error.message);
      process.exit(1);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
      throw new Error(String(error));
    }
  }
}

const database = DatabaseConnector.getInstance();
export default database;