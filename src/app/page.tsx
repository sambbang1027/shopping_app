import Image from "next/image";
import Link from "next/link";

const LOOKBOOK = [
  "/images/lookbook/01.jpg",
  "/images/lookbook/02.jpg",
  "/images/lookbook/03.jpg",
  "/images/lookbook/04.jpg",
  "/images/lookbook/05.jpg",
];

export default function HomePage() {
  return (
    <div className="-my-8 ml-[calc(-50vw+50%)] w-screen">
      {/* ── Hero ── */}
      <div className="h-[calc(100vh-4rem)] bg-[#f5f5f5] flex items-stretch">
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

      {/* ── Lookbook ── */}
      <section className="bg-white overflow-x-hidden">
        <div className="px-10 pt-16 pb-10">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400">
            2026 S/S Lookbook
          </p>
        </div>

        {/* 상단: 2장 겹침 */}
        <div className="px-16">
          <div className="w-[38%]">
            <div className="relative w-[80%] aspect-[3/4] overflow-hidden">
              <Image src={LOOKBOOK[0]} alt="Lookbook 01" fill className="object-cover" sizes="30vw" />
            </div>
            <div className="relative w-[80%] aspect-[3/4] overflow-hidden -mt-[28%] ml-auto">
              <Image src={LOOKBOOK[1]} alt="Lookbook 02" fill className="object-cover" sizes="30vw" />
            </div>
          </div>
        </div>

        {/* 하단: 3장 불규칙 배치 */}
        <div className="relative h-[44vw] mt-20">
          <div className="absolute w-[20%] aspect-[3/4] overflow-hidden left-[8%] top-[14%]">
            <Image src={LOOKBOOK[2]} alt="Lookbook 03" fill className="object-cover" sizes="20vw" />
          </div>
          <div className="absolute w-[20%] aspect-[3/4] overflow-hidden left-[33%] top-0">
            <Image src={LOOKBOOK[3]} alt="Lookbook 04" fill className="object-cover" sizes="20vw" />
          </div>
          <div className="absolute w-[20%] aspect-[3/4] overflow-hidden left-[61%] top-[22%]">
            <Image src={LOOKBOOK[4]} alt="Lookbook 05" fill className="object-cover" sizes="20vw" />
          </div>
        </div>

        <div className="pb-28" />
      </section>
    </div>
  );
}
