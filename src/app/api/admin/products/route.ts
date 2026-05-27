import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { productSchema } from "@/schemas/product.schema";

export async function POST(request: NextRequest) {
  // ── 1. 관리자 권한 확인 ────────────────────────────
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "로그인이 필요합니다" }, { status: 401 });
  }
  if ((session.user as any).role !== "admin") {
    return NextResponse.json({ error: "관리자 권한이 필요합니다" }, { status: 403 });
  }

  // ── 2. 요청 바디 파싱 및 유효성 검사 ──────────────
  const body = await request.json();
  const result = productSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "입력값이 올바르지 않습니다", details: result.error.flatten() },
      { status: 400 },
    );
  }

  const { name, description, price, stock, category, imageUrl } = result.data;

  // ── 3. 상품 등록 ───────────────────────────────────
  try {
    const product = await prisma.product.create({
      data: {
        name,
        description: description || null,
        price,
        stock,
        category: category || null,
        imageUrl: imageUrl || null,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("상품 등록 실패:", error);
    return NextResponse.json(
      { error: "상품 등록 중 오류가 발생했습니다" },
      { status: 500 },
    );
  }
}
