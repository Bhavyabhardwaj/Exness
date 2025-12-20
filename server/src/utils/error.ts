// base error extended 

export class AppError extends Error {
    constructor(
        public message: string,
        public statusCode: number = 500,
        public context?: Record<string, any>
    ) {
        super(message) {
            this.name = this.constructor.name;
            Error.captureStackTrace(this, this.constructor);
        }
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
}

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
}