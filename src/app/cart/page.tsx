"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <div className="text-center py-32">
        <p className="text-[11px] tracking-[0.4em] uppercase text-gray-300 mb-8">
          Your cart is empty
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
    <div className="max-w-5xl mx-auto">
      <h1 className="text-[11px] tracking-[0.4em] uppercase text-gray-400 mb-12">Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* 아이템 목록 */}
        <div className="lg:col-span-2">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* 요약 */}
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
