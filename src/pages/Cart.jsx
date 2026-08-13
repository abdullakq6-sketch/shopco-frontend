import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { ArrowRight, MinusIcon, PlusIcon, TrashIcon } from "@/components/icons";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { cart, loading, setQuantity, remove, clear } = useCart();
  const { user, openAuth } = useAuth();
  const [promo, setPromo] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [placed, setPlaced] = useState(false);

  async function updateQuantity(id, quantity) {
    setBusyId(id);
    try {
      await setQuantity(id, quantity);
    } finally {
      setBusyId(null);
    }
  }

  async function handleCheckout() {
    if (!user) {
      openAuth("login");
      return;
    }
    await clear();
    setPlaced(true);
  }

  return (
    <div>
      <hr className="border-black/10" />
      <div className="mx-auto max-w-[1240px] px-4 pb-16">
        <nav className="flex items-center gap-2 py-5 text-sm text-black/60 lg:py-6">
          <Link to="/" className="hover:text-black">
            Home
          </Link>
          <span>&rsaquo;</span>
          <span className="text-black">Cart</span>
        </nav>

        <h1 className="font-display text-[32px] leading-none lg:text-[40px]">YOUR CART</h1>

        {placed ? (
          <div className="mt-6 rounded-[20px] border border-black/10 p-10 text-center">
            <p className="font-display text-2xl lg:text-3xl">ORDER CONFIRMED 🎉</p>
            <p className="mt-3 text-sm text-black/60">
              Thanks for shopping with SHOP.CO. A confirmation email is on its way.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex h-[52px] items-center rounded-full bg-black px-10 text-sm font-medium text-white"
            >
              Continue Shopping
            </Link>
          </div>
        ) : loading ? (
          <div className="mt-6 h-64 animate-pulse rounded-[20px] bg-mist" />
        ) : cart.items.length === 0 ? (
          <div className="mt-6 rounded-[20px] border border-black/10 p-10 text-center">
            <p className="text-lg font-bold">Your cart is empty</p>
            <p className="mt-2 text-sm text-black/60">
              Looks like you have not added anything yet.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex h-[52px] items-center rounded-full bg-black px-10 text-sm font-medium text-white"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_400px] lg:gap-5">
            <div className="rounded-[20px] border border-black/10 px-4 py-1 lg:px-6">
              {cart.items.map((item, index) => (
                <div key={item.id}>
                  {index > 0 ? <hr className="border-black/10" /> : null}
                  <div className="flex gap-3.5 py-4 lg:gap-4 lg:py-5">
                    <Link
                      to={`/product/${item.slug}`}
                      className="h-[99px] w-[99px] shrink-0 overflow-hidden rounded-[9px] bg-mist lg:h-[124px] lg:w-[124px]"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link
                            to={`/product/${item.slug}`}
                            className="text-base font-bold leading-tight lg:text-xl"
                          >
                            {item.name}
                          </Link>
                          <p className="mt-1 text-xs text-black lg:text-sm">
                            Size: <span className="text-black/60">{item.size}</span>
                          </p>
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-black lg:text-sm">
                            Color:
                            <span
                              className="inline-block h-3 w-3 rounded-full border border-black/10"
                              style={{ backgroundColor: item.color }}
                            />
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label={`Remove ${item.name}`}
                          onClick={() => remove(item.id)}
                          className="text-sale transition hover:opacity-70"
                        >
                          <TrashIcon width={20} height={20} />
                        </button>
                      </div>

                      <div className="mt-auto flex items-end justify-between pt-2">
                        <p className="text-xl font-bold lg:text-2xl">
                          {formatPrice(item.lineTotal)}
                        </p>
                        <div className="flex h-8 items-center justify-between rounded-full bg-[#F0F0F0] px-3.5 lg:h-11 lg:min-w-[126px] lg:px-5">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            disabled={busyId === item.id}
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <MinusIcon width={16} height={16} />
                          </button>
                          <span className="px-4 text-sm font-medium">{item.quantity}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            disabled={busyId === item.id}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <PlusIcon width={16} height={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-[20px] border border-black/10 px-5 py-5 lg:px-6 lg:py-6">
              <h2 className="text-xl font-bold lg:text-2xl">Order Summary</h2>
              <dl className="mt-5 space-y-5">
                <div className="flex items-center justify-between">
                  <dt className="text-base text-black/60 lg:text-xl">Subtotal</dt>
                  <dd className="text-base font-bold lg:text-xl">{formatPrice(cart.subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-base text-black/60 lg:text-xl">Discount (-20%)</dt>
                  <dd className="text-base font-bold text-sale lg:text-xl">
                    -{formatPrice(cart.discount)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-base text-black/60 lg:text-xl">Delivery Fee</dt>
                  <dd className="text-base font-bold lg:text-xl">
                    {formatPrice(cart.deliveryFee)}
                  </dd>
                </div>
                <hr className="border-black/10" />
                <div className="flex items-center justify-between">
                  <dt className="text-base lg:text-xl">Total</dt>
                  <dd className="text-xl font-bold lg:text-2xl">{formatPrice(cart.total)}</dd>
                </div>
              </dl>

              <form
                className="mt-5 flex gap-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  setPromoMessage(
                    promo.trim().toUpperCase() === "SHOPCO"
                      ? "Promo code applied!"
                      : "That promo code is not valid.",
                  );
                }} 
              >
                <label className="flex h-12 flex-1 items-center gap-3 rounded-full bg-[#F0F0F0] px-4">
                  <svg
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="shrink-0 text-black/40"
                  >
                    <path d="M20 12a2 2 0 0 1 2-2V7H2v3a2 2 0 0 1 0 4v3h20v-3a2 2 0 0 1-2-2Z" />
                    <path d="M9 9v6" strokeDasharray="2 3" />
                  </svg>
                  <input
                    value={promo}
                    onChange={(event) => setPromo(event.target.value)}
                    placeholder="Add promo code"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-black/40"
                  />
                </label>
                <button
                  type="submit"
                  className="h-12 rounded-full bg-black px-8 text-sm font-medium text-white transition hover:bg-black/85"
                >
                  Apply
                </button>
              </form>
              {promoMessage ? (
                <p className="mt-2 text-xs text-black/60">{promoMessage}</p>
              ) : null}

              <button
                type="button"
                onClick={handleCheckout}
                className="mt-5 flex h-[54px] w-full items-center justify-center gap-3 rounded-full bg-black text-sm font-medium text-white transition hover:bg-black/85 lg:text-base"
              >
                {user ? "Go to Checkout" : "Sign in to Checkout"}
                <ArrowRight width={20} height={20} />
              </button>

              {user ? (
                <p className="mt-3 text-center text-xs text-black/60">
                  Signed in as <span className="font-medium text-black">{user.email}</span>
                </p>
              ) : (
                <p className="mt-3 text-center text-xs text-black/60">
                  Your cart will be saved to your account.
                </p>
              )}
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
