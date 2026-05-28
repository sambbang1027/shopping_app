import Image from "next/image";

export default function HomePage() {
  return (
    <div className="-mx-4 -my-8 min-h-[calc(100vh-64px)] relative bg-[#f5f5f5]">
      <Image
        src="/images/banner.png"
        alt="ShopApp"
        fill
        priority
        className="object-contain"
      />
    </div>
  );
}
