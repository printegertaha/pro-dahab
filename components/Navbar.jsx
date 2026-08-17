"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "اختبار النظام", href: "/test" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/80 transition-all dir-rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* الشعار / اللوجو */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-xl font-extrabold tracking-tight text-white hover:opacity-90 transition-opacity"
            >
              دهب <span className="text-amber-400">للتسويق</span>
            </Link>
          </div>

          {/* روابط التصفح */}
          <nav className="flex items-center gap-1  sm:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg  text-xs font-medium transition-all duration-200 relative ${
                    isActive
                      ? "text-amber-400 bg-amber-400/10 font-semibold"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60"
                  }`}
                >
                  {link.name}
                  {/* إضاءة سفلى للينك المفعّل */}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-2 h-0.5 bg-amber-400 rounded-full shadow-[0_0_8px_#fbbf24]" />
                  )}
                </Link>
              );
            })}
          </nav>

        </div>
      </div>
    </header>
  );
}