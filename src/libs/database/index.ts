import mongoose, { Mongoose } from 'mongoose';
import { config } from '@/configs';
import { logger } from '@/libs/logger';

class DatabaseConnector {
  // eslint-disable-next-line no-use-before-define
  private static instance: DatabaseConnector;
  private connection: Mongoose | null = null;
  private readonly mongoURI: string;

  private constructor() {
    this.mongoURI = `mongodb+srv://${config.PRIVATE_DB_USER}:${config.PRIVATE_DB_PASSWORD}@cluster0.aicje.mongodb.net`;
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
      logger.log('MongoDB connected!');
      return this.connection;
    } catch (error: any) {
      throw new Error(String(error));
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
    } catch (error) {
      logger.error('Error disconnecting from MongoDB:', error);
      throw new Error(String(error));
    }
  }
}

const databaseConnector = DatabaseConnector.getInstance();
export default databaseConnector;