"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductRegisterForm } from "./ProductRegisterForm";
import { ProductEditForm } from "./ProductEditForm";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  price: number;
  stock: number;
  imageUrl: string | null;
}

interface AdminProductTableProps {
  products: Product[];
}

export function AdminProductTable({ products }: AdminProductTableProps) {
  const router = useRouter();
  const [registerOpen, setRegisterOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Product | null>(null);

  const handleDelete = async (product: Product) => {
    if (!confirm(`"${product.name}"을(를) 삭제하시겠습니까?`)) return;

    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "삭제 중 오류가 발생했습니다");
        return;
      }

      router.refresh();
    } catch {
      alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      {/* 섹션 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">상품 목록</h2>

        {/* 상품 등록 Dialog */}
        <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus />
              상품 등록
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>상품 등록</DialogTitle>
            </DialogHeader>
            <ProductRegisterForm onSuccess={() => setRegisterOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* 상품 수정 Dialog */}
      <Dialog
        open={!!editTarget}
        onOpenChange={(open) => { if (!open) setEditTarget(null); }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>상품 수정</DialogTitle>
          </DialogHeader>
          {editTarget && (
            <ProductEditForm
              product={editTarget}
              onSuccess={() => setEditTarget(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* 상품 테이블 */}
      {products.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          등록된 상품이 없습니다.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 font-medium">
              <tr>
                <th className="text-left px-4 py-3">상품명</th>
                <th className="text-left px-4 py-3">카테고리</th>
                <th className="text-right px-4 py-3">가격</th>
                <th className="text-right px-4 py-3">재고</th>
                <th className="text-center px-4 py-3">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {product.category ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-900">
                    {product.price.toLocaleString("ko-KR")}원
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={
                        product.stock === 0
                          ? "text-red-500 font-medium"
                          : "text-gray-700"
                      }
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditTarget(product)}
                      >
                        <Pencil />
                        수정
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(product)}
                      >
                        <Trash2 />
                        삭제
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
