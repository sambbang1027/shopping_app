# 🛍️ ShopApp — Next.js 풀스택 쇼핑몰

Next.js App Router 기반의 풀스택 쇼핑몰 프로젝트입니다.  
상품 탐색부터 장바구니, 주문 결제, 마이페이지, 관리자 백오피스까지 커머스 전 사이클을 구현합니다.

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 16.2.6 (App Router) |
| UI | React 19, TailwindCSS 4, Shadcn UI |
| 상태 관리 | Zustand 5 (장바구니), TanStack Query 5 (서버 상태) |
| 인증 | NextAuth.js v5 (Auth.js) |
| ORM / DB | Prisma 7, PostgreSQL |
| 폼 / 검증 | React Hook Form 7, Zod 4 |
| 아이콘 | lucide-react |

---

## 주요 기능

- **상품 목록** — 카테고리 필터, 할인율·배송 정보 표시
- **상품 상세** — 이미지, 재고 확인, 장바구니 담기
- **장바구니** — 수량 조절, 총 금액 실시간 계산 (클라이언트 상태)
- **주문 / 결제** — 배송지 입력, Prisma 트랜잭션으로 주문 저장
- **마이페이지** — 내 주문 내역 및 배송 상태 확인
- **관리자 백오피스** — 상품 등록·수정·삭제, 주문 상태 변경
- **인증** — 이메일/비밀번호 회원가입·로그인, 세션 기반 권한 분리

---

## 폴더 구조

```
src/
├── app/
│   ├── (auth)/login, register   # 인증 페이지
│   ├── products/                # 상품 목록 · 상세
│   ├── cart/                    # 장바구니
│   ├── checkout/                # 주문 결제
│   ├── mypage/                  # 마이페이지
│   ├── admin/                   # 관리자 백오피스
│   └── api/                     # Route Handler (auth, orders, admin)
├── components/
│   ├── products/                # ProductCard, ProductGrid, AddToCartButton
│   ├── cart/                    # CartItem, CartSummary
│   ├── mypage/                  # OrderCard
│   ├── admin/                   # AdminProductTable, ProductRegisterForm, ProductEditForm
│   └── ui/                      # Shadcn 기반 공통 컴포넌트
├── store/                       # Zustand 장바구니 스토어
├── schemas/                     # Zod 스키마 (auth, order)
├── actions/                     # Server Actions
├── lib/                         # Prisma 클라이언트, Auth 설정
└── providers/                   # TanStack Query Provider
prisma/
└── schema.prisma                # DB 스키마 (User, Product, Order, Cart 등)
```

---

## ERD 요약

```
User ──< Order ──< OrderItem >── Product
User ──  Cart  ──< CartItem  >── Product
Order >── SystemCode (주문 상태 공통코드)
```

---

## 시작하기

### 1. 패키지 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env` 파일을 생성하고 아래 값을 채웁니다.

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
AUTH_SECRET="your-secret-key"
```

### 3. DB 마이그레이션

```bash
npx prisma migrate dev --name init
```

### 4. 개발 서버 실행

```bash
npm run dev
```

---

## 주요 명령어

```bash
npm run dev          # 개발 서버 실행 (http://localhost:3000)
npm run build        # 프로덕션 빌드
npx prisma studio    # Prisma GUI — DB 데이터 웹으로 관리
npx prisma migrate dev --name <name>  # 스키마 변경 후 마이그레이션
```

---

## 권한 구조

| 역할 | 접근 가능 페이지 |
|------|----------------|
| 비로그인 | `/`, `/products`, `/products/[id]`, `/login`, `/register` |
| 일반 회원 | 위 + `/cart`, `/checkout`, `/mypage` |
| 관리자 (`role: admin`) | 위 + `/admin` |
