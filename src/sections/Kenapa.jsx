import { links } from '../lib.js';

export default function Kenapa() {
  const { waLink } = links;

  return (
    <section style={{ background: '#262C31', padding: '88px 0 0' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 28px', textAlign: 'center' }}>
        <h2
          className="reveal"
          style={{
            margin: '0',
            fontSize: 'clamp(32px,4vw,52px)',
            lineHeight: '1.12',
            letterSpacing: '-0.025em',
            fontWeight: '700',
            color: '#FFFFFF',
          }}
        >
          Bantu usaha kamu beresin kerjaan yang itu-itu aja
        </h2>
        <a
          className="btn"
          href={waLink}
          target="_blank"
          rel="noopener"
          style={{
            marginTop: '28px',
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: '48px',
            padding: '12px 28px',
            borderRadius: '999px',
            background: '#EF7A30',
            color: '#262C31',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '17px',
          }}
        >
          Ngobrol dulu
        </a>
      </div>
      <div className="kpanel" style={{ background: '#FFFFFF', borderRadius: '120px 120px 0 0' }}>
        <div
          style={{
            maxWidth: '1180px',
            margin: '0 auto',
            padding: '0 28px 48px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))',
            gap: '40px',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src="/assets/v2/pose-hp.webp"
              alt="Maskot memegang HP dan membalas chat"
              className="kimg"
              style={{ height: '300px', objectFit: 'contain', display: 'block' }}
            />
            <h3 style={{ margin: '14px 0 6px', fontSize: '23px', fontWeight: '700' }}>Cukup chat kami</h3>
            <p style={{ margin: '0', color: '#4A555E', maxWidth: '280px' }}>Ceritain aja masalahnya. Konsultasi gratis.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src="/assets/v2/pose-laptop.webp"
              alt="Maskot membawa laptop berisi grafik"
              className="kimg"
              style={{ height: '300px', objectFit: 'contain', display: 'block' }}
            />
            <h3 style={{ margin: '14px 0 6px', fontSize: '23px', fontWeight: '700' }}>Harga jelas di awal</h3>
            <p style={{ margin: '0', color: '#4A555E', maxWidth: '280px' }}>Kamu tau biayanya dulu, baru kami kerjain.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src="/assets/v2/pose-santai.webp"
              alt="Maskot duduk santai sambil minum kopi"
              className="kimg"
              style={{ height: '300px', objectFit: 'contain', display: 'block' }}
            />
            <h3 style={{ margin: '14px 0 6px', fontSize: '23px', fontWeight: '700' }}>Kamu tinggal santai</h3>
            <p style={{ margin: '0', color: '#4A555E', maxWidth: '280px' }}>Bot jalan sendiri. Ada error? Kami yang benerin.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
