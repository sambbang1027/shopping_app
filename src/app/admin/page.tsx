import { prisma } from "@/lib/db";
import { AdminProductTable } from "@/components/admin/AdminProductTable";

export default async function AdminPage() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      category: true,
      price: true,
      stock: true,
      imageUrl: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">관리자 대시보드</h1>
      <AdminProductTable products={products} />
    </div>
  );
}
