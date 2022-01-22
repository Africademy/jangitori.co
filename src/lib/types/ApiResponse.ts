interface BaseResponse {
  status?: number
  statusCode?: number
}

export type UnsuccessfulResponse<TError extends IError = IError> =
  BaseResponse & {
    data: null
    error: TError
  }

export type SuccessfulResponse<D> = BaseResponse & {
  data: D
  error: null
}

export interface IError {
  message: string
}

export type ApiResponse<Data, TError extends IError = IError> =
  | SuccessfulResponse<Data>
  | UnsuccessfulResponse<TError>

export interface RequestState<D, E extends IError = IError> {
  data?: D | null
  error?: E | null
  isLoading?: boolean
}
