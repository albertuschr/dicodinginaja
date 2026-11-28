import { links } from '../lib.js';

export function WaIcon({ size = 24, color = 'currentColor', flexNone = false }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" style={flexNone ? { color, flex: 'none' } : { color }}>
      <path
        d="M12 2.6a9.4 9.4 0 0 0-8.1 14.2L2.6 21.4l4.7-1.2A9.4 9.4 0 1 0 12 2.6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M8.7 7.3c.3-.3.8-.3 1 .1l1.1 1.6c.2.3.2.7-.1 1l-.6.6c.6 1.3 1.7 2.4 3 3l.6-.6c.3-.3.7-.3 1-.1l1.6 1.1c.4.2.4.7.1 1l-.8.8c-.6.6-1.5.8-2.3.4-2.2-1-4.1-2.9-5.1-5.1-.4-.8-.2-1.7.4-2.3z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Satu grup logo aplikasi di marquee hero (dirender dua kali biar looping mulus). */
export function MarqueeLogos() {
  return (
    <>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          color: '#FFFFFF',
          fontSize: '21px',
          fontWeight: '600',
          whiteSpace: 'nowrap',
        }}
      >
        <WaIcon size={28} color="#FFFFFF" />
        WhatsApp
      </span>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          color: '#FFFFFF',
          fontSize: '21px',
          fontWeight: '600',
          whiteSpace: 'nowrap',
        }}
      >
        <svg
          aria-hidden="true"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.6"
          strokeLinecap="round"
        >
          <path d="M12 2.5v6M12 15.5v6M2.5 12h6M15.5 12h6M5.3 5.3l4.2 4.2M14.5 14.5l4.2 4.2M18.7 5.3l-4.2 4.2M9.5 14.5l-4.2 4.2" />
        </svg>
        Claude
      </span>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          color: '#FFFFFF',
          fontSize: '21px',
          fontWeight: '600',
          whiteSpace: 'nowrap',
        }}
      >
        <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="#FFFFFF">
          <path d="M12 1.5c.6 5.6 4.9 9.9 10.5 10.5-5.6.6-9.9 4.9-10.5 10.5C11.4 16.9 7.1 12.6 1.5 12 7.1 11.4 11.4 7.1 12 1.5z" />
        </svg>
        Gemini
      </span>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          color: '#FFFFFF',
          fontSize: '21px',
          fontWeight: '600',
          whiteSpace: 'nowrap',
        }}
      >
        <svg aria-hidden="true" width="32" height="28" viewBox="0 0 28 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
          <circle cx="3.5" cy="13" r="2.5" />
          <circle cx="11" cy="13" r="2.5" />
          <circle cx="22" cy="7" r="2.5" />
          <circle cx="22" cy="18" r="2.5" />
          <path d="M6 13h2.5M13.5 13h2l3.5-5M15.5 13l3.5 4.5" />
        </svg>
        n8n
      </span>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          color: '#FFFFFF',
          fontSize: '21px',
          fontWeight: '600',
          whiteSpace: 'nowrap',
        }}
      >
        <svg aria-hidden="true" width="26" height="28" viewBox="0 0 22 24">
          <path d="M3 1h11l6 6v14.5A1.5 1.5 0 0 1 18.5 23h-15A1.5 1.5 0 0 1 2 21.5v-19A1.5 1.5 0 0 1 3 1z" fill="#FFFFFF" />
          <path d="M6 11h10v8H6zM6 15h10M11 11v8" fill="none" stroke="#262C31" strokeWidth="1.6" />
        </svg>
        Google Sheets
      </span>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          color: '#FFFFFF',
          fontSize: '21px',
          fontWeight: '600',
          whiteSpace: 'nowrap',
        }}
      >
        <svg
          aria-hidden="true"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinecap="round"
        >
          <path d="M12 5l6.5 13.5" />
          <path d="M12 5L6.5 16.5" />
          <circle cx="5.6" cy="18.4" r="2.6" fill="#FFFFFF" stroke="none" />
        </svg>
        Google Ads
      </span>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          color: '#FFFFFF',
          fontSize: '21px',
          fontWeight: '600',
          whiteSpace: 'nowrap',
        }}
      >
        <svg aria-hidden="true" width="30" height="28" viewBox="0 0 26 22" fill="#FFFFFF">
          <path d="M1 4.5C1 3 2.6 2.2 3.8 3.1L13 10l9.2-6.9c1.2-.9 2.8-.1 2.8 1.4V19a1.5 1.5 0 0 1-1.5 1.5H20V9.8l-7 5.2-7-5.2v10.7H2.5A1.5 1.5 0 0 1 1 19z" />
        </svg>
        Gmail
      </span>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          color: '#FFFFFF',
          fontSize: '21px',
          fontWeight: '600',
          whiteSpace: 'nowrap',
        }}
      >
        <svg aria-hidden="true" width="30" height="28" viewBox="0 0 26 23" fill="#FFFFFF">
          <path d="M8.6 1h8.8l8 13.6h-8.8z" />
          <path d="M7.4 2.4l4.4 7.6-6.9 11.8L.5 14.2z" />
          <path d="M6.7 22l4.4-7.4h14.3L21 22z" />
        </svg>
        Google Drive
      </span>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          color: '#FFFFFF',
          fontSize: '21px',
          fontWeight: '600',
          whiteSpace: 'nowrap',
        }}
      >
        <svg
          aria-hidden="true"
          width="34"
          height="28"
          viewBox="0 0 30 20"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <path d="M3 13c0-5 2.2-9 5.5-9 4.5 0 7.5 12 12 12 2.6 0 4.5-2.3 4.5-6s-1.9-6-4.5-6C16 4 13 16 8.5 16 5.2 16 3 15 3 13z" />
        </svg>
        Meta
      </span>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          color: '#FFFFFF',
          fontSize: '21px',
          fontWeight: '600',
          whiteSpace: 'nowrap',
        }}
      >
        <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="#FFFFFF">
          <path d="M21.4 3.6L2.9 10.7c-1 .4-1 1.2 0 1.5l4.6 1.4 1.8 5.5c.2.7.9.8 1.4.4l2.6-2.1 4.8 3.5c.6.4 1.4.1 1.6-.6l3.2-15.2c.2-.9-.6-1.6-1.5-1.5zM9.6 13.9l8.4-5.9-6.7 7-.3 3.2z" />
        </svg>
        Telegram
      </span>
    </>
  );
}

