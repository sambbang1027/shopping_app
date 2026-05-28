"use client";

import Image from "next/image";
import { useCartStore, CartItem as CartItemType } from "@/store/cartStore";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-5 py-6 border-b border-gray-100">
      {/* 상품 이미지 */}
      <div
        className="relative w-20 flex-shrink-0 bg-gray-50 overflow-hidden"
        style={{ aspectRatio: "3/4" }}
      >
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-300 text-[9px]">
            —
          </div>
        )}
      </div>

      {/* 상품 정보 */}
      <div className="flex flex-1 justify-between">
        <div className="flex flex-col justify-between py-0.5">
          <p className="text-xs text-gray-900 leading-snug">{item.name}</p>

          {/* 수량 버튼 */}
          <div className="flex items-center border border-gray-200 w-fit">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
            >
              −
            </button>
            <span className="w-8 h-8 flex items-center justify-center text-xs text-gray-900 border-x border-gray-200 tabular-nums">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* 금액 + 삭제 */}
        <div className="flex flex-col justify-between items-end py-0.5">
          <button
            onClick={() => removeItem(item.id)}
            className="text-gray-300 hover:text-gray-900 transition-colors text-xs"
            aria-label="삭제"
          >
            ✕
          </button>
          <p className="text-xs text-gray-900 tabular-nums">
            {(item.price * item.quantity).toLocaleString("ko-KR")}원
          </p>
        </div>
      </div>
    </div>
  );
}
