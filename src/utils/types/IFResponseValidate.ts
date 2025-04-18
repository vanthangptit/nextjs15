type Errors = {
  message: string
}

export interface IFResponseValidate {
  isValid: boolean
  errors: Errors | null | undefined
}