import { useRef } from "react";
import { Stars } from "@/components/Stars";
import { ArrowLeftSmall, ArrowRightSmall, VerifiedIcon } from "@/components/icons";

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    rating: 5,
    quote:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    name: "Alex K.",
    rating: 5,
    quote:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    name: "James L.",
    rating: 5,
    quote:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    name: "Mooen",
    rating: 5,
    quote:
      "The checkout was smooth and delivery arrived two days early. The fit guide was spot on, which almost never happens when I shop online.",
  },
];

export function Testimonials() {
  const scroller = useRef(null);

  const scrollBy = (direction) => {
    scroller.current?.scrollBy({ left: direction * 420, behavior: "smooth" });
  };

  return (
    <section className="py-8 lg:py-12">
      <div className="mx-auto flex max-w-[1240px] items-end justify-between px-4">
        <h2 className="max-w-[80%] font-display text-[32px] leading-none lg:text-5xl">
          OUR HAPPY CUSTOMERS
        </h2>
        <div className="flex items-center gap-4 pb-1">
          <button type="button" aria-label="Previous" onClick={() => scrollBy(-1)}>
            <ArrowLeftSmall width={24} height={24} />
          </button>
          <button type="button" aria-label="Next" onClick={() => scrollBy(1)}>
            <ArrowRightSmall width={24} height={24} />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 lg:mt-10 lg:gap-5"
      >
        <div className="hidden shrink-0 lg:block lg:w-[calc((100vw-1240px)/2)]" />
        {TESTIMONIALS.map((item) => (
          <figure
            key={item.name}
            className="min-h-[220px] w-[85vw] shrink-0 snap-start rounded-[20px] border border-black/10 px-8 py-7 sm:w-[400px]"
          >
            <Stars rating={item.rating} size={19} />
            <figcaption className="mt-3 flex items-center gap-1 text-lg font-bold lg:text-xl">
              {item.name}
              <VerifiedIcon width={20} height={20} className="text-[#01AB31]" />
            </figcaption>
            <blockquote className="mt-2 text-sm text-black/60 lg:text-base">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
}
