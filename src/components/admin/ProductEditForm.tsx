"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormData } from "@/schemas/product.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category: string | null;
  imageUrl: string | null;
}

interface ProductEditFormProps {
  product: Product;
  onSuccess: () => void;
}

export function ProductEditForm({ product, onSuccess }: ProductEditFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      description: product.description ?? "",
      price: product.price,
      stock: product.stock,
      category: product.category ?? "",
      imageUrl: product.imageUrl ?? "",
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "상품 수정 중 오류가 발생했습니다");
        return;
      }

      onSuccess();
      router.refresh();
    } catch {
      alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* 상품명 */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
          상품명 <span className="text-red-500">*</span>
        </label>
        <Input {...register("name")} placeholder="예) 베이직 맨투맨" />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* 설명 */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
          설명
        </label>
        <Input {...register("description")} placeholder="상품 설명 (선택)" />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* 가격 / 재고 */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            가격 (원) <span className="text-red-500">*</span>
          </label>
          <Input
            {...register("price", { valueAsNumber: true })}
            type="number"
            min={1}
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            재고 <span className="text-red-500">*</span>
          </label>
          <Input
            {...register("stock", { valueAsNumber: true })}
            type="number"
            min={0}
          />
          {errors.stock && (
            <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>
          )}
        </div>
      </div>

      {/* 카테고리 */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
          카테고리
        </label>
        <Input {...register("category")} placeholder="예) 상의, 하의, 아우터" />
        {errors.category && (
          <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
        )}
      </div>

      {/* 이미지 URL */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
          이미지 URL
        </label>
        <Input
          {...register("imageUrl")}
          placeholder="https://example.com/image.jpg"
        />
        {errors.imageUrl && (
          <p className="text-red-500 text-xs mt-1">{errors.imageUrl.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" disabled={isSubmitting} className="min-w-24">
          {isSubmitting ? "저장 중..." : "저장하기"}
        </Button>
      </div>
    </form>
  );
}
