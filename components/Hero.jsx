import TodayDate from "./TodayDate";
import Image from "next/image";

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


      <Image
        src="/bazar-hero.png"
        alt="বাজারের ছবি"
        width={420}
        height={340}
        priority
        className="w-full max-w-78.75 shrink-0 rounded-2xl object-cover"
      />
    </section>
  );
}