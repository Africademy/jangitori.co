interface BaseResponse {
  status?: number
  statusCode?: number
}

export type UnsuccessfulResponse<TError extends IApiError = IApiError> =
  BaseResponse & {
    data: null
    error: TError
  }

export type SuccessfulResponse<D> = BaseResponse & {
  data: D
  error: null
}

export interface IApiError {
  message: string
}

export type ApiResponse<Data, TError extends IApiError = IApiError> =
  | SuccessfulResponse<Data>
  | UnsuccessfulResponse<TError>
