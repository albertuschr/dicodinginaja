import { links } from '../lib.js';
import { WaIcon, SocialLinks } from '../components/shared.jsx';

export default function Cta() {
  const { waLink } = links;

  return (
    <section style={{ background: '#262C31', padding: '24px 0 0', overflow: 'hidden' }}>
      <div
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '0 28px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          gap: '24px',
        }}
      >
        <div style={{ flex: '1 1 300px', minWidth: '0', display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              bottom: '-120px',
              width: '420px',
              height: '420px',
              borderRadius: '50%',
              background: '#EF7A30',
              opacity: '0.22',
            }}
          ></div>
          <img
            src="/assets/v2/pose-melambai.webp"
            alt="Maskot melambai sambil memegang HP"
            style={{ position: 'relative', height: '460px', maxWidth: '100%', objectFit: 'contain', display: 'block' }}
          />
        </div>
        <div style={{ flex: '1.3 1 420px', minWidth: '0', padding: '64px 0 96px', color: '#FFFFFF' }}>
          <h2
            className="reveal"
            style={{ margin: '0', fontSize: 'clamp(36px,4.6vw,60px)', lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }}
          >
            Bingung mulai dari mana?
            <br />
            <span style={{ color: '#EF7A30' }}>Chat aja dulu.</span>
          </h2>
          <p style={{ margin: '20px 0 0', fontSize: '19px', color: '#D2DADF', maxWidth: '460px' }}>
            Langsung ngobrol sama tim kami, bukan bot. Cerita aja masalahnya.
          </p>
          <a
            className="btn pulse"
            href={waLink}
            target="_blank"
            rel="noopener"
            style={{
              marginTop: '32px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              minHeight: '58px',
              padding: '14px 30px',
              borderRadius: '999px',
              background: '#25D366',
              color: '#262C31',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '19px',
            }}
          >
            <WaIcon size={26} color="#262C31" flexNone />
            Chat 0812-9573-1556
          </a>
          <ul
            style={{
              listStyle: 'none',
              padding: '0',
              margin: '16px 0 0',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px 16px',
              fontSize: '14px',
              color: '#D2DADF',
            }}
          >
            <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7DD3A0"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flex: 'none' }}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Gratis konsultasi
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7DD3A0"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flex: 'none' }}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Gak ada paksaan beli
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7DD3A0"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flex: 'none' }}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Dibales ±15 menit, Senin–Sabtu 09.00–21.00
            </li>
          </ul>
          <p style={{ margin: '28px 0 12px', fontSize: '15px', color: '#D2DADF' }}>Atau ikutin kami di</p>
          <SocialLinks style={{ display: 'flex', gap: '10px' }} />
        </div>
      </div>
    </section>
  );
}
