import database from '@/libs/database';
export async function register() {
  await database.connect();
}