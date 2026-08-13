import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { CloseIcon } from "@/components/icons";
import { cx } from "@/lib/format";

export function AuthModal() {
  const { isAuthOpen, closeAuth, authMode, setAuthMode, login, signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const isSignup = authMode === "signup";

  useEffect(() => {
    if (!isAuthOpen) {
      setError("");
      setPassword("");
      setBusy(false);
    }
  }, [isAuthOpen]);

  useEffect(() => setError(""), [authMode]);

  useEffect(() => {
    if (!isAuthOpen) return;
    const onKey = (event) => {
      if (event.key === "Escape") closeAuth();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isAuthOpen, closeAuth]);

  if (!isAuthOpen) return null;

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (isSignup) {
        await signup({ email, password });
      } else {
        await login({ email, password });
      }
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 cursor-default"
        onClick={closeAuth}
      />

      <div className="relative w-full max-w-[440px] rounded-t-[20px] bg-white px-6 py-7 shadow-xl sm:rounded-[20px] sm:px-8 sm:py-8">
        <button
          type="button"
          aria-label="Close"
          onClick={closeAuth}
          className="absolute right-5 top-5 text-black/50 transition hover:text-black"
        >
          <CloseIcon width={22} height={22} />
        </button>

        <p className="font-display text-[26px] leading-none sm:text-[32px]">SHOP.CO</p>
        <h2 className="mt-3 text-xl font-bold sm:text-2xl">
          {isSignup ? "Create your account" : "Welcome back"}
        </h2>
        <p className="mt-1 text-sm text-black/60">
          {isSignup
            ? "Sign up and get 20% off your first order."
            : "Sign in to track orders and keep your cart."}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-1 rounded-full bg-[#F0F0F0] p-1">
          {["login", "signup"].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setAuthMode(mode)}
              className={cx(
                "h-10 rounded-full text-sm font-medium transition",
                authMode === mode ? "bg-black text-white" : "text-black/60",
              )}
            >
              {mode === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
          {isSignup ? (
            <input
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Full name"
              autoComplete="name"
              className="h-12 w-full rounded-full bg-[#F0F0F0] px-5 text-sm outline-none placeholder:text-black/40 focus:ring-1 focus:ring-black"
            />
          ) : null}

          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            autoComplete="email"
            className="h-12 w-full rounded-full bg-[#F0F0F0] px-5 text-sm outline-none placeholder:text-black/40 focus:ring-1 focus:ring-black"
          />

          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password (min. 6 characters)"
            autoComplete={isSignup ? "new-password" : "current-password"}
            className="h-12 w-full rounded-full bg-[#F0F0F0] px-5 text-sm outline-none placeholder:text-black/40 focus:ring-1 focus:ring-black"
          />

          {error ? <p className="px-2 text-xs text-sale">{error}</p> : null}

          <button
            type="submit"
            disabled={busy}
            className="h-12 w-full rounded-full bg-black text-sm font-medium text-white transition hover:bg-black/85 disabled:opacity-60"
          >
            {busy ? "Please wait..." : isSignup ? "Create Account" : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-black/60">
          {isSignup ? "Already have an account?" : "New to SHOP.CO?"}{" "}
          <button
            type="button"
            onClick={() => setAuthMode(isSignup ? "login" : "signup")}
            className="font-medium text-black underline underline-offset-2"
          >
            {isSignup ? "Sign in" : "Create one"}
          </button>
        </p>
      </div>
    </div>
  );
}
