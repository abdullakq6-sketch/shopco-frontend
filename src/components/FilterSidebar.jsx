import React from "react";

const COLORS = [
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#FFA500",
  "#FFFF00",
  "#00FF00",
  "#0000FF",
  "#8000FF",
  "#FFC0CB",
];

const SIZES = ["Small", "Medium", "Large", "X-Large"];

export default function FilterSidebar({
  filters,
  setFilters,
  minPrice = 0,
  maxPrice = 50000,
  onApply,
}) {
  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleValue = (key, value) => {
    setFilters((prev) => {
      const current = prev[key] || [];

      return {
        ...prev,
        [key]: current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
  };

  return (
    <aside className="filter-sidebar">
      <div className="filter-title-row">
        <h3>Filters</h3>
        <span>⚙</span>
      </div>

      <div className="filter-section">
        <h4>Category</h4>

        {["T-shirts", "Shorts", "Shirts", "Hoodies", "Jeans"].map(
          (category) => (
            <button
              key={category}
              className="filter-link"
              onClick={() => toggleValue("categories", category)}
            >
              <span>{category}</span>
              <span>›</span>
            </button>
          )
        )}
      </div>

      <div className="filter-section">
        <h4>Price</h4>

        <div className="price-values">
          <span>${filters.priceMin}</span>
          <span>${filters.priceMax}</span>
        </div>

        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={filters.priceMin}
          onChange={(e) =>
            updateFilter("priceMin", Number(e.target.value))
          }
        />

        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={filters.priceMax}
          onChange={(e) =>
            updateFilter("priceMax", Number(e.target.value))
          }
        />
      </div>

      <div className="filter-section">
        <h4>Colors</h4>

        <div className="color-options">
          {COLORS.map((color) => (
            <button
              key={color}
              type="button"
              className={`color-circle ${
                filters.colors.includes(color) ? "selected" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => toggleValue("colors", color)}
              aria-label={`Color ${color}`}
            />
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Size</h4>

        <div className="size-options">
          {SIZES.map((size) => (
            <button
              key={size}
              type="button"
              className={
                filters.sizes.includes(size) ? "size-btn active" : "size-btn"
              }
              onClick={() => toggleValue("sizes", size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Dress Style</h4>

        {["Casual", "Formal", "Party", "Gym"].map((style) => (
          <button
            key={style}
            className={
              filters.style === style.toLowerCase()
                ? "style-btn active"
                : "style-btn"
            }
            onClick={() =>
              updateFilter("style", style.toLowerCase())
            }
          >
            {style}
            <span>›</span>
          </button>
        ))}
      </div>

      <button className="apply-filter-btn" onClick={onApply}>
        Apply Filter
      </button>
    </aside>
  );
}