import { Suspense } from "react";
import Marquee from "@/components/Marquee";
import Banner from "@/components/Banner";
import Products from "@/components/products/products";

function MarqueeFallback() {
  return (
    <div
      aria-busy="true"
      aria-label="বাজারের দাম লোড হচ্ছে"
      className="h-10 border-b border-gray-200 bg-[#fafcfa]"
    />
  );
}

function ProductsFallback() {
  return (
    <section
      aria-busy="true"
      aria-label="পণ্যের দাম লোড হচ্ছে"
      className="mx-auto my-8 w-full max-w-6xl space-y-8 px-4"
    >
      {[0, 1, 2].map((section) => (
        <div key={section}>
          <div className="mb-4 h-7 w-40 animate-pulse rounded bg-gray-200" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((card) => (
              <div
                key={card}
                className="h-28 animate-pulse rounded-xl border border-gray-200 bg-white"
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default function Home() {
  return (
   <div>
      <Suspense fallback={<MarqueeFallback />}>
        <Marquee/>
      </Suspense>
      <Banner/>
      <Suspense fallback={<ProductsFallback />}>
        <Products/>
      </Suspense>
   </div>
  );
}
