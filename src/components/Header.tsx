import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { SignOutButton } from "./SignOutButton";
import { CartBadge } from "./CartBadge";

export async function Header() {
  const session = await auth();

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/Clot.png"
            alt="Clot Studio"
            width={60}
            height={30}
            className="h-5 w-auto object-contain"
            priority
          />
        </Link>

        {/* 네비게이션 */}
        <nav className="flex items-center gap-8">
          <Link
            href="/products"
            className="text-xs tracking-widest uppercase text-gray-500 hover:text-gray-900 transition-colors"
          >
            Products
          </Link>
          <CartBadge userId={session?.user?.id} />
          {session?.user?.role === "admin" && (
            <Link
              href="/admin"
              className="text-xs tracking-widest uppercase text-gray-500 hover:text-gray-900 transition-colors"
            >
              Admin
            </Link>
          )}
        </nav>

        {/* 인증 영역 */}
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link
                href="/mypage"
                className="text-xs tracking-widest uppercase text-gray-500 hover:text-gray-900 transition-colors"
              >
                {session.user?.name}
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-xs tracking-widest uppercase text-gray-500 hover:text-gray-900 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-xs tracking-widest uppercase border border-gray-900 text-gray-900 px-4 py-2 hover:bg-gray-900 hover:text-white transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
