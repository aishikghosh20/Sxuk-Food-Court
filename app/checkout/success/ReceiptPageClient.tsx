"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  Clock3,
  Receipt,
  ShoppingBag,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

type Order = {
  id: string;
  orderNumber: string;
  qrToken: string;
  createdAt: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  items: OrderItem[];
  total: number;
};

const CURRENT_ORDER_KEY = "campus-canteen-current-order";
const ORDER_HISTORY_KEY = "campus-canteen-order-history";

type ReceiptPageClientProps = {
  requestedOrderNumber: string | null;
};

export default function ReceiptPageClient({
  requestedOrderNumber,
}: ReceiptPageClientProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const currentRaw = window.localStorage.getItem(
        CURRENT_ORDER_KEY,
      );

      const historyRaw = window.localStorage.getItem(
        ORDER_HISTORY_KEY,
      );

      const currentOrder = currentRaw
        ? (JSON.parse(currentRaw) as Order)
        : null;

      const orderHistory = historyRaw
        ? (JSON.parse(historyRaw) as Order[])
        : [];

      let foundOrder: Order | null = null;

      if (requestedOrderNumber) {
        if (
          currentOrder &&
          currentOrder.orderNumber === requestedOrderNumber
        ) {
          foundOrder = currentOrder;
        } else {
          foundOrder =
            orderHistory.find(
              (item) =>
                item.orderNumber === requestedOrderNumber,
            ) ?? null;
        }
      } else {
        foundOrder = currentOrder;
      }

      setOrder(foundOrder);
    } catch (error) {
      console.error("Failed to load order receipt:", error);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }, [requestedOrderNumber]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAF7] px-5 py-12">
        <div className="mx-auto max-w-[620px]">
          <div className="rounded-2xl border border-[#E5E9E6] bg-white p-10 text-center">
            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-[#176B4D] border-t-transparent" />

            <p className="mt-4 text-sm text-[#66736D]">
              Loading your receipt...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-[#FAFAF7] px-5 py-10">
        <div className="mx-auto max-w-[620px]">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#66736D] transition-colors hover:text-[#176B4D]"
          >
            <ArrowLeft size={16} />
            Back to orders
          </Link>

          <div className="mt-8 rounded-2xl border border-[#E5E9E6] bg-white px-6 py-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F4EE] text-[#176B4D]">
              <Receipt size={24} />
            </div>

            <h1 className="mt-5 text-2xl font-semibold text-[#17201C]">
              Order not found
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#66736D]">
              This receipt is no longer available in the current
              session.
            </p>

            <Link
              href="/orders"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#176B4D] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#0F4D38]"
            >
              View my orders
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const createdAt = new Date(order.createdAt);

  const dateText = createdAt.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const timeText = createdAt.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });

  const statusText =
    order.status === "PLACED"
      ? "Order placed"
      : order.status === "ACCEPTED"
        ? "Accepted"
        : order.status === "PREPARING"
          ? "Preparing"
          : order.status === "READY"
            ? "Ready for collection"
            : order.status === "COLLECTED"
              ? "Collected"
              : order.status;

  return (
    <main className="min-h-screen bg-[#FAFAF7] px-4 py-7 pb-12 sm:px-6 md:py-10">
      <div className="mx-auto max-w-[620px]">

        {/* Back */}
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#66736D] transition-colors hover:text-[#176B4D]"
        >
          <ArrowLeft size={16} />
          Back to orders
        </Link>

        {/* Success */}
        <section className="mt-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F4EE] text-[#176B4D]">
            <Check size={27} strokeWidth={2.5} />
          </div>

          <h1 className="mt-4 text-[28px] font-semibold tracking-[-0.025em] text-[#17201C] sm:text-[32px]">
            Order confirmed
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#66736D]">
            Your order has been placed. Show your QR ticket at the
            counter when it is ready for collection.
          </p>
        </section>

        {/* Digital Ticket */}
        <section className="relative mt-8 overflow-hidden rounded-2xl border border-[#E1E6E2] bg-white shadow-[0_8px_30px_rgba(23,32,28,0.06)]">

          {/* Ticket top */}
          <div className="px-5 pb-6 pt-6 sm:px-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A0AAA4]">
                  Campus Canteen
                </p>

                <p className="mt-2 text-sm font-medium text-[#66736D]">
                  Digital pickup ticket
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8F4EE] text-[#176B4D]">
                <ShoppingBag size={18} />
              </div>
            </div>

            <div className="mt-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#A0AAA4]">
                  Order number
                </p>

                <p className="mt-1 text-[30px] font-semibold tracking-[-0.03em] text-[#17201C]">
                  #{order.orderNumber}
                </p>
              </div>

              <span className="mb-1 inline-flex items-center rounded-full bg-[#E8F4EE] px-3 py-1.5 text-xs font-semibold text-[#278A57]">
                {statusText}
              </span>
            </div>

            {/* Date/time */}
            <div className="mt-6 grid grid-cols-2 border-t border-[#E5E9E6] pt-5">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#A0AAA4]">
                  Ordered on
                </p>

                <p className="mt-1.5 text-sm font-medium text-[#17201C]">
                  {dateText}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#A0AAA4]">
                  Time
                </p>

                <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-[#17201C]">
                  <Clock3 size={14} className="text-[#66736D]" />
                  {timeText}
                </p>
              </div>
            </div>
          </div>

          {/* Perforated divider */}
          <div className="relative flex items-center">
            <div className="h-px flex-1 border-t border-dashed border-[#CBD3CE]" />

            <div className="absolute -left-3 h-6 w-6 rounded-full bg-[#FAFAF7]" />

            <div className="absolute -right-3 h-6 w-6 rounded-full bg-[#FAFAF7]" />
          </div>

          {/* Order details */}
          <div className="px-5 py-6 sm:px-7">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#17201C]">
                Order summary
              </h2>

              <span className="text-xs text-[#A0AAA4]">
                {order.items.reduce(
                  (sum, item) => sum + item.quantity,
                  0,
                )}{" "}
                items
              </span>
            </div>

            <div className="mt-4 space-y-0 divide-y divide-[#E5E9E6]">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#17201C]">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-[#7B8680]">
                      {item.quantity} × ₹{item.unitPrice}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-[#17201C]">
                    ₹{item.quantity * item.unitPrice}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-[#E5E9E6] bg-[#FCFCFA] px-5 py-5 sm:px-7">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs text-[#7B8680]">
                  Payment
                </p>

                <p className="mt-1 text-sm font-medium text-[#17201C]">
                  Cash at counter
                </p>
              </div>

              <div className="text-right">
                <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#A0AAA4]">
                  Total
                </p>

                <p className="mt-1 text-[27px] font-semibold tracking-[-0.025em] text-[#17201C]">
                  ₹{order.total}
                </p>
              </div>
            </div>
          </div>

          {/* QR ticket */}
          <div className="border-t border-[#E5E9E6] px-5 py-7 text-center sm:px-7">
            <p className="text-sm font-semibold text-[#17201C]">
              Scan to verify pickup
            </p>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#66736D]">
              Show this QR code to the canteen staff when your order
              is ready.
            </p>

            <div className="mx-auto mt-5 w-fit rounded-xl border border-[#E1E6E2] bg-white p-3">
              <QRCodeSVG
                value={order.qrToken}
                size={190}
                level="M"
                includeMargin
              />
            </div>

            <p className="mt-4 text-[11px] text-[#A0AAA4]">
              Secure order token • {order.orderNumber}
            </p>
          </div>
        </section>

        {/* Actions */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/orders"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#DCE2DE] bg-white px-4 text-sm font-semibold text-[#17201C] transition-colors hover:bg-[#F3F5F3]"
          >
            View order status
          </Link>

          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#176B4D] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#0F4D38]"
          >
            Back to menu
          </Link>
        </div>

        <p className="mt-5 text-center text-xs text-[#89938D]">
          Please keep this ticket available until your order is
          collected.
        </p>
      </div>
    </main>
  );
}