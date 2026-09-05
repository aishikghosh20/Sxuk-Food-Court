"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { MockOrder, MockOrderItem, PaymentMethod } from "../types/order";

interface CreateOrderInput {
  items: MockOrderItem[];
  total: number;
  paymentMethod: PaymentMethod;
}

interface OrderSessionContextValue {
  currentOrder: MockOrder | null;
  orderHistory: MockOrder[];
  createOrder: (input: CreateOrderInput) => MockOrder;
  clearCurrentOrder: () => void;
}

const CURRENT_ORDER_KEY = "campus-canteen-current-order";
const ORDER_HISTORY_KEY = "campus-canteen-order-history";

const OrderSessionContext = createContext<OrderSessionContextValue | undefined>(undefined);

function makeId(prefix: string) {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function makeOrderNumber() {
  const value = Math.floor(1000 + Math.random() * 9000);
  return `CC-${value}`;
}

export function OrderSessionProvider({ children }: { children: ReactNode }) {
  const [currentOrder, setCurrentOrder] = useState<MockOrder | null>(null);
  const [orderHistory, setOrderHistory] = useState<MockOrder[]>([]);

  useEffect(() => {
    try {
      const savedCurrent = window.localStorage.getItem(CURRENT_ORDER_KEY);
      const savedHistory = window.localStorage.getItem(ORDER_HISTORY_KEY);

      if (savedCurrent) {
        setCurrentOrder(JSON.parse(savedCurrent) as MockOrder);
      }

      if (savedHistory) {
        setOrderHistory(JSON.parse(savedHistory) as MockOrder[]);
      }
    } catch {
      window.localStorage.removeItem(CURRENT_ORDER_KEY);
      window.localStorage.removeItem(ORDER_HISTORY_KEY);
    }
  }, []);

  useEffect(() => {
    try {
      if (currentOrder) {
        window.localStorage.setItem(CURRENT_ORDER_KEY, JSON.stringify(currentOrder));
      } else {
        window.localStorage.removeItem(CURRENT_ORDER_KEY);
      }
    } catch {
      // Local persistence is a convenience for this prototype.
    }
  }, [currentOrder]);

  useEffect(() => {
    try {
      window.localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(orderHistory));
    } catch {
      // Local persistence is a convenience for this prototype.
    }
  }, [orderHistory]);

  const createOrder = useCallback(
    ({ items, total, paymentMethod }: CreateOrderInput) => {
      // Online payment is intentionally disabled in this prototype.
      // Keep this guard here as a second layer of protection so an online
      // order can never be created even if another UI path calls createOrder.
      if (paymentMethod === "ONLINE") {
        throw new Error("Online payment is demo-only and is not available.");
      }

      const order: MockOrder = {
        id: makeId("order"),
        orderNumber: makeOrderNumber(),
        qrToken: makeId("qr"),
        createdAt: new Date().toISOString(),
        status: "PLACED",
        paymentMethod,
        paymentStatus: "PENDING",
        items: items.map((item) => ({ ...item })),
        total,
      };

      setCurrentOrder(order);
      setOrderHistory((previous) => [
        order,
        ...previous.filter((item) => item.orderNumber !== order.orderNumber),
      ]);

      return order;
    },
    [],
  );

  const clearCurrentOrder = useCallback(() => setCurrentOrder(null), []);

  const value = useMemo(
    () => ({
      currentOrder,
      orderHistory,
      createOrder,
      clearCurrentOrder,
    }),
    [currentOrder, orderHistory, createOrder, clearCurrentOrder],
  );

  return (
    <OrderSessionContext.Provider value={value}>
      {children}
    </OrderSessionContext.Provider>
  );
}

export function useOrderSession() {
  const context = useContext(OrderSessionContext);

  if (!context) {
    throw new Error("useOrderSession must be used within OrderSessionProvider");
  }

  return context;
}
