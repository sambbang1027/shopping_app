"use client";

import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderCard } from "@/components/mypage/OrderCard";
import Link from "next/link";

async function fetchOrders() {
  const response = await fetch("/api/orders");
  if (!response.ok) throw new Error("주문 내역을 불러오는 데 실패했습니다");
  return response.json();
}

export default function MyPage() {
  const { data: orders, isLoading, isError, error } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto">
        <Skeleton className="h-4 w-24 mb-12" />
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20">
        <p className="text-[11px] tracking-[0.3em] uppercase text-red-400 mb-2">Error</p>
        <p className="text-xs text-gray-400">{(error as Error).message}</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-32">
        <p className="text-[11px] tracking-[0.4em] uppercase text-gray-300 mb-8">
          No orders yet
        </p>
        <Link
          href="/products"
          className="text-[10px] tracking-[0.3em] uppercase text-gray-500 hover:text-gray-900 transition-colors border-b border-gray-300 pb-px"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-[11px] tracking-[0.4em] uppercase text-gray-400 mb-12">
        My Orders
      </h1>
      <div className="space-y-6">
        {orders.map((order: Parameters<typeof OrderCard>[0]["order"]) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
