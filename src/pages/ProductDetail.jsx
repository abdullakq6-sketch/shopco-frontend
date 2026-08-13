import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { RatingRow, Stars } from "@/components/Stars";
import {
  CheckIcon,
  ChevronDown,
  MinusIcon,
  PlusIcon,
  VerifiedIcon,
} from "@/components/icons";
import { api } from "@/api/client";
import { cx, formatPrice } from "@/lib/format";

const TABS = ["Product Details", "Rating & Reviews", "FAQs"];

const FAQS = [
  {
    q: "What is the delivery time?",
    a: "Standard delivery takes 3-5 working days. Express delivery is next day for orders placed before 4pm.",
  },
  {
    q: "Can I return this item?",
    a: "Yes. You have 30 days from delivery to return any unworn item with its original tags attached.",
  },
  {
    q: "How do I choose the right size?",
    a: "The model is 6'1\" and wears a size Large. If you are between sizes we recommend sizing up for a relaxed fit.",
  },
];

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { add } = useCart();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState("Rating & Reviews");
  const [openFaq, setOpenFaq] = useState(0);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let active = true;
    setData(null);
    api
      .product(slug)
      .then((detail) => {
        if (!active) return;
        setData(detail);
        setColor(detail.product.colors[0] ?? "#4F4631");
        setSize(detail.product.sizes[2] ?? detail.product.sizes[0] ?? "Large");
        setActiveImage(0);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : "Unable to load product");
      });
    return () => {
      active = false;
    };
  }, [slug]);

  const product = data?.product;
  const gallery = useMemo(
    () => (product?.gallery?.length ? product.gallery : product ? [product.image] : []),
    [product],
  );

  async function handleAdd() {
    if (!product) return;
    setAdding(true);
    try {
      await add({ slug: product.slug, size, color, quantity });
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    } finally {
      setAdding(false);
    }
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[1240px] px-4 py-24 text-center">
        <p className="font-display text-3xl">PRODUCT NOT FOUND</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-black px-8 py-3 text-white">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <hr className="border-black/10" />
      <div className="mx-auto max-w-[1240px] px-4">
        <nav className="flex items-center gap-2 py-5 text-sm text-black/60 lg:py-6">
          <Link to="/" className="hover:text-black">
            Home
          </Link>
          <span>&rsaquo;</span>
          <Link to="/" className="hover:text-black">
            Shop
          </Link>
          <span>&rsaquo;</span>
          <span>Men</span>
          <span>&rsaquo;</span>
          <span className="text-black">T-shirts</span>
        </nav>

        {!product ? (
          <div className="grid animate-pulse gap-6 lg:grid-cols-2">
            <div className="h-[400px] rounded-[20px] bg-mist lg:h-[530px]" />
            <div className="space-y-4">
              <div className="h-10 w-3/4 rounded bg-mist" />
              <div className="h-6 w-1/3 rounded bg-mist" />
              <div className="h-24 w-full rounded bg-mist" />
            </div>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-10">
            {/* Gallery */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row lg:gap-3.5">
              <div className="flex gap-3 sm:flex-col lg:gap-3.5">
                {gallery.map((src, index) => (
                  <button
                    key={src + index}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={cx(
                      "h-[106px] w-full overflow-hidden rounded-[13px] bg-mist sm:h-[167px] sm:w-[152px] lg:rounded-[20px]",
                      activeImage === index ? "ring-1 ring-black" : "",
                    )}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
              <div className="flex-1 overflow-hidden rounded-[13px] bg-mist lg:rounded-[20px]">
                <img
                  src={gallery[activeImage] ?? product.image}
                  alt={product.name}
                  className="h-[290px] w-full object-cover sm:h-[530px]"
                />
              </div>
            </div>

            {/* Details */}
            <div>
              <h1 className="font-display text-2xl leading-none sm:text-[40px]">
                {product.name}
              </h1>
              <div className="mt-3 lg:mt-3.5">
                <RatingRow rating={product.rating} size={20} />
              </div>
              <div className="mt-3 flex items-center gap-2.5 lg:mt-3.5">
                <span className="text-2xl font-bold lg:text-[32px]">
                  {formatPrice(product.price)}
                </span>
                {product.comparePrice ? (
                  <span className="text-2xl font-bold text-black/30 line-through lg:text-[32px]">
                    {formatPrice(product.comparePrice)}
                  </span>
                ) : null}
                {product.discountPercent ? (
                  <span className="rounded-full bg-sale/10 px-3.5 py-1.5 text-xs font-medium text-sale lg:text-base">
                    -{product.discountPercent}%
                  </span>
                ) : null}
              </div>
              <p className="mt-5 text-sm text-black/60 lg:text-base">{product.description}</p>

              <hr className="my-6 border-black/10" />

              <p className="text-sm text-black/60 lg:text-base">Select Colors</p>
              <div className="mt-4 flex items-center gap-4">
                {product.colors.map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-label={`Colour ${value}`}
                    onClick={() => setColor(value)}
                    className="flex h-[37px] w-[37px] items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: value }}
                  >
                    {color === value ? <CheckIcon width={18} height={18} /> : null}
                  </button>
                ))}
              </div>

              <hr className="my-6 border-black/10" />

              <p className="text-sm text-black/60 lg:text-base">Choose Size</p>
              <div className="mt-4 flex flex-wrap gap-2 lg:gap-3">
                {product.sizes.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSize(value)}
                    className={cx(
                      "rounded-full px-5 py-2.5 text-sm transition lg:px-6 lg:py-3 lg:text-base",
                      size === value
                        ? "bg-black text-white"
                        : "bg-[#F0F0F0] text-black/60 hover:bg-black/10",
                    )}
                  >
                    {value}
                  </button>
                ))}
              </div>

              <hr className="my-6 border-black/10" />

              <div className="flex items-center gap-3 lg:gap-5">
                <div className="flex h-11 items-center justify-between rounded-full bg-[#F0F0F0] px-4 lg:h-[52px] lg:min-w-[170px] lg:px-5">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  >
                    <MinusIcon width={20} height={20} />
                  </button>
                  <span className="px-5 text-sm font-medium lg:text-base">{quantity}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((value) => Math.min(99, value + 1))}
                  >
                    <PlusIcon width={20} height={20} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={adding}
                  className="h-11 flex-1 rounded-full bg-black text-sm font-medium text-white transition hover:bg-black/85 disabled:opacity-60 lg:h-[52px] lg:text-base"
                >
                  {added ? "Added to Cart ✓" : adding ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="mx-auto mt-12 max-w-[1240px] px-4 lg:mt-20">
        <div className="grid grid-cols-3 border-b border-black/10">
          {TABS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={cx(
                "-mb-px border-b-2 pb-4 text-center text-sm transition lg:text-xl",
                tab === item
                  ? "border-black font-medium text-black"
                  : "border-transparent text-black/60",
              )}
            >
              {item}
            </button>
          ))}
        </div>

        {tab === "Product Details" ? (
          <div className="grid gap-6 py-8 md:grid-cols-2">
            <p className="text-sm text-black/60 lg:text-base">{product?.description}</p>
            <ul className="space-y-3 text-sm lg:text-base">
              <li className="flex justify-between border-b border-black/10 pb-3">
                <span className="text-black/60">Material</span>
                <span className="font-medium">100% Organic Cotton</span>
              </li>
              <li className="flex justify-between border-b border-black/10 pb-3">
                <span className="text-black/60">Fit</span>
                <span className="font-medium">Regular</span>
              </li>
              <li className="flex justify-between border-b border-black/10 pb-3">
                <span className="text-black/60">Care</span>
                <span className="font-medium">Machine wash at 30°</span>
              </li>
              <li className="flex justify-between">
                <span className="text-black/60">Style</span>
                <span className="font-medium capitalize">{product?.style}</span>
              </li>
            </ul>
          </div>
        ) : null}

        {tab === "Rating & Reviews" ? (
          <div className="py-6 lg:py-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xl font-bold lg:text-2xl">
                All Reviews{" "}
                <span className="text-sm font-normal text-black/60">
                  ({product?.reviewCount ?? 0})
                </span>
              </p>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  className="flex h-11 items-center gap-1.5 rounded-full bg-[#F0F0F0] px-5 text-sm font-medium lg:h-12"
                >
                  Latest
                  <ChevronDown width={16} height={16} />
                </button>
                <button
                  type="button"
                  className="h-11 rounded-full bg-black px-5 text-sm font-medium text-white lg:h-12"
                >
                  Write a Review
                </button>
              </div>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2 lg:mt-6">
              {(data?.reviews ?? []).map((review) => (
                <article
                  key={review.id}
                  className="rounded-[20px] border border-black/10 px-6 py-6 lg:px-8 lg:py-7"
                >
                  <Stars rating={review.rating} size={19} />
                  <p className="mt-3 flex items-center gap-1 text-lg font-bold lg:text-xl">
                    {review.author}
                    {review.verified ? (
                      <VerifiedIcon width={20} height={20} className="text-[#01AB31]" />
                    ) : null}
                  </p>
                  <p className="mt-2 text-sm text-black/60 lg:text-base">
                    &ldquo;{review.body}&rdquo;
                  </p>
                  <p className="mt-4 text-sm font-medium text-black/60">
                    Posted on {review.postedAt}
                  </p>
                </article>
              ))}
              {data && data.reviews.length === 0 ? (
                <p className="text-sm text-black/60">No reviews yet for this product.</p>
              ) : null}
            </div>
          </div>
        ) : null}

        {tab === "FAQs" ? (
          <div className="divide-y divide-black/10 py-4">
            {FAQS.map((faq, index) => (
              <div key={faq.q} className="py-5">
                <button
                  type="button"
                  onClick={() => setOpenFaq(index === openFaq ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 text-left text-base font-medium lg:text-lg"
                >
                  {faq.q}
                  <ChevronDown
                    width={20}
                    height={20}
                    className={cx("transition", openFaq === index ? "rotate-180" : "")}
                  />
                </button>
                {openFaq === index ? (
                  <p className="mt-3 text-sm text-black/60 lg:text-base">{faq.a}</p>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Related */}
      <section className="mx-auto max-w-[1240px] px-4 py-12 lg:py-16">
        <h2 className="text-center font-display text-[32px] leading-none lg:text-5xl">
          YOU MIGHT ALSO LIKE
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:mt-12 lg:grid-cols-4 lg:gap-5">
          {data
            ? data.related.map((item) => <ProductCard key={item.slug} product={item} />)
            : Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
        </div>
      </section>
    </div>
  );
}
