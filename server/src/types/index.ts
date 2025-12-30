export interface User {
    id: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export type UserPublic = Omit<User, 'password'>;        // remove password field

// Wallet types
export interface Wallet {
    id: string;
    userId: string;
    balance: number;
    frozenBalance: number;
    totalEquity: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface WalletResponse {
    id: string;
    balance: number;
    frozenBalance: number;
    totalEquity: number;
    availableBalance: number;
}

// order types

export type OrderType = 'BUY' | 'SELL';
export type OrderDirection = 'LONG' | 'SHORT';
export type OrderStatus = 'PENDING' | 'FILLED' | 'CANCELLED' | 'REJECTED';

export interface Order {
    id: string;
    userId: string;
    symbol: string;
    quantity: number;
    pricePerUnit: number;
    orderType: OrderType;
    direction: OrderDirection;
    status: OrderStatus;
    createdAt: Date;
    filledAt?: Date;
    cancelledAt?: Date;
    updatedAt: Date;
}

export interface CreateOrderRequest {
    symbol: string;
    quantity: number;
    direction: OrderDirection;
    slippagePercent?: number;
}

export interface CreateOrderResponse {
    id: string;
    symbol: string;
    quantity: number;
    pricePerUnit: number;
    orderType: OrderType;
    direction: OrderDirection;
    status: OrderStatus;
    createdAt: Date;
}

// position types

export type PositionStatus = 'OPEN' | 'CLOSED';

export interface Position {
    id: string;
    userId: string;
    orderId: string;
    symbol: string;
    quantity: number;
    entryPrice: number;
    direction: OrderDirection;
    status: PositionStatus;
    currentPrice: number;
    unrealizedPL: number;
    realizedPL: number;
    openedAt: Date;
    closedAt?: Date;
    updatedAt: Date;
}

export interface PositionResponse {
    id: string;
    symbol: string;
    quantity: number;
    entryPrice: number;
    currentPrice: number;
    direction: OrderDirection;
    unrealizedPL: number;
    unrealizedPLPercent: number;
    status: PositionStatus;
    openedAt: Date;
}

// Trade types
export interface Trade {
    id: string;
    userId: string;
    orderId: string;
    positionId: string;
    symbol: string;
    entryPrice: number;
    exitPrice: number;
    quantity: number;
    direction: OrderDirection;
    realizedPL: number;
    fee: number;
    netProfit: number;
    createdAt: Date;
    openedAt: Date;
    closedAt: Date;
}

export interface TradeResponse {
    id: string;
    symbol: string;
    quantity: number;
    entryPrice: number;
    exitPrice: number;
    realizedPL: number;
    fee: number;
    duration: number;
    netProfit: number;
    openedAt: Date;
    closedAt: Date;
}

// price types
export interface PriceData {
    symbol: string;
    bid: number;
    ask: number;
    last: number;
    timestamp: number;
}

export interface PriceHistory {
    id: string;
    symbol: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    createdAt: Date;
    timestamp: Date;
}

// Auth Types

export interface AuthPayload {
    userId: string;
    email: string;
    iat: number;
    exp: number;
}

// Register and Login Requests

export interface RegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    refreshToken: string;
    user: UserPublic;
    expiresIn: number;
}

// Api response types

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
        details: Record<string, any>;
    }
    timestamp: number;
    requestId: string;
};

// Pagination types
export interface PaginationMeta {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasMore: boolean;
}

export interface PaginatedResponse<T> {
    items: T[];
    meta: PaginationMeta;
}

// Audit Log Types
export type AuditAction =
    | 'ORDER_CREATED'
    | 'ORDER_CANCELLED'
    | 'POSITION_OPENED'
    | 'POSITION_CLOSED'
    | 'BALANCE_UPDATED'
    | 'USER_LOGIN'
    | 'USER_REGISTERED';


// who did what and when
export interface AuditLog {
    id: string;
    userId: string;
    action: AuditAction;
    metadata: Record<string, any>;
    ipAddress: string;
    userAgent: string;
    createdAt: Date;
}

/**
 * Job Queue Types
 */
export interface JobData {
    [key: string]: any;
}

export interface JobResult {
    success: boolean;
    data?: any;
    error?: string;
}