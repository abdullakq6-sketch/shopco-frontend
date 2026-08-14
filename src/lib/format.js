<<<<<<< HEAD
/** Prices travel over the API in cents. */
=======
>>>>>>> 6b0aef3c01bcc7479348ee62034be9756067b937
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
