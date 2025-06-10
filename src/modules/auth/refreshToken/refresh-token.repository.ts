import { AnyKeys, Model, mongo, RootFilterQuery, UpdateQuery } from 'mongoose';
import {
  IRefreshToken
} from '@/modules/auth/refreshToken/refresh-token.entities';
import { BaseRepository } from '@/libs/repository';

export class RefreshTokenRepository extends BaseRepository<IRefreshToken> {
  constructor(database: Model<IRefreshToken>) {
    super(database);

    if (this.read !== RefreshTokenRepository.prototype.read) {
      throw new Error('read method override is not allowed.');
    }
    if (this.readMany !== RefreshTokenRepository.prototype.readMany) {
      throw new Error('readMore method override is not allowed.');
    }
    if (this.save !== RefreshTokenRepository.prototype.save) {
      throw new Error('save method override is not allowed.');
    }
    if (this.update !== RefreshTokenRepository.prototype.update) {
      throw new Error('update method override is not allowed.');
    }
    if (this.delete !== RefreshTokenRepository.prototype.delete) {
      throw new Error('delete method override is not allowed.');
    }
  }

  async read(params: RootFilterQuery<IRefreshToken>) {
    return this.database.findOne(
      { ...params } as RootFilterQuery<IRefreshToken>
    );
  }

  async readMany(params: RootFilterQuery<IRefreshToken>) {
    return this.database.find({ filter: { ...params } });
  }

  async save(params: AnyKeys<IRefreshToken>, session: mongo.ClientSession) {
    return this.database.create([{ ...params }], { session });
  }

  async update(
    update: UpdateQuery<IRefreshToken>,
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