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
}