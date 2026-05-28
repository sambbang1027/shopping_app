import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#f5f5f5] flex">
      {/* 왼쪽 */}
      <div className="w-1/4 flex flex-col justify-between pt-24 pb-12 px-10">
        <div className="space-y-2">
          <p className="text-[10px] tracking-[0.3em] uppercase text-gray-500">
            Clot Studio
          </p>
          <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400">
            Est. 2026
          </p>
        </div>

        <p className="[writing-mode:vertical-rl] rotate-180 text-[9px] tracking-[0.4em] uppercase text-gray-300 self-start">
          Fashion · Lifestyle · Culture
        </p>

        <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400">
          Seoul, Korea
        </p>
      </div>

      {/* 가운데 — 메인 이미지 */}
      <div className="relative w-1/2">
        <Image
          src="/images/banner.png"
          alt="Clot Studio"
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* 오른쪽 */}
      <div className="w-1/4 flex flex-col justify-between pt-24 pb-12 px-10 text-right">
        <div className="space-y-2">
          <p className="text-[10px] tracking-[0.3em] uppercase text-gray-500">
            2026 S/S
          </p>
          <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400">
            New Collection
          </p>
        </div>

        <Link
          href="/products"
          className="text-[10px] tracking-[0.3em] uppercase text-gray-500 hover:text-gray-900 transition-colors self-end"
        >
          View All →
        </Link>

        <p className="text-[9px] tracking-[0.4em] uppercase text-gray-300">
          ↓ Scroll
        </p>
      </div>
    </div>
  );
}
