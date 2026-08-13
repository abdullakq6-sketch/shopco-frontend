import { StarIcon } from "@/components/icons";
import { cx } from "@/lib/format";

export function Stars({ rating, size = 18, className }) {
  return (
    <div className={cx("flex items-center gap-[5px]", className)}>
      {[0, 1, 2, 3, 4].map((index) => {
        const fill = Math.max(0, Math.min(1, rating - index));
        return (
          <StarIcon key={index} fill={fill} width={size} height={size} aria-hidden="true" />
        );
      })}
    </div>
  );
}

export function RatingRow({ rating, size = 18 }) {
  return (
    <div className="flex items-center gap-3">
      <Stars rating={rating} size={size} />
      <span className="text-xs text-black sm:text-sm">
        {rating.toFixed(1)}
        <span className="text-black/60">/5</span>
      </span>
    </div>
  );
}
