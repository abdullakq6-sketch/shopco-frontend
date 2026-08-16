import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { api } from "@/api/client";

const COLORS = [
  "#00C853",
  "#FF1744",
  "#FFD600",
  "#FF6D00",
  "#00B8D4",
  "#2979FF",
  "#651FFF",
  "#F50057",
  "#FFFFFF",
  "#000000",
];

const SIZES = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
];

const STYLES = ["Casual", "Formal", "Party", "Gym"];

function FilterSidebar({
  price,
  setPrice,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  selectedStyle,
  setSelectedStyle,
  onApply,
  mobile = false,
}) {
  const [open, setOpen] = useState({
    filters: true,
    price: true,
    colors: true,
    size: true,
    dressStyle: true,
  });

  const toggle = (name) => {
    setOpen((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <aside
      className={
        mobile
          ? "w-full rounded-2xl bg-white p-4"
          : "sticky top-24 hidden w-[260px] shrink-0 rounded-2xl border border-black/10 bg-white p-5 lg:block"
      }
    >
      {/* FILTER HEADER */}
      <div
        className="flex cursor-pointer items-center justify-between border-b border-black/10 pb-4"
        onClick={() => toggle("filters")}
      >
        <h2 className="text-lg font-semibold">Filters</h2>

        <span className="text-black/50">
          {open.filters ? "⌃" : "⌄"}
        </span>
      </div>

      {open.filters && (
        <div className="mt-4">
          {/* PRICE */}
          <div className="border-b border-black/10 pb-5">
            <button
              type="button"
              onClick={() => toggle("price")}
              className="flex w-full items-center justify-between"
            >
              <span className="font-medium">Price</span>
              <span className="text-black/50">
                {open.price ? "⌃" : "⌄"}
              </span>
            </button>

            {open.price && (
              <div className="mt-5">
                <input
                  type="range"
                  min="500"
                  max="32000"
                  step="500"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full accent-black"
                />

                <div className="mt-2 flex justify-between text-xs text-black/60">
                  <span>$500</span>
                  <span>${price}</span>
                </div>
              </div>
            )}
          </div>

          {/* COLORS */}
          <div className="border-b border-black/10 py-5">
            <button
              type="button"
              onClick={() => toggle("colors")}
              className="flex w-full items-center justify-between"
            >
              <span className="font-medium">Colors</span>
              <span className="text-black/50">
                {open.colors ? "⌃" : "⌄"}
              </span>
            </button>

            {open.colors && (
              <div className="mt-4 grid grid-cols-8 gap-3">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() =>
                      setSelectedColor(
                        selectedColor === color ? "" : color
                      )
                    }
                    className={`h-6 w-6 rounded-full border transition ${
                      selectedColor === color
                        ? "scale-110 border-black ring-2 ring-black ring-offset-2"
                        : "border-black/10"
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Color ${color}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* SIZE */}
          <div className="border-b border-black/10 py-5">
            <button
              type="button"
              onClick={() => toggle("size")}
              className="flex w-full items-center justify-between"
            >
              <span className="font-medium">Size</span>
              <span className="text-black/50">
                {open.size ? "⌃" : "⌄"}
              </span>
            </button>

            {open.size && (
              <div className="mt-4 flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() =>
                      setSelectedSize(
                        selectedSize === size ? "" : size
                      )
                    }
                    className={`rounded-full px-3 py-2 text-[11px] transition ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-[#F5F5F5] text-black/60 hover:bg-black hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DRESS STYLE */}
          <div className="py-5">
            <button
              type="button"
              onClick={() => toggle("dressStyle")}
              className="flex w-full items-center justify-between"
            >
              <span className="font-medium">Dress Style</span>
              <span className="text-black/50">
                {open.dressStyle ? "⌃" : "⌄"}
              </span>
            </button>

            {open.dressStyle && (
              <div className="mt-3 space-y-3">
                {STYLES.map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() =>
                      setSelectedStyle(
                        selectedStyle === style.toLowerCase()
                          ? ""
                          : style.toLowerCase()
                      )
                    }
                    className={`flex w-full items-center justify-between text-sm ${
                      selectedStyle === style.toLowerCase()
                        ? "font-semibold text-black"
                        : "text-black/60"
                    }`}
                  >
                    <span>{style}</span>
                    <span>›</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* APPLY */}
          <button
            type="button"
            onClick={onApply}
            className="h-11 w-full rounded-full bg-black text-sm font-medium text-white transition hover:bg-black/80"
          >
            Apply Filter
          </button>
        </div>
      )}
    </aside>
  );
}

export default function StyleProductsPage() {
  const { styleName } = useParams();

  const [products, setProducts] = useState(null);
  const [error, setError] = useState("");

  const [price, setPrice] = useState(32000);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");

  const [mobileFilters, setMobileFilters] = useState(false);

  const load = useCallback(() => {
    setError("");
    setProducts(null);

    return api
      .products({
        style: styleName,
        limit: 100,
      })
      .then(setProducts)
      .catch((err) => {
        setProducts(null);
        setError(err?.message || "Unable to load products");
      });
  }, [styleName]);

  useEffect(() => {
    load();
  }, [load]);

  const filteredProducts = useMemo(() => {
    if (!products) return null;

    return products.filter((product) => {
      const priceMatch = Number(product.price || 0) <= price;

      const colorMatch =
        !selectedColor ||
        product.colors?.includes(selectedColor);

      const sizeMatch =
        !selectedSize ||
        product.sizes?.includes(selectedSize);

      const styleMatch =
        !selectedStyle ||
        product.style?.toLowerCase() === selectedStyle;

      return priceMatch && colorMatch && sizeMatch && styleMatch;
    });
  }, [
    products,
    price,
    selectedColor,
    selectedSize,
    selectedStyle,
  ]);

  const title = styleName
    ? styleName.charAt(0).toUpperCase() + styleName.slice(1)
    : "";

  return (
    <section className="mx-auto max-w-[1240px] px-4 py-8 lg:py-12">
      {/* BREADCRUMB */}
      <div className="mb-5 text-xs text-black/50">
        <Link to="/" className="hover:text-black">
          Home
        </Link>

        <span className="mx-2">›</span>

        <span>{title}</span>
      </div>

      {/* MOBILE FILTER BUTTON */}
      <div className="mb-5 flex items-center justify-between lg:hidden">
        <h1 className="font-display text-3xl">
          {title}
        </h1>

        <button
          type="button"
          onClick={() => setMobileFilters(true)}
          className="rounded-full border border-black px-5 py-2 text-sm font-medium"
        >
          Filters
        </button>
      </div>

      {/* DESKTOP TITLE */}
      <div className="mb-8 hidden items-center justify-between lg:flex">
        <h1 className="font-display text-4xl">
          {title}
        </h1>

        <p className="text-sm text-black/50">
          Showing {filteredProducts?.length || 0} Products
        </p>
      </div>

      <div className="flex gap-8">
        {/* DESKTOP SIDEBAR */}
        <FilterSidebar
          price={price}
          setPrice={setPrice}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
          onApply={() => {}}
        />

        {/* PRODUCTS */}
        <div className="min-w-0 flex-1">
          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center">
              <p className="text-sm text-red-600">{error}</p>

              <button
                type="button"
                onClick={load}
                className="mt-4 rounded-full bg-black px-6 py-2 text-sm text-white"
              >
                Try again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
              {filteredProducts ? (
                filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard
                      key={product.slug}
                      product={product}
                    />
                  ))
                ) : (
                  <p className="col-span-full py-16 text-center text-sm text-black/60">
                    No products found.
                  </p>
                )
              ) : (
                Array.from({ length: 8 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {mobileFilters && (
        <div className="fixed inset-0 z-[100] bg-black/40 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-[90%] max-w-[380px] overflow-y-auto bg-white p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Filters
              </h2>

              <button
                type="button"
                onClick={() => setMobileFilters(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border"
              >
                ✕
              </button>
            </div>

            <FilterSidebar
              mobile
              price={price}
              setPrice={setPrice}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
              onApply={() => setMobileFilters(false)}
            />
          </div>
        </div>
      )}
    </section>
  );
}