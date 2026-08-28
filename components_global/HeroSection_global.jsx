import Link from "next/link";

export default function HeroSection_global() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 font-sans text-slate-100">
      
      {/* Background Subtle Glows */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-purple-600/15 blur-3xl" />
      <div className="absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-pink-600/15 blur-3xl" />
      <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-cyan-600/15 blur-3xl" />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
        
        {/* Main Header */}
        <div className="mb-12 space-y-3">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            إختار موقع من <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">مواقعنا</span>
          </h1>
        </div>

        {/* Portal Options Grid */}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          
          {/* Threads Card */}
          <Link
            href="/threads"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 text-right backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:bg-slate-900/90 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
          >
            <div className="space-y-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white transition-colors group-hover:text-purple-400">
                Threads
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                مجتمع المناقشات. شارك أفكارك وتواصل مع باقي المستخدمين في الوقت الفعلي.
              </p>
            </div>
            
            <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-purple-400 group-hover:translate-x-[-4px] transition-transform duration-300">
              <span>انتقل إلى مجتمع Threads</span>
              <span>&larr;</span>
            </div>
          </Link>

          {/* Shop Card */}
          <Link
            href="/shop"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 text-right backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:bg-slate-900/90 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
          >
            <div className="space-y-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white transition-colors group-hover:text-cyan-400">
                Shop
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                المتجر الإلكتروني. تصفح أحدث المنتجات والعروض ,وبيع واشترِ بسهولة وأمان.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-cyan-400 group-hover:translate-x-[-4px] transition-transform duration-300">
              <span>تصفح المتجر الآن</span>
              <span>&larr;</span>
            </div>
          </Link>

          {/* Quiz Card */}
          <Link
            href="/quiz"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 text-right backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/50 hover:bg-slate-900/90 hover:shadow-[0_0_30px_rgba(236,72,153,0.2)] sm:col-span-2 lg:col-span-1"
          >
            <div className="space-y-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/20 group-hover:bg-pink-600 group-hover:text-white transition-colors duration-300">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white transition-colors group-hover:text-pink-400">
                Quiz
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                منصة الاختبارات. اختبر معلوماتك، تحدَّ أصدقاءك، واكتشف مستواك بشكل تفاعلي ممتع.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-pink-400 group-hover:translate-x-[-4px] transition-transform duration-300">
              <span>ابدأ الاختبارات الآن</span>
              <span>&larr;</span>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}