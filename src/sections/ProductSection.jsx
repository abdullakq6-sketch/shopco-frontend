import { useCallback, useEffect, useState } from "react";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { api } from "@/api/client";

export function ProductSection({ id, title, section, showViewAll = true }) {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(false);

  const load = useCallback(() => {
    setError("");
    return api
      .products(expanded ? { limit: 12 } : { section, limit: 4 })
      .then(setProducts)
      .catch((err) => {
        setProducts(null);
        setError(err?.message || "Unable to load products");
      });
  }, [section, expanded]);

  useEffect(() => {
    let active = true;
    api
      .products(expanded ? { limit: 12 } : { section, limit: 4 })
      .then((items) => active && setProducts(items))
      .catch((err) => {
        if (!active) return;
        setProducts(null);
        setError(err?.message || "Unable to load products");
      });
    return () => {
      active = false;
    };
  }, [section, expanded]);

  return (
    <section id={id} className="mx-auto max-w-[1240px] px-4 py-12 lg:py-16">
      <h2 className="text-center font-display text-[32px] leading-none lg:text-5xl">{title}</h2>

      {error ? (
        <div className="mx-auto mt-8 max-w-lg rounded-2xl border border-sale/30 bg-[#FFF4F4] px-6 py-6 text-center">
          <p className="text-sm font-medium text-[#B00000]">{error}</p>
          <button
            type="button"
            onClick={load}
            className="mt-4 h-10 rounded-full bg-black px-6 text-xs font-medium text-white transition hover:bg-black/85"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 lg:mt-12 lg:grid-cols-4 lg:gap-5">
          {products
            ? products.map((product) => <ProductCard key={product.slug} product={product} />)
            : Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
        </div>
      )}

      {showViewAll ? (
        <div className="mt-8 flex justify-center lg:mt-9">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="flex h-11 w-full items-center justify-center rounded-full border border-black/10 px-20 text-sm font-medium transition hover:bg-black hover:text-white sm:w-auto lg:h-[52px] lg:text-base"
          >
            {expanded ? "Show Less" : "View All"}
          </button>
        </div>
      ) : null}
    </section>
  );
}
