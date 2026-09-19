"use client";

import Link from "next/link";

export default function Navbar_shop() {
  return (
    <nav className="p-4 flex items-center justify-between sticky top-0 z-50 w-full backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/80 transition-all dir-rtl">
      <div className="flex items-end gap-4">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-white hover:opacity-90 transition-opacity"
        >
          دهب <span className="text-amber-400">للتسويق</span>
        </Link>
      </div>
      <Link href={"/categories"} className="text-white hover:text-amber-400 transition-colors">
        التصنيفات
      </Link>
      <Link href={"/add-product"} className="text-white hover:text-amber-400 transition-colors">
        أضف منتج
      </Link>
    </nav>
  );
}
