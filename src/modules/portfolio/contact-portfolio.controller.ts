import { startSession } from 'mongoose';
import { appError, appSuccessfully } from '@/utils/helpers';
import { ContactPortfolioService } from '@/modules/portfolio/contact-portfolio.service';
import { IContactPortfolioRequest } from '@/modules/portfolio/contact-portfolio.entities';

export class ContactPortfolioController {
  // eslint-disable-next-line no-use-before-define
  private static instance: ContactPortfolioController;
  private contactPortfolioService: ContactPortfolioService;

  constructor() {
    this.contactPortfolioService = new ContactPortfolioService();
  }

  public static getInstance(): ContactPortfolioController {
    if (!ContactPortfolioController.instance) {
      ContactPortfolioController.instance = new ContactPortfolioController();
    }
    return ContactPortfolioController.instance;
  }

  async contactPortfolioForm (formData: IContactPortfolioRequest) {
    const session = await startSession();
    session.startTransaction();

    try {
      await this.contactPortfolioService.createContactPortfolio(formData, session);

      await session.commitTransaction();
      await session.endSession();
      return appSuccessfully('Sent successfully');
    } catch (e: any) {
      await session.abortTransaction();
      await session.endSession();
      return appError(e?.message);
    }
  };
}

const contactPortfolioController = ContactPortfolioController.getInstance();
export default contactPortfolioController;