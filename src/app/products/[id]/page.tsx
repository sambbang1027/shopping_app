import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { ProductAccordion } from "@/components/products/ProductAccordion";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  const discountRate = (product.name.length % 30) + 10;
  const originalPrice = Math.floor(product.price / (1 - discountRate / 100));

  return (
    <div className="max-w-5xl mx-auto">
      {/* 브레드크럼 */}
      <nav className="flex items-center gap-2 mb-10 text-[10px] tracking-[0.25em] uppercase text-gray-400">
        <Link href="/products" className="hover:text-gray-900 transition-colors">
          Products
        </Link>
        {product.category && (
          <>
            <span>/</span>
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="hover:text-gray-900 transition-colors"
            >
              {product.category}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-gray-900 truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
        {/* 상품 이미지 */}
        <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-300 text-xs tracking-widest uppercase">
              No Image
            </div>
          )}
        </div>

        {/* 상품 정보 */}
        <div className="flex flex-col gap-8 py-2">
          {/* 카테고리 + 상품명 */}
          <div>
            {product.category && (
              <p className="text-[10px] tracking-[0.35em] uppercase text-gray-400 mb-3">
                {product.category}
              </p>
            )}
            <h1 className="text-xl font-medium text-gray-900 leading-snug">
              {product.name}
            </h1>
          </div>

          {/* 가격 */}
          <div className="flex items-baseline gap-3">
            <span className="text-sm font-medium text-red-500">{discountRate}%</span>
            <span className="text-xl font-medium text-gray-900">
              {product.price.toLocaleString("ko-KR")}원
            </span>
            <span className="text-sm text-gray-400 line-through">
              {originalPrice.toLocaleString("ko-KR")}원
            </span>
          </div>

          {/* 재고 */}
          <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 -mt-4">
            {product.stock > 0 ? `재고 ${product.stock}개` : "품절"}
          </p>

          {/* 사이즈 선택 + 수량 + 버튼 */}
          {product.stock > 0 ? (
            <AddToCartButton product={product} />
          ) : (
            <button
              disabled
              className="w-full py-4 bg-gray-100 text-gray-400 text-[11px] tracking-[0.3em] uppercase cursor-not-allowed"
            >
              Sold Out
            </button>
          )}

          {/* 아코디언 */}
          <ProductAccordion description={product.description} />
        </div>
      </div>
    </div>
  );
}
