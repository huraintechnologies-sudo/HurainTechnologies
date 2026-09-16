type IconName =
  | "blockchain"
  | "contract"
  | "exchange"
  | "igaming"
  | "payments"
  | "api"
  | "cloud"
  | "ai"
  | "security"
  | "banking"
  | "check"
  | "arrow"
  | "chevron"
  | "menu"
  | "close"
  | "map"
  | "mail"
  | "phone"
  | "whatsapp"
  | "linkedin"
  | "twitter"
  | "github"
  | "facebook";

const paths: Record<IconName, React.ReactNode> = {
  blockchain: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" />
    </>
  ),
  contract: (
    <>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <path d="M9 12h6M9 15h6M9 9h3" />
    </>
  ),
  exchange: (
    <>
      <path d="M4 7h13l-3-3M20 17H7l3 3" />
    </>
  ),
  igaming: (
    <>
      <rect x="2.5" y="7" width="19" height="11" rx="4" />
      <path d="M7 12.5h4M9 10.5v4" />
      <circle cx="16" cy="10.8" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="18" cy="13" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  payments: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 9.5h19" />
      <path d="M6 14.5h5" />
    </>
  ),
  api: (
    <>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.2 11L15.8 7M8.2 13l7.6 4" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18a4.5 4.5 0 010-9 5.5 5.5 0 0110.6-1.6A4 4 0 0117.5 15H17" />
      <path d="M7 18h10.5" />
    </>
  ),
  ai: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="3" />
      <circle cx="9.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <path d="M9 15c1 .8 2 1.1 3 1.1s2-.3 3-1.1" />
      <path d="M12 2v3M4 4l2 2M20 4l-2 2" />
    </>
  ),
  security: (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6z" />
      <path d="M9.5 12l1.8 1.8L15 10" />
    </>
  ),
  banking: (
    <>
      <path d="M3 10l9-6 9 6" />
      <path d="M5 10v9M9.5 10v9M14.5 10v9M19 10v9" />
      <path d="M3 21h18" />
    </>
  ),
  check: <path d="M4 12l5 5L20 6" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  map: (
    <>
      <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  phone: (
    <path d="M6.5 3.5l3 3-2 3a12 12 0 006 6l3-2 3 3-1.5 2.5A2 2 0 0116 20 16 16 0 014 8a2 2 0 011.5-2z" />
  ),
  whatsapp: (
    <path d="M4 20l1.4-4.1A8 8 0 1112 20a8 8 0 01-4-1.1z M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.5.9-1l-.3-1.2a.9.9 0 00-1-.6l-1 .2a5 5 0 01-2.5-2.5l.2-1a.9.9 0 00-.6-1L9.1 7.6c-.5-.1-1 .3-1 .9z" />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7.5 10v6.5M7.5 7.5v.01M11.5 16.5V13c0-1.4 1-2.3 2.3-2.3S16 11.6 16 13v3.5" />
    </>
  ),
  twitter: <path d="M21 5.5c-.7.3-1.4.6-2.2.7a3.8 3.8 0 001.7-2.1c-.7.4-1.6.8-2.4 1a3.8 3.8 0 00-6.5 3.5 10.8 10.8 0 01-7.9-4 3.8 3.8 0 001.2 5.1c-.6 0-1.2-.2-1.7-.5v.1c0 1.9 1.3 3.4 3.1 3.8-.6.2-1.2.2-1.8.1.5 1.6 2 2.7 3.7 2.7A7.6 7.6 0 013 18.3 10.7 10.7 0 008.7 20c6.9 0 10.6-5.7 10.6-10.6v-.5c.7-.5 1.3-1.2 1.7-1.9z" />,
  github: (
    <path d="M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 015 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .3.3.6.9.6 1.9v2.8c0 .3.2.6.7.5A10 10 0 0012 2z" />
  ),
  facebook: (
    <path d="M14 21v-7h2.4l.4-3H14V9c0-.9.2-1.5 1.6-1.5H17V5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2H8.5v3H11v7z" />
  ),
};

export function Icon({ name, className = "w-5 h-5" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
