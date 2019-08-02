export interface ProblemDetails {
  statusCode: number;
  title: string;
  detail?: string;
  [key: string]: any;
}

export interface ValidationError extends ProblemDetails {
  'invalid-params': { name?: string; reason: string }[];
}

export const isProblemDetailsError = (
  err: ProblemDetails | any,
): err is ProblemDetails => {
  return (
    err &&
    err.statusCode &&
    (err.title || (err.error && typeof err.error === 'string'))
  );
};

export const isValidationError = (
  err: ValidationError | any,
): err is ValidationError => {
  return isProblemDetailsError(err) && err['invalid-params'];
};
