"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="py-4 sticky top-0 z-50 w-full backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/80 transition-all dir-rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-white hover:opacity-90 transition-opacity"
        >
          دهب <span className="text-amber-400">للتسويق</span>
        </Link>
      </div>
    </nav>
  );
}
