import { Link } from "react-router-dom";
import { RatingRow } from "@/components/Stars";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="aspect-square w-full overflow-hidden rounded-[13px] bg-[#F0EEED] sm:rounded-[20px]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <h3 className="mt-3 truncate text-base font-bold sm:mt-4 sm:text-xl">{product.name}</h3>
      <div className="mt-1 sm:mt-2">
        <RatingRow rating={product.rating} size={16} />
      </div>
      <div className="mt-1 flex items-center gap-2 sm:mt-2 sm:gap-[10px]">
        <span className="text-xl font-bold sm:text-2xl">{formatPrice(product.price)}</span>
        {product.comparePrice ? (
          <span className="text-xl font-bold text-black/30 line-through sm:text-2xl">
            {formatPrice(product.comparePrice)}
          </span>
        ) : null}
        {product.discountPercent ? (
          <span className="rounded-full bg-[#FF3333]/10 px-2.5 py-1.5 text-[10px] font-medium text-[#FF3333] sm:text-xs">
            -{product.discountPercent}%
          </span>
        ) : null}
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square w-full rounded-[20px] bg-[#F0EEED]" />
      <div className="mt-4 h-5 w-3/4 rounded bg-[#F0EEED]" />
      <div className="mt-2 h-4 w-1/2 rounded bg-[#F0EEED]" />
      <div className="mt-2 h-6 w-1/3 rounded bg-[#F0EEED]" />
    </div>
  );
}
