import { Link } from "react-router-dom";
import { SparkleIcon } from "@/components/icons";

const STATS = [
  { value: "200+", label: "International Brands" },
  { value: "2,000+", label: "High-Quality Products" },
  { value: "30,000+", label: "Happy Customers" },
];

export function Hero() {
  return (
    <section className="bg-[#F2F0F1]">
      <div className="mx-auto grid max-w-[1240px] gap-0 px-4 lg:grid-cols-2 lg:px-4">
        <div className="pb-10 pt-10 lg:pb-16 lg:pt-24">
          <h1 className="font-display text-[36px] leading-[34px] sm:text-[52px] sm:leading-[52px] lg:text-[64px] lg:leading-[64px]">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="mt-5 max-w-[545px] text-sm text-black/60 lg:mt-8 lg:text-base">
            Browse through our diverse range of meticulously crafted garments, designed to bring
            out your individuality and cater to your sense of style.
          </p>
          <Link
            to="#new-arrivals"
            className="mt-6 flex h-[52px] w-full items-center justify-center rounded-full bg-black px-14 text-sm font-medium text-white transition hover:bg-black/85 lg:mt-8 lg:h-[52px] lg:w-auto lg:max-w-[210px] lg:text-base"
          >
            Shop Now
          </Link>

          <dl className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-center sm:justify-start sm:gap-x-8 sm:text-left lg:mt-12">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={index > 0 ? "sm:border-l sm:border-black/10 sm:pl-8" : undefined}
              >
                <dt className="text-2xl font-bold text-black lg:text-[40px]">{stat.value}</dt>
                <dd className="text-xs text-black/60 lg:text-base">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative -mx-4 lg:mx-0">
          <img
            src="/images/hero.jpg"
            alt="Two models wearing the latest SHOP.CO collection"
            className="h-[448px] w-full object-cover object-top lg:h-full lg:min-h-[663px]"
          />
          <SparkleIcon
            className="absolute right-4 top-6 text-black lg:right-8 lg:top-20"
            width={76}
            height={76}
          />
          <SparkleIcon
            className="absolute left-4 top-40 text-black lg:left-0 lg:top-[46%]"
            width={44}
            height={44}
          />
        </div>
      </div>
    </section>
  );
}

const BRANDS = [
  { name: "VERSACE", className: "font-serif tracking-[0.2em] text-xl lg:text-[33px]" },
  { name: "ZARA", className: "font-serif tracking-tight text-2xl lg:text-[33px]" },
  { name: "GUCCI", className: "font-serif tracking-[0.1em] text-xl lg:text-[33px]" },
  { name: "PRADA", className: "font-serif tracking-[0.15em] text-xl lg:text-[33px]" },
  {
    name: "Calvin Klein",
    className: "font-sans font-light tracking-[0.1em] text-lg lg:text-[28px]",
  },
];

export function BrandStrip() {
  return (
    <div className="bg-black py-9">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-center gap-x-10 gap-y-6 px-4 lg:justify-between">
        {BRANDS.map((brand) => (
          <span key={brand.name} className={`text-white ${brand.className}`}>
            {brand.name}
          </span>
        ))}
      </div>
    </div>
  );
}
