import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { productSchema } from "@/schemas/product.schema";

// ── 관리자 권한 공통 체크 ──────────────────────────
async function checkAdmin() {
  const session = await auth();
  if (!session?.user) return { error: "로그인이 필요합니다", status: 401 };
  if ((session.user as any).role !== "admin")
    return { error: "관리자 권한이 필요합니다", status: 403 };
  return { session };
}

// ── PUT /api/admin/products/[id]: 상품 수정 ────────
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const check = await checkAdmin();
  if ("error" in check)
    return NextResponse.json({ error: check.error }, { status: check.status });

  const { id } = await params;
  const body = await request.json();
  const result = productSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "입력값이 올바르지 않습니다", details: result.error.flatten() },
      { status: 400 },
    );
  }

  const { name, description, price, stock, category, imageUrl } = result.data;

  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description: description || null,
        price,
        stock,
        category: category || null,
        imageUrl: imageUrl || null,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error("상품 수정 실패:", error);
    return NextResponse.json(
      { error: "상품 수정 중 오류가 발생했습니다" },
      { status: 500 },
    );
  }
}

// ── DELETE /api/admin/products/[id]: 상품 삭제 ─────
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const check = await checkAdmin();
  if ("error" in check)
    return NextResponse.json({ error: check.error }, { status: check.status });

  const { id } = await params;

  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: "삭제되었습니다" });
  } catch (error) {
    console.error("상품 삭제 실패:", error);
    return NextResponse.json(
      { error: "상품 삭제 중 오류가 발생했습니다" },
      { status: 500 },
    );
  }
}
