export function formatPrice(cents) {
  const value = cents / 100;
  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export function cx(...values) {
  return values.filter(Boolean).join(" ");
}
