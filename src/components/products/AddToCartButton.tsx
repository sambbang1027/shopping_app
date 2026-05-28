"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

const SIZES = ["XS", "S", "M", "L", "XL"];

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
}

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem(
      { id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl },
      quantity,
    );
    alert(`"${product.name}" (${selectedSize}) ${quantity}개를 장바구니에 담았습니다.`);
  };

  return (
    <div className="space-y-6">
      {/* 사이즈 */}
      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-3">Size</p>
        <div className="flex gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-11 h-11 text-xs tracking-wider border transition-colors ${
                selectedSize === size
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-200 text-gray-500 hover:border-gray-900 hover:text-gray-900"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* 수량 */}
      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-3">Quantity</p>
        <div className="flex items-center border border-gray-200 w-fit">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
          >
            −
          </button>
          <span className="w-10 h-10 flex items-center justify-center text-sm text-gray-900 border-x border-gray-200">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* 장바구니 버튼 */}
      <button
        onClick={handleAddToCart}
        disabled={!selectedSize}
        className={`w-full py-4 text-[11px] tracking-[0.3em] uppercase transition-colors ${
          selectedSize
            ? "bg-gray-900 text-white hover:bg-gray-700 cursor-pointer"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        {selectedSize ? "Add to Cart" : "Select a Size"}
      </button>
    </div>
  );
}
