import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { CartIcon, ChevronDown, MenuIcon, SearchIcon, UserIcon } from "@/components/icons";

const LINKS = [
  { label: "Shop", href: "/", dropdown: true },
  { label: "On Sale", href: "/#new-arrivals" },
  { label: "New Arrivals", href: "/#new-arrivals" },
  { label: "Brands", href: "/#top-selling" },
];

export function Navbar() {
  const { cart } = useCart();
  const { user, openAuth, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);

  useEffect(() => {
    if (!accountOpen) return;
    const onClick = (event) => {
      if (!accountRef.current?.contains(event.target)) setAccountOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [accountOpen]);

  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-[1240px] items-center gap-3 px-4 py-5 sm:gap-6 lg:py-6">
        <button
          type="button"
          className="lg:hidden"
          aria-label="Open menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MenuIcon width={24} height={24} />
        </button>

        <Link to="/" className="font-display text-[25px] leading-none sm:text-[32px]">
<<<<<<< HEAD
          <img src="/images/logo.svg" alt="SHOP.CO" className="h-8 w-auto" />
=======
          SHOP.CO
>>>>>>> 6b0aef3c01bcc7479348ee62034be9756067b937
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="flex items-center gap-1 text-base text-black transition hover:opacity-60"
            >
              {link.label}
              {link.dropdown ? <ChevronDown width={16} height={16} /> : null}
            </Link>
          ))}
        </nav>

        <form
          className="ml-auto hidden h-12 flex-1 items-center gap-3 rounded-full bg-[#F0F0F0] px-4 md:flex"
          onSubmit={(event) => event.preventDefault()}
        >
          <SearchIcon width={22} height={22} className="shrink-0 text-black/40" />
          <input
            type="search"
            placeholder="Search for products..."
            className="w-full bg-transparent text-base outline-none placeholder:text-black/40"
          />
        </form>

        <div className="ml-auto flex items-center gap-3 md:ml-0 sm:gap-4">
          <button type="button" aria-label="Search" className="md:hidden">
            <SearchIcon width={22} height={22} />
          </button>
          <Link to="/cart" aria-label="Cart" className="relative">
            <CartIcon width={24} height={24} />
            {cart.count > 0 ? (
              <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white">
                {cart.count}
              </span>
            ) : null}
          </Link>

          <div className="relative" ref={accountRef}>
            {user ? (
              <button
                type="button"
                aria-label="Account menu"
                onClick={() => setAccountOpen((open) => !open)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-bold uppercase text-white"
              >
                {user.email.charAt(0)}
              </button>
            ) : (
              <button type="button" aria-label="Sign in" onClick={() => openAuth("login")}>
                <UserIcon width={24} height={24} />
              </button>
            )}

            {user && accountOpen ? (
              <div className="absolute right-0 top-10 z-40 w-60 rounded-2xl border border-black/10 bg-white p-4 shadow-xl">
                <p className="truncate text-sm font-bold">{user.email}</p>
                <hr className="my-3 border-black/10" />
                <Link
                  to="/cart"
                  onClick={() => setAccountOpen(false)}
                  className="block rounded-lg px-2 py-2 text-sm transition hover:bg-[#F0F0F0]"
                >
                  My Cart ({cart.count})
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    setAccountOpen(false);
                    await logout();
                  }}
                  className="mt-1 block w-full rounded-lg px-2 py-2 text-left text-sm text-sale transition hover:bg-sale/10"
                >
                  Log out
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {menuOpen ? (
        <nav className="border-t border-black/10 px-4 pb-4 pt-2 lg:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-base"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
