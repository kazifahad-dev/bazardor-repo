import TodayDate from "./TodayDate";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-between gap-8 rounded-3xl border border-base-300 bg-base-100 px-4 py-10 md:flex-row md:px-8">
      
      <div className="flex max-w-xl flex-col items-start gap-2">
        <span className="min-h-7 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          <TodayDate />
        </span>
        <h1 className="text-3xl font-bold leading-tight md:text-4xl">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="mt-2">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        
        <a href="#সব-পণ্য" className="btn btn-primary mt-3">
          সব পণ্য দেখুন
        </a>
      </div>

     
      <svg
        viewBox="0 0 315 263"
        className="w-full max-w-[315px] shrink-0"
        aria-hidden="true"
      >
        <ellipse cx="157" cy="238" rx="110" ry="16" fill="#e8efe8" />
        
        <path d="M70 160h175l-12 70q-2 12-14 12H96q-12 0-14-12z" fill="#b45309" />
        <rect x="62" y="150" width="190" height="22" fill="#92400e" />
        
        <circle cx="105" cy="115" r="38" fill="#ef4444" />
        <circle cx="185" cy="105" r="42" fill="#22c55e" />
        <circle cx="215" cy="140" r="22" fill="#f59e0b" />
        <circle cx="160" cy="140" r="20" fill="#f97316" />
        <circle cx="90" cy="140" r="20" fill="#a855f7" />
       
        <path d="M105 77q10-22 28-18M185 63q0-24 18-30" stroke="#16a34a" strokeWidth="6" fill="none" strokeLinecap="round" />
      </svg>
    </section>
  );
}