"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

export function CartSummary() {
  const totalPrice = useCartStore((state) => state.totalPrice());
  const items = useCartStore((state) => state.items);
  const { data: session } = useSession();
  const router = useRouter();

  if (items.length === 0) return null;

  const handleCheckout = () => {
    if (!session) {
      router.push("/login?callbackUrl=/checkout");
      return;
    }
    router.push("/checkout");
  };

  return (
    <div className="sticky top-24 space-y-6">
      <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400">
        Order Summary
      </p>

      <div className="flex justify-between items-baseline">
        <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400">
          Subtotal
        </span>
        <span className="text-xs text-gray-900 tabular-nums">
          {totalPrice.toLocaleString("ko-KR")}원
        </span>
      </div>

      <div className="border-t border-gray-100 pt-5 flex justify-between items-baseline">
        <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400">
          Total
        </span>
        <span className="text-base font-medium text-gray-900 tabular-nums">
          {totalPrice.toLocaleString("ko-KR")}원
        </span>
      </div>

      <button
        onClick={handleCheckout}
        className="w-full py-4 bg-gray-900 text-white text-[11px] tracking-[0.3em] uppercase hover:bg-gray-700 transition-colors"
      >
        Checkout
      </button>

      {!session && (
        <p className="text-[10px] text-center text-gray-400">
          로그인 후 주문할 수 있습니다
        </p>
      )}
    </div>
  );
}
