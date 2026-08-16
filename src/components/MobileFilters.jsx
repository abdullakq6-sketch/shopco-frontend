import React from "react";
import FilterSidebar from "./FilterSidebar";

export default function MobileFilters({
  open,
  onClose,
  filters,
  setFilters,
  minPrice,
  maxPrice,
  onApply,
}) {
  if (!open) return null;

  return (
    <div className="mobile-filter-overlay">
      <div className="mobile-filter-panel">
        <div className="mobile-filter-header">
          <h3>Filters</h3>

          <button onClick={onClose} className="close-filter">
            ×
          </button>
        </div>

        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onApply={() => {
            onApply?.();
            onClose();
          }}
        />
      </div>
    </div>
  );
}