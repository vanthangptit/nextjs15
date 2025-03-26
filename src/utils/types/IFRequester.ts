export type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface IFParamRetryCallApi {
  url: string
  method: Method
  params: any
  retry?: boolean
  token?: string
}
