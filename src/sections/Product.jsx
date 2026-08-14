import { useSearchParams } from "react-router-dom";
import { ProductSection } from "@/sections/ProductSection";

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const style = searchParams.get("style");

  const styleTitle = style 
    ? `${style.charAt(0).toUpperCase() + style.slice(1)} Style`
    : "All Products";

  return (
    <div className="mx-auto max-w-[1240px] px-4 py-12">
      <h1 className="font-display text-[32px] lg:text-5xl mb-8 text-center">
        {styleTitle}
      </h1>
      <ProductSection 
        title="" 
        section="new-arrivals" 
        style={style} 
        showViewAll={false} 
      />
    </div>
  );
}