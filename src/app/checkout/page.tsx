"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from "@/store/cartStore";
import { orderSchema, OrderFormData } from "@/schemas/order.schema";
import { useEffect } from "react";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  });

  useEffect(() => {
    if (items.length === 0) {
      router.push("/products");
    }
  }, [items.length, router]);

  if (items.length === 0) return null;

  const onSubmit = async (data: OrderFormData) => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          items: items.map((item) => ({
            id: item.id,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "주문 처리 중 오류가 발생했습니다");
        return;
      }

      clearCart();
      router.push("/order-complete");
    } catch {
      alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-[11px] tracking-[0.4em] uppercase text-gray-400 mb-14">
        Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* 왼쪽 — 주문 상품 요약 */}
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-8">
            Order Summary
          </p>

          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-16 flex-shrink-0 bg-gray-50 overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-300 text-[9px]">
                      —
                    </div>
                  )}
                </div>
                <div className="flex flex-1 justify-between items-start pt-1">
                  <div>
                    <p className="text-xs text-gray-900 leading-snug">{item.name}</p>
                    <p className="text-[10px] text-gray-400 mt-1">Qty {item.quantity}</p>
                  </div>
                  <p className="text-xs text-gray-900 tabular-nums">
                    {(item.price * item.quantity).toLocaleString("ko-KR")}원
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 mt-8 pt-6 flex justify-between items-baseline">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400">Total</p>
            <p className="text-base font-medium text-gray-900 tabular-nums">
              {totalPrice().toLocaleString("ko-KR")}원
            </p>
          </div>
        </div>

        {/* 오른쪽 — 배송지 폼 */}
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-8">
            Delivery Information
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <label className="block text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-2">
                Name
              </label>
              <input
                {...register("receiverName")}
                placeholder="홍길동"
                className="w-full border-b border-gray-200 pb-2 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-gray-900 transition-colors bg-transparent"
              />
              {errors.receiverName && (
                <p className="text-red-400 text-[10px] mt-1">
                  {errors.receiverName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-2">
                Phone
              </label>
              <input
                {...register("receiverPhone")}
                placeholder="010-1234-5678"
                className="w-full border-b border-gray-200 pb-2 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-gray-900 transition-colors bg-transparent"
              />
              {errors.receiverPhone && (
                <p className="text-red-400 text-[10px] mt-1">
                  {errors.receiverPhone.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-2">
                Address
              </label>
              <input
                {...register("address")}
                placeholder="서울시 강남구 테헤란로 123"
                className="w-full border-b border-gray-200 pb-2 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-gray-900 transition-colors bg-transparent"
              />
              {errors.address && (
                <p className="text-red-400 text-[10px] mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gray-900 text-white text-[11px] tracking-[0.3em] uppercase hover:bg-gray-700 transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
