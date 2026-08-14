import { BrandStrip, Hero } from "@/sections/Hero";
import { DressStyles } from "@/sections/DressStyles";
import { ProductSection } from "@/sections/ProductSection";
import { Testimonials } from "@/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStrip />
      <ProductSection id="new-arrivals" title="NEW ARRIVALS" section="new-arrivals" />
      <div className="mx-auto max-w-[1240px] px-4">
        <hr className="border-black/10" />
      </div>
      <ProductSection id="top-selling" title="TOP SELLING" section="top-selling" />
      <DressStyles />
      <Testimonials />
    </>
  );
}
