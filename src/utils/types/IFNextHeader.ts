import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export type NextHeaders = () => Promise<ReadonlyHeaders>;
export type NextCookies = () => Promise<ReadonlyRequestCookies>;

export interface IFContextSignController {
  headers: NextHeaders;
  cookies: NextCookies
}