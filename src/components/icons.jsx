const base = (props) => ({
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  ...props,
});

export const SearchIcon = (props) => (
  <svg {...base(props)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.2-3.2" />
  </svg>
);

export const CartIcon = (props) => (
  <svg {...base(props)}>
    <path d="M3 5h2l1.6 10.2a2 2 0 0 0 2 1.7h7.9a2 2 0 0 0 2-1.6L20 8H6" />
    <circle cx="9.5" cy="20" r="1.3" />
    <circle cx="17" cy="20" r="1.3" />
  </svg>
);

export const UserIcon = (props) => (
  <svg {...base(props)}>
    <circle cx="12" cy="8.5" r="3.8" />
    <path d="M4.5 20c1.2-3.6 4-5.4 7.5-5.4s6.3 1.8 7.5 5.4" />
  </svg>
);

export const ChevronDown = (props) => (
  <svg {...base(props)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ArrowRight = (props) => (
  <svg {...base(props)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowLeftSmall = (props) => (
  <svg {...base(props)}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
);

export const ArrowRightSmall = (props) => (
  <svg {...base(props)}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const CloseIcon = (props) => (
  <svg {...base(props)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const MenuIcon = (props) => (
  <svg {...base(props)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const TrashIcon = (props) => (
  <svg {...base(props)}>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12.2A2 2 0 0 0 9 21h6a2 2 0 0 0 2-1.8L18 7M9 7V4.8A1.8 1.8 0 0 1 10.8 3h2.4A1.8 1.8 0 0 1 15 4.8V7" />
  </svg>
);

export const MinusIcon = (props) => (
  <svg {...base(props)}>
    <path d="M5 12h14" />
  </svg>
);

export const PlusIcon = (props) => (
  <svg {...base(props)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const CheckIcon = (props) => (
  <svg {...base(props)}>
    <path d="m5 13 4.5 4.5L19 7" />
  </svg>
);

export const VerifiedIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.2 14.3 4l2.9-.2 1 2.7 2.5 1.5-1 2.7 1 2.7-2.5 1.5-1 2.7-2.9-.2L12 21.8 9.7 20l-2.9.2-1-2.7L3.3 16l1-2.7-1-2.7 2.5-1.5 1-2.7 2.9.2L12 2.2Zm-1.1 13.2 5.2-5.2-1.3-1.3-3.9 3.9-1.8-1.8-1.3 1.3 3.1 3.1Z" />
  </svg>
);

export const SparkleIcon = (props) => (
  <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
    <path d="M50 0c0 27.6 22.4 50 50 50-27.6 0-50 22.4-50 50 0-27.6-22.4-50-50-50 27.6 0 50-22.4 50-50Z" />
  </svg>
);

export const StarIcon = ({ fill = 1, ...props }) => {
  const id = `star-${Math.round(fill * 100)}`;
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id={id}>
          <stop offset={`${fill * 100}%`} stopColor="#FFC633" />
          <stop offset={`${fill * 100}%`} stopColor="#EBEBEB" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${id})`}
        d="M12 1.8l3.1 6.3 7 1-5 4.9 1.2 6.9-6.3-3.3-6.3 3.3 1.2-6.9-5-4.9 7-1L12 1.8Z"
      />
    </svg>
  );
};

export const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21 5.9c-.7.3-1.4.5-2.2.6.8-.5 1.4-1.2 1.7-2.1-.8.4-1.6.8-2.4.9A3.7 3.7 0 0 0 11.7 8c-3-.2-5.7-1.6-7.5-3.9a3.7 3.7 0 0 0 1.1 5 3.7 3.7 0 0 1-1.7-.5c0 1.8 1.3 3.3 3 3.6-.6.2-1.1.2-1.7.1a3.7 3.7 0 0 0 3.5 2.6A7.5 7.5 0 0 1 3 16.5a10.5 10.5 0 0 0 16.2-9.3c.7-.5 1.3-1.1 1.8-1.3Z" />
  </svg>
);

export const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.6V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H7.6V13h2.7v8h3.2Z" />
  </svg>
);

export const InstagramIcon = (props) => (
  <svg {...base(props)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="16.9" cy="7.1" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
  </svg>
);
