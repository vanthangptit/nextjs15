import { AnyKeys, Model, mongo, RootFilterQuery, UpdateQuery } from 'mongoose';
import { IUser } from '@/modules/user/user.entities';
import { BaseRepository } from '@/libs/repository';

export class UserRepository extends BaseRepository<IUser> {
  constructor(database: Model<IUser>) {
    super(database);

    if (this.read !== UserRepository.prototype.read) {
      throw new Error('read method override is not allowed.');
    }
    if (this.readMany !== UserRepository.prototype.readMany) {
      throw new Error('readMore method override is not allowed.');
    }
    if (this.save !== UserRepository.prototype.save) {
      throw new Error('save method override is not allowed.');
    }
    if (this.update !== UserRepository.prototype.update) {
      throw new Error('update method override is not allowed.');
    }
    if (this.delete !== UserRepository.prototype.delete) {
      throw new Error('delete method override is not allowed.');
    }
  }

  async read(params: RootFilterQuery<IUser>) {
    return this.database.findOne({ ...params } as RootFilterQuery<IUser>);
  }

  async readMany(params: RootFilterQuery<IUser>) {
    return this.database.find({ filter: { ...params } });
  }

  async save(params: AnyKeys<IUser>, session: mongo.ClientSession) {
    return this.database.create([{ ...params }], { session });
  }

  async update(update: UpdateQuery<IUser>, session: mongo.ClientSession) {
    return this.database.findOneAndUpdate(
      {
        $or: [{ _id: update.id }]
      },
      {
        ...update
      },
      {
        new: true,
        session
      }
    );
  }

  async delete(id: string, session: mongo.ClientSession) {
    this.database.deleteMany({ user: id }).session(session);
  }
}
