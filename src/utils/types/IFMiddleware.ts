import { NextRequest } from 'next/server';

export type HandlerType = (
  _req: NextRequest, _context?: any
) => Promise<Response>;
