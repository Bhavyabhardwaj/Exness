// base error extended 

export class AppError extends Error {
    constructor(
        public message: string,
        public statusCode: number = 500,
        public context?: Record<string, any>
    ) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            statusCode: this.statusCode,
            context: this.context,
        };
    }
}

// validater error (if user input is invalid)

export class ValidationError extends AppError {
    constructor(
        message: string,
        context?: Record<string, any>
    ) {
        super(message, 400, context);
        this.name = 'ValidationError';
    }
};

// Authentication error - unauthorized 
export class UnauthorizedError extends AppError {
    constructor(
        message: string = 'Authentication failed',
        context?: Record<string, any>
    ) {
        super(message, 401, context);
        this.name = 'UnauthorizedError';
    }
};

// Forbidden error - access denied
export class ForbiddenError extends AppError {
    constructor(
        message: string = 'Access denied',
        context?: Record<string, any>
    ) {
        super(message, 403, context);
        this.name = 'ForbiddenError';
    }
};

// not found error
export class NotFoundError extends AppError {
  constructor(resource: string, identifier?: string) {
    const message = identifier
      ? `${resource} with id "${identifier}" not found`
      : `${resource} not found`;
    super(message, 404, { resource, identifier });
    this.name = 'NotFoundError';
  }
};

// conflict error - resource already exists
export class ConflictError extends AppError {
    constructor(
        message: string,
        context?: Record<string, any>
    ) {
        super(message, 409, context);
        this.name = 'ConflictError';
    }
};

// insufficient balance errors
export class InsufficientBalanceError extends AppError {
  constructor(required: number, available: number) {
    super(
      `Insufficient balance. Required: ${required}, Available: ${available}`,
      400,
      { required, available }
    );
    this.name = 'InsufficientBalanceError';
  }
};

// Trading specific
export class InvalidOrderError extends AppError {
    constructor(
        message: string,
        context?: Record<string, any>
    ) {
        super(message, 400, context);
        this.name = 'InvalidOrderError';
    }
}

// position not found error
export class PositionNotFoundError extends AppError {
    constructor(
        positionId: string
    ) {
        super(`Position with id "${positionId}" not found`, 404, { positionId });
        this.name = 'PositionNotFoundError';
    }
};

// order not found error
export class OrderNotFoundError extends AppError {
    constructor(
        orderId: string
    ) {
        super(`Order with id "${orderId}" not found`, 404, { orderId });
        this.name = 'OrderNotFoundError';
    }
};

// wallet not found error
export class WalletNotFoundError extends AppError {
    constructor(userId: string) {
        super(`Wallet for user id "${userId}" not found`, 404, { userId });
        this.name = 'WalletNotFoundError';
    }
};

// Database errors
export class DatabaseError extends AppError {
    constructor(message: string = 'Database error', context?: Record<string, any>) {
        super(message, 500, context);
        this.name = 'DatabaseError';
    }
};

// cache errors
export class CacheError extends AppError {
    constructor(message: string = 'Cache error', context?: Record<string, any>) {
        super(message, 500, context);
        this.name = 'CacheError';
    }
};

// Rate limit error
export class RateLimitError extends AppError {
    constructor(message: string = 'Too many requests', context?: Record<string, any>) {
        super(message, 429, context);
        this.name = 'RateLimitError';
    }
};

// Queue error
export class QueueError extends AppError {
    constructor(message: string = 'Queue processing error', context?: Record<string, any>) {
        super(message, 500, context);
        this.name = 'QueueError';
    }
};

// matching orders error
export class MatchingError extends AppError {
    constructor(message: string = 'Order matching error', context?: Record<string, any>) {
        super(message, 400, context);
        this.name = 'MatchingError';
    }
};

export function isAppError(error: any): error is AppError {
    return error instanceof AppError;
};

export function handleError(error: unknown, defaultMessage = 'An error occurred'): AppError {
  // Already an AppError
  if (isAppError(error)) {
    return error;
  }

  // Prisma unique constraint error
  if (error instanceof Error && error.message.includes('Unique constraint failed')) {
    return new ConflictError('Resource already exists');
  }

  // Prisma not found error
  if (error instanceof Error && error.message.includes('An operation failed')) {
    return new NotFoundError('Resource');
  }

  // Standard Error
  if (error instanceof Error) {
    return new AppError(error.message, 500, { originalError: error.message });
  }

  // Unknown error
  return new AppError(defaultMessage, 500, { error });
};