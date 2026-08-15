import { Link } from "react-router-dom";
import { FacebookIcon, GithubIcon, InstagramIcon, TwitterIcon } from "@/components/icons";

const COLUMNS = [
  {
    title: "COMPANY",
    links: ["About", "Features", "Works", "Career"],
  },
  {
    title: "HELP",
    links: ["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"],
  },
  {
    title: "FAQ",
    links: ["Account", "Manage Deliveries", "Orders", "Payments"],
  },
  {
    title: "RESOURCES",
    links: ["Free eBooks", "Development Tutorial", "How to - Blog", "Youtube Playlist"],
  },
];

const SOCIAL_LINKS = [
   {
    icon: TwitterIcon,
    url: "https://twitter.com/YOUR_TWITTER_USERNAME",
    label: "Twitter",
  },
  {
    icon: FacebookIcon,
    url: "https://www.facebook.com/YOUR_FACEBOOK_USERNAME",
    label: "Facebook",
  },
  {
    icon: InstagramIcon,
    url: "https://www.instagram.com/w_abdullah_rajput_4238?igsh=NnI1dWMyZzIzZXdq",
    label: "Instagram",
  },
  {
    icon: GithubIcon,
    url: "https://github.com/abdullakq6-sketch",
    label: "GitHub",
  },
];

const PAYMENTS = [
  { label: "VISA", className: "font-serif italic font-bold text-[#1A1F71] text-[13px]" },
  { label: "master", className: "font-bold text-[#EB001B] text-[12px]" },
  { label: "PayPal", className: "font-bold text-[#003087] text-[12px]" },
  { label: " Pay", className: "font-medium text-black text-[12px]" },
  { label: "G Pay", className: "font-medium text-black text-[12px]" },
];

export function Footer() {
  return (
    <footer className="bg-[#F0F0F0] pb-20 pt-16 lg:pb-14">
      <div className="mx-auto max-w-[1240px] px-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-6 lg:gap-x-8">
          <div className="col-span-2 max-w-[250px]">
            <p className="font-display text-[28px] leading-none lg:text-[33px]">SHOP.CO</p>
            <p className="mt-4 text-sm text-black/60">
              We have clothes that suits your style and which you&apos;re proud to wear. From
              women to men.
            </p>
               <div className="mt-5 flex items-center gap-3">
  {SOCIAL_LINKS.map(({ icon: Icon, url, label }) => (
    <a
      key={label}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded-full border border-black/20 bg-white text-black transition hover:bg-black hover:text-white"
    >
      <Icon width={15} height={15} />
    </a>
  ))}
</div>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-medium uppercase tracking-[3px]">{column.title}</p>
              <ul className="mt-4 space-y-4 lg:space-y-5">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link to="/" className="text-sm text-black/60 transition hover:text-black">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-8 border-black/10" />

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-black/60">
            Shop.co © 2000-{new Date().getFullYear()}, All Rights Reserved
          </p>
          <div className="flex items-center gap-3">
            {PAYMENTS.map((payment) => (
              <span
                key={payment.label}
                className={`flex h-[30px] w-[46px] items-center justify-center rounded-md bg-white shadow-sm ${payment.className}`}
              >
                {payment.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
