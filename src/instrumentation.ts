import databaseConnector from '@/libs/database';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await databaseConnector.connect();
  }
}