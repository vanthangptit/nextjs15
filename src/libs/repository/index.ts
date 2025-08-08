import { AnyKeys, Model, mongo, RootFilterQuery, UpdateQuery } from 'mongoose';

export abstract class BaseRepository<T> {
  // Creating a property to use your code in all instances
  // that extends your base repository and reuse on methods of class
  protected readonly database: Model<T>;

  // We created constructor with arguments to manipulate mongodb operations
  protected constructor(database: Model<T>) {
    this.database = database;
  }

  abstract read(_item: RootFilterQuery<T>): Promise<T | null>;

  abstract readMany(_item: RootFilterQuery<T>): Promise<T[]>;

  abstract save(_item: AnyKeys<T>, _session: mongo.ClientSession): Promise<any>;

  abstract update(
    _update: UpdateQuery<T>,
    _session: mongo.ClientSession
  ): Promise<any>;

  abstract delete(_id: string, _session: mongo.ClientSession): Promise<any>;
}