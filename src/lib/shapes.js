/**
 * JSON shapes returned by the backend, documented with JSDoc so editors still
 * give autocomplete without any TypeScript in the codebase.
 *
 * @typedef {{ id: number, name: string, email: string }} AuthUser
 *
 * @typedef {{
 *   id: number, slug: string, name: string, description: string,
 *   price: number, comparePrice: number|null, discountPercent: number|null,
 *   rating: number, reviewCount: number, image: string,
 *   gallery: string[], colors: string[], sizes: string[],
 *   style: string, section: string
 * }} Product
 *
 * @typedef {{
 *   id: number, author: string, rating: number,
 *   body: string, verified: boolean, postedAt: string
 * }} Review
 *
 * @typedef {{ product: Product, reviews: Review[], related: Product[] }} ProductDetail
 *
 * @typedef {{
 *   id: number, productId: number, slug: string, name: string, image: string,
 *   size: string, color: string, quantity: number, unitPrice: number, lineTotal: number
 * }} CartLine
 *
 * @typedef {{
 *   items: CartLine[], count: number, subtotal: number,
 *   discount: number, deliveryFee: number, total: number
 * }} Cart
 */

export const EMPTY_CART = {
  items: [],
  count: 0,
  subtotal: 0,
  discount: 0,
  deliveryFee: 0,
  total: 0,
};
