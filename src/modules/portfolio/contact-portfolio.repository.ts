import { AnyKeys, Model, mongo, RootFilterQuery, UpdateQuery } from 'mongoose';
import { IContactPortfolioModel } from './contact-portfolio.entities';
import { BaseRepository } from '@/libs/repository';

export class ContactPortfolioRepository
  extends BaseRepository<IContactPortfolioModel> {
  constructor(database: Model<IContactPortfolioModel>) {
    super(database);

    if (this.read !== ContactPortfolioRepository.prototype.read) {
      throw new Error('read method override is not allowed.');
    }
    if (this.readMany !== ContactPortfolioRepository.prototype.readMany) {
      throw new Error('readMore method override is not allowed.');
    }
    if (this.save !== ContactPortfolioRepository.prototype.save) {
      throw new Error('save method override is not allowed.');
    }
    if (this.update !== ContactPortfolioRepository.prototype.update) {
      throw new Error('update method override is not allowed.');
    }
    if (this.delete !== ContactPortfolioRepository.prototype.delete) {
      throw new Error('delete method override is not allowed.');
    }
  }

  async read(params: RootFilterQuery<IContactPortfolioModel>) {
    return this.database.findOne(
      { ...params } as RootFilterQuery<IContactPortfolioModel>
    );
  }

  async readMany(params: RootFilterQuery<IContactPortfolioModel>) {
    return this.database.find({ filter: { ...params } });
  }

  async save(
    params: AnyKeys<IContactPortfolioModel>,
    session: mongo.ClientSession
  ) {
    return this.database.create([{ ...params }], { session });
  }

  async update(
    update: UpdateQuery<IContactPortfolioModel>,
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
