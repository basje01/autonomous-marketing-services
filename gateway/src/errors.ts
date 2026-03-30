/**
 * Application error hierarchy.
 * Every error has a statusCode and code for consistent API responses.
 */
export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly code: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string,
    public readonly fieldErrors?: Record<string, string[]>,
  ) {
    super(message, 400, "VALIDATION_ERROR");
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, message: string) {
    super(`${service}: ${message}`, 502, "EXTERNAL_SERVICE_ERROR");
  }
}

export class EscrowNotImplementedError extends AppError {
  constructor() {
    super("Escrow client not yet implemented", 501, "ESCROW_NOT_IMPLEMENTED");
  }
}