/** Tombol sosmed bulat (CTA penutup dan footer). */
export function SocialLinks({ style }) {
  const { igLink, ttLink, ytLink, waLink, mailLink } = links;
  return (
    <div style={style}>
      <a
        className="btn"
        href={igLink}
        target="_blank"
        rel="noopener"
        aria-label="Instagram dicodinginAJA"
        style={{
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: '#353C42',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="#FFFFFF" stroke="none" />
        </svg>
      </a>
      <a
        className="btn"
        href={ttLink}
        target="_blank"
        rel="noopener"
        aria-label="TikTok dicodinginAJA"
        style={{
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: '#353C42',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF">
          <path d="M16.6 2c.4 2.5 2 4.1 4.4 4.3v3.4c-1.6 0-3.1-.5-4.3-1.3v6.8a6.5 6.5 0 1 1-6.5-6.5h.6v3.5a3 3 0 1 0 2.4 2.9V2z" />
        </svg>
      </a>
      <a
        className="btn"
        href={ytLink}
        target="_blank"
        rel="noopener"
        aria-label="YouTube dicodinginAJA"
        style={{
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: '#353C42',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
          <rect x="1.5" y="5" width="21" height="14" rx="4.5" fill="#FFFFFF" />
          <path d="M10 9l5.5 3-5.5 3z" fill="#1C2125" />
        </svg>
      </a>
      <a
        className="btn"
        href={waLink}
        target="_blank"
        rel="noopener"
        aria-label="WhatsApp dicodinginAJA"
        style={{
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: '#353C42',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <WaIcon size={22} color="#FFFFFF" />
      </a>
      <a
        className="btn"
        href={mailLink}
        target="_blank"
        rel="noopener"
        aria-label="Email dicodinginAJA"
        style={{
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: '#353C42',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          aria-hidden="true"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinejoin="round"
        >
          <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
          <path d="M3 6.5l9 6.5 9-6.5" />
        </svg>
      </a>
    </div>
  );
}
