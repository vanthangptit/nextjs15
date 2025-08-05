import { mongo } from 'mongoose';
import { ContactPortfolioRepository } from '@/modules/portfolio/contact-portfolio.repository';
import { ContactPortfolio } from '@/modules/portfolio/contact-portfolio.model';
import { IContactPortfolioRequest } from '@/modules/portfolio/contact-portfolio.entities';
import mailSender, { MailSender } from '@/libs/mail-sender/mail';

export class ContactPortfolioService {
  private readonly contactPortfolioRepository: ContactPortfolioRepository;
  private readonly emailService: MailSender;

  constructor() {
    this.contactPortfolioRepository =
      new ContactPortfolioRepository(ContactPortfolio);
    this.emailService = mailSender;
  }

  async createContactPortfolio(
    formData: IContactPortfolioRequest,
    session: mongo.ClientSession
  ) {
    await this.contactPortfolioRepository.save(formData, session);
    await this.emailService.sendContactFormPortfolio(formData);
  }
}
