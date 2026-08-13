import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-[1240px] px-4 py-24 text-center">
      <p className="font-display text-[64px] leading-none">404</p>
      <h1 className="mt-4 font-display text-2xl lg:text-3xl">PAGE NOT FOUND</h1>
      <p className="mt-3 text-sm text-black/60">
        Jo page aap dhoond rahe hain wo maujood nahi hai.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex h-[52px] items-center rounded-full bg-black px-10 text-sm font-medium text-white transition hover:bg-black/85"
      >
        Back to Home
      </Link>
    </div>
  );
}
