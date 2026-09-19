import Image from "next/image";
import Link from "next/link";
import {
  Home,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "404 - الصفحة غير موجودة | Shop",
  description: "عفواً، الصفحة التي تبحث عنها غير موجودة.",
};

export default function NotFound() {
  const imageUrl =
    "https://imgs.search.brave.com/cgHY1Mh_0fagBkQHATdWfm6OopbxxjSoqh61ubB8fLs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM1/OTU2MDkxOC92ZWN0/b3IvNDA0LWVycm9y/LWlzb21ldHJpYy12/ZWN0b3IuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPTRaRUE5/d1dsRzZvVXBHb29X/Z1BPb0VpTHJuT0VF/RE04dnFoSVJxcktY/Ulk9";

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 text-slate-100 font-sans">
      
      {/* Background Subtle Glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-purple-600/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-pink-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-cyan-600/15 blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        {/* Visual Illustration Card */}
        <div className="group relative mb-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-3 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]">
          <div className="relative h-64 w-64 overflow-hidden rounded-2xl sm:h-80 sm:w-80">
            <Image
              src={imageUrl}
              alt="404 Page Not Found"
              fill
              priority
              sizes="(max-width: 640px) 256px, 320px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Subtle inner overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>


        {/* Headings */}
        <h1 className="mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-white">
          عفواً! الصفحة{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            غير متوفرة
          </span>
        </h1>

        <p className="mb-8 max-w-md text-sm sm:text-base text-slate-400 leading-relaxed">
          يبدو أنك كتبت مساراً غير صحيح، أو أن الصفحة التي تبحث عنها تم نقلها أو
          حذفها.
        </p>

        {/* Primary Action Button */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105 hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-500/40 active:scale-95"
          >
            <Home className="h-4 w-4" />
            <span>العودة إلى الصفحة الرئيسية</span>
            <ArrowRight className="h-4 w-4 rotate-180" />
          </Link>
        </div>

   
      </div>
    </main>
  );
}
