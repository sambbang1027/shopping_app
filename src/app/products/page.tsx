import { prisma } from "@/lib/db";
import { ProductGrid } from "@/components/products/ProductGrid";

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { category } = await searchParams;

  // await new Promise((resolve) => setTimeout(resolve, 3000)); // ← 이 줄 추가

  // category 값이 있으면 해당 카테고리만, 없으면 전체 상품 조회
  // URL: /products → category = undefined → 전체
  // URL: /products?category=상의 → category = "상의" → 상의만
  const products = await prisma.product.findMany({
    where: category ? { category } : undefined,
    orderBy: { createdAt: "desc" },
  });

  // 카테고리 필터 버튼 목록을 만들기 위해 DB에 존재하는 카테고리만 동적으로 조회
  // select: category 컬럼만 가져옴 (id, name 등 불필요한 컬럼 제외)
  // distinct: 중복 제거 (상의가 여러 개여도 "상의" 하나만 반환)
  // where: category가 null인 상품은 제외
  const categories = await prisma.product.findMany({
    select: { category: true },
    distinct: ["category"],
    where: { category: { not: null } },
  });

  // Prisma가 반환한 객체 배열 [{ category: "상의" }, ...]에서 문자열 배열 ["상의", ...]로 변환
  // filter(Boolean): null/undefined가 섞여 있을 경우 제거, as string[]로 타입 단언
  const categoryList = categories
    .map((p) => p.category)
    .filter(Boolean) as string[];

  return (
    <div>
      <h1 className="text-[11px] tracking-[0.4em] uppercase text-gray-400 mb-10">
        Products
      </h1>

      {/* 카테고리 필터 */}
      <div className="flex items-center gap-8 mb-12 border-b border-gray-100">
        <a
          href="/products"
          className={`pb-3 text-[11px] tracking-[0.25em] uppercase transition-colors border-b -mb-px ${
            !category
              ? "border-gray-900 text-gray-900"
              : "border-transparent text-gray-400 hover:text-gray-900"
          }`}
        >
          All
        </a>
        {categoryList.map((cat) => (
          <a
            key={cat}
            href={`/products?category=${encodeURIComponent(cat)}`}
            className={`pb-3 text-[11px] tracking-[0.25em] uppercase transition-colors border-b -mb-px ${
              category === cat
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-400 hover:text-gray-900"
            }`}
          >
            {cat}
          </a>
        ))}
      </div>

      {/* 상품 목록 */}
      <ProductGrid products={products} />
    </div>
  );
}
