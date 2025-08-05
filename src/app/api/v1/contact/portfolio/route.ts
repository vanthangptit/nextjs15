import { NextRequest } from 'next/server';
import { appResponse, validation } from '@/utils/helpers';
import contactPortfolioController from '@/modules/portfolio/contact-portfolio.controller';
import { IContactPortfolioRequest } from '@/modules/portfolio/contact-portfolio.entities';
import { ContactPortfolioSchema } from '@/app/api/v1/contact/portfolio/schema';

async function contactPortfolio(req: NextRequest) {
  const dataRequest: IContactPortfolioRequest = await req.json();
  const {
    isValid,
    errors
  } = await validation(ContactPortfolioSchema, dataRequest);
  if (!isValid && errors) {
    return appResponse({ message: errors.message, status: 400 });
  }

  const response =
    await contactPortfolioController.contactPortfolioForm(dataRequest);

  return appResponse(response);
}

export const POST = contactPortfolio;