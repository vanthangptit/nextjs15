import { AnyKeys, Model, mongo, RootFilterQuery, UpdateQuery } from 'mongoose';
import { BaseRepository } from '@/libs/repository';
import { IForgotPassword } from '@/modules/auth/forgot-password/forgot-password.entities';

export class ForgotPasswordRepository extends BaseRepository<IForgotPassword> {
  constructor(database: Model<IForgotPassword>) {
    super(database);

    if (this.read !== ForgotPasswordRepository.prototype.read) {
      throw new Error('read method override is not allowed.');
    }
    if (this.readMany !== ForgotPasswordRepository.prototype.readMany) {
      throw new Error('readMore method override is not allowed.');
    }
    if (this.save !== ForgotPasswordRepository.prototype.save) {
      throw new Error('save method override is not allowed.');
    }
    if (this.update !== ForgotPasswordRepository.prototype.update) {
      throw new Error('update method override is not allowed.');
    }
    if (this.delete !== ForgotPasswordRepository.prototype.delete) {
      throw new Error('delete method override is not allowed.');
    }
  }

  async read(params: RootFilterQuery<IForgotPassword>) {
    return this.database.findOne(
      { ...params } as RootFilterQuery<IForgotPassword>
    );
  }

  async readMany(params: RootFilterQuery<IForgotPassword>) {
    return this.database.find({ filter: { ...params } });
  }

  async save(params: AnyKeys<IForgotPassword>, session: mongo.ClientSession) {
    return this.database.create([{ ...params }], { session });
  }

  async update(
    update: UpdateQuery<IForgotPassword>,
    session: mongo.ClientSession
  ) {
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