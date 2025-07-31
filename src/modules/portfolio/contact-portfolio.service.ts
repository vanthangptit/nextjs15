import { mongo } from 'mongoose';
import { ContactPortfolioRepository } from '@/modules/portfolio/contact-portfolio.repository';
import { ContactPortfolio } from '@/modules/portfolio/contact-portfolio.model';
import { IContactPortfolioRequest } from '@/modules/portfolio/contact-portfolio.entities';

export class ContactPortfolioService {
  private readonly contactPortfolioRepository: ContactPortfolioRepository;

  constructor() {
    this.contactPortfolioRepository = new ContactPortfolioRepository(ContactPortfolio);
  }

  async createContactPortfolio(formData: IContactPortfolioRequest, session: mongo.ClientSession) {
    await this.contactPortfolioRepository.save(formData, session);

    /**@todo:
      1. Sending the mail
      2. Saving the system log message
      */
  }
}
