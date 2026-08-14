import { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { api } from "@/api/client";

export default function StyleProductsPage() {
  const { styleName } = useParams();
  const [products, setProducts] = useState(null);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    setError("");
    setProducts(null);
    return api
      .products({ style: styleName, limit: 20 })
      .then(setProducts)
      .catch((err) => {
        setProducts(null);
        setError(err?.message || "Unable to load products");
      });
  }, [styleName]);

  useEffect(() => {
    let active = true;
    setError("");
    setProducts(null);
    api
      .products({ style: styleName, limit: 20 })
      .then((items) => active && setProducts(items))
      .catch((err) => {
        if (!active) return;
        setProducts(null);
        setError(err?.message || "Unable to load products");
      });
    return () => {
      active = false;
    };
  }, [styleName]);

  const title = styleName ? styleName.charAt(0).toUpperCase() + styleName.slice(1) : "";

  return (
    <section className="mx-auto max-w-[1240px] px-4 py-12 lg:py-16">
      <div className="mb-6">
        <Link to="/" className="text-sm font-medium text-black/60 hover:text-black">
          &larr; Back to Home
        </Link>
      </div>

      <h1 className="text-center font-display text-[32px] leading-none lg:text-5xl">
        {title} Wear
      </h1>

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
            ? products.length > 0
              ? products.map((product) => <ProductCard key={product.slug} product={product} />)
              : (
                <p className="col-span-full text-center text-sm text-black/60">
                  No products found for "{title}" style.
                </p>
              )
            : Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
        </div>
      )}
    </section>
  );
}