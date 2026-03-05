import Image from "next/image";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-black/8">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <Image
            src="/robin-ikon.svg"
            alt=""
            width={32}
            height={32}
            aria-hidden="true"
          />
          <span
            className="text-petroleum leading-none translate-y-1"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 400, fontSize: "32px" }}
          >
            Robin
          </span>
        </a>
        <CTAButton />
      </div>
    </nav>
  );
}
