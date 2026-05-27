import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "상품명은 필수입니다").max(100, "상품명은 100자 이하로 입력해주세요"),
  description: z.string().max(500, "설명은 500자 이하로 입력해주세요").optional(),
  // valueAsNumber: true 옵션으로 RHF가 문자열을 숫자로 변환 후 전달
  price: z
    .number({ message: "가격을 입력해주세요" })
    .int("가격은 정수로 입력해주세요")
    .positive("가격은 0보다 커야 합니다"),
  stock: z
    .number({ message: "재고를 입력해주세요" })
    .int("재고는 정수로 입력해주세요")
    .nonnegative("재고는 0 이상이어야 합니다"),
  category: z.string().max(50).optional(),
  imageUrl: z
    .union([
      z.string().url(),           // https://... 전체 URL
      z.string().startsWith("/"), // /images/... 상대 경로
      z.literal(""),              // 빈 문자열 (미입력)
    ])
    .optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
