export type ApiErrorCode =
  | 'not_found'
  | 'validation_error'
  | 'expired'
  | 'rate_limited'
  | 'internal_error';

export type ApiError = {
  code: ApiErrorCode;
  message?: string;
};
