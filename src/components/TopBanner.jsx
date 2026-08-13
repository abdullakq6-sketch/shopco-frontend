import { useState } from "react";
import { CloseIcon } from "@/components/icons";

export function TopBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="bg-black px-4 py-2 text-white">
      <div className="relative mx-auto flex max-w-[1240px] items-center justify-center">
        <p className="text-center text-xs sm:text-sm">
          Sign up and get 20% off to your first order.{" "}
          <button type="button" className="font-medium underline underline-offset-2">
            Sign Up Now
          </button>
        </p>
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => setVisible(false)}
          className="absolute right-0 hidden opacity-80 transition hover:opacity-100 sm:block"
        >
          <CloseIcon width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
