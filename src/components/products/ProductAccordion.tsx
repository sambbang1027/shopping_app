"use client";

import { useState } from "react";

interface Props {
  description: string | null;
}

export function ProductAccordion({ description }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  const items = [
    {
      title: "Details",
      content: description || "상품 상세 정보가 없습니다.",
    },
    {
      title: "Material & Care",
      content: "소재: 울 60%, 폴리에스터 40%\n세탁: 드라이클리닝 권장\n원산지: Made in Korea",
    },
    {
      title: "Shipping & Returns",
      content:
        "국내 배송: 결제 후 1–3 영업일 이내 출고\n무료 반품: 수령 후 7일 이내\n교환: 동일 상품 재고 있을 경우 가능",
    },
  ];

  return (
    <div className="border-t border-gray-100">
      {items.map((item, i) => (
        <div key={i} className="border-b border-gray-100">
          <button
            className="w-full flex items-center justify-between py-4 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="text-[11px] tracking-[0.3em] uppercase text-gray-700">
              {item.title}
            </span>
            <span className="text-gray-400 text-base leading-none">
              {open === i ? "−" : "+"}
            </span>
          </button>
          {open === i && (
            <div className="pb-5 text-xs text-gray-500 leading-relaxed whitespace-pre-line">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
