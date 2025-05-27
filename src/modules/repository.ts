import { Model } from 'mongoose';

export abstract class BaseRepository<T> {
  // Creating a property to use your code in all instances
  // that extends your base repository and reuse on methods of class
  protected readonly database: Model<T>;

  // We created constructor with arguments to manipulate mongodb operations
  constructor(database: Model<T>) {
    this.database = database;
  }

  async find(_item: T): Promise<T[]> {
    throw new Error('find method not implemented.');
  }

  async findById(_id: string): Promise<T> {
    throw new Error('findById method not implemented.');
  }

  async findOne(_params: any): Promise<T> {
    throw new Error('findOne method not implemented.');
  }

  async create(_item: T): Promise<any> {
    throw new Error('create method not implemented.');
  }

  async update(_id: string, _item: T): Promise<any> {
    throw new Error('update method not implemented.');
  }

  async delete(_id: string): Promise<any> {
    throw new Error('delete method not implemented.');
  }
}