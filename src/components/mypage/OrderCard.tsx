import Image from "next/image";

const STATUS_COLOR: Record<string, string> = {
  PENDING: "text-gray-400",
  PAID: "text-blue-500",
  SHIPPING: "text-purple-500",
  DONE: "text-green-600",
};

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: { name: string; imageUrl: string | null } | null;
}

interface Order {
  id: string;
  totalPrice: number;
  createdAt: string;
  status: { code: string; label: string };
  orderItems: OrderItem[];
}

export function OrderCard({ order }: { order: Order }) {
  const statusColor = STATUS_COLOR[order.status.code] ?? "text-gray-400";
  const orderDate = new Date(order.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="border-t border-gray-100 pt-6 pb-8 space-y-5">
      {/* 주문 헤더 */}
      <div className="flex items-baseline justify-between">
        <div className="space-y-0.5">
          <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400">
            {orderDate}
          </p>
          <p className="text-[10px] text-gray-300 font-mono">
            #{order.id.slice(0, 8).toUpperCase()}
          </p>
        </div>
        <span className={`text-[10px] tracking-[0.25em] uppercase font-medium ${statusColor}`}>
          {order.status.label}
        </span>
      </div>

      {/* 주문 상품 목록 */}
      <div className="space-y-4">
        {order.orderItems.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div
              className="relative w-14 flex-shrink-0 bg-gray-50 overflow-hidden"
              style={{ aspectRatio: "3/4" }}
            >
              {item.product?.imageUrl ? (
                <Image
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-300 text-[9px]">
                  —
                </div>
              )}
            </div>
            <div className="flex flex-1 justify-between items-start pt-0.5">
              <div>
                <p className="text-xs text-gray-900 leading-snug">
                  {item.product?.name ?? "삭제된 상품"}
                </p>
                <p className="text-[10px] text-gray-400 mt-1">Qty {item.quantity}</p>
              </div>
              <p className="text-xs text-gray-900 tabular-nums">
                {(item.price * item.quantity).toLocaleString("ko-KR")}원
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 총 금액 */}
      <div className="flex justify-between items-baseline pt-2 border-t border-gray-100">
        <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400">Total</span>
        <span className="text-sm font-medium text-gray-900 tabular-nums">
          {order.totalPrice.toLocaleString("ko-KR")}원
        </span>
      </div>
    </div>
  );
}
