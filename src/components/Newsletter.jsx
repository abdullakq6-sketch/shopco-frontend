import { useState } from "react";
import { api } from "@/api/client";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    try {
      const result = await api.subscribe(email);
      setStatus("done");
      setMessage(result.message);
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  }

  return (
    <section className="relative mt-10 lg:mt-16">
      <div className="absolute bottom-0 left-0 h-1/2 w-full bg-[#F0F0F0]" />
      <div className="relative mx-auto max-w-[1240px] px-4">
        <div className="grid gap-8 rounded-[20px] bg-black px-6 py-8 text-white md:grid-cols-2 md:items-center lg:px-16 lg:py-11">
          <h2 className="font-display text-[32px] leading-[1.05] lg:text-[40px]">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>
          <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
            <label className="flex h-12 items-center gap-3 rounded-full bg-white px-5">
              <svg
                viewBox="0 0 24 24"
                width={20}
                height={20}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="shrink-0 text-black/40"
              >
                <rect x="3" y="5" width="18" height="14" rx="3" />
                <path d="m4 7 8 6 8-6" />
              </svg>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-transparent text-sm text-black outline-none placeholder:text-black/40"
              />
            </label>
            <button
              type="submit"
              disabled={status === "loading"}
              className="h-12 rounded-full bg-white text-sm font-medium text-black transition hover:bg-white/90 disabled:opacity-60"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe to Newsletter"}
            </button>
            {message ? (
              <p
                className={
                  status === "error" ? "text-xs text-[#FF7A7A]" : "text-xs text-[#9CFF9C]"
                }
              >
                {message}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
