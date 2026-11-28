import React from 'react';
import { links, useCycle } from '../lib.js';
import { WaIcon, MarqueeLogos } from '../components/shared.jsx';

const heroData = [
  {
    l1: 'Biar Sistem',
    l2: 'yang Kerja.',
    q: 'Kak, cabai rawit masih ada?',
    r: 'Ada kak, Rp8.000 per ons. Mau berapa?',
    t: '06.12',
    pill: 'Dibales dalam 3 detik',
  },
  {
    l1: 'Chat Dibales,',
    l2: 'Kamu Rebahan.',
    q: 'Masih buka, Kak?',
    r: 'Toko udah tutup kak, tapi pesanannya tetap bisa dicatat. Mau pesan apa?',
    t: '23.58',
    pill: 'Dibales walau kamu tidur',
  },
  {
    l1: 'Pesanan Masuk,',
    l2: 'Auto Kecatat.',
    q: 'Saya pesan 2 kaos hitam size L ya',
    r: 'Siap! Totalnya Rp178.000. Mau dikirim ke mana kak?',
    t: '10.41',
    pill: 'Masuk ke Google Sheets',
  },
  {
    l1: 'Iklan Hemat,',
    l2: 'Untung Naik.',
    q: 'Lihat iklan di IG, promonya masih ada?',
    r: 'Masih kak! Diskon 20% sampai Minggu.',
    t: '19.05',
    pill: 'Kelacak dari iklan Meta',
  },
];

export default function Hero() {
  const { waLink } = links;
  // Tagline ganti tiap 4,5 detik; klik garis progres = lompat + restart timer.
  const [h, pickHero] = useCycle(heroData.length, 4500);
  const heroLines = heroData.map((d, i) => ({ l1: d.l1, l2: d.l2, active: i === h }));
  const heroChip = heroData.map((d, i) => ({ q: d.q, r: d.r, t: d.t, pill: d.pill, active: i === h }));
  const heroDots = heroData.map((d, i) => ({
    label: 'Tampilkan tagline ' + (i + 1),
    active: i === h,
    done: i < h,
    pick: () => pickHero(i),
  }));

  return (
    <section id="beranda" style={{ background: '#262C31', padding: '12px 0 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 28px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '24px 40px', minHeight: '620px' }}>
          <div className="heroin" style={{ flex: '1.6 1 600px', minWidth: '0', color: '#FFFFFF', padding: '40px 0' }}>
            <p
              style={{
                margin: '0',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#30373D',
                border: '1px solid #3A4249',
                padding: '6px 14px 6px 6px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              <span
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img src="/assets/v2/logo.webp" alt="" style={{ width: '20px', height: '20px' }} />
              </span>
              Jasa automasi buat usaha kecil
            </p>
            <h1
              aria-live="polite"
              className="herotag"
              style={{
                margin: '26px 0 0',
                fontSize: 'clamp(44px,5.7vw,82px)',
                lineHeight: '1.0',
                letterSpacing: '-0.035em',
                fontWeight: '800',
                minHeight: '2.05em',
              }}
            >
              {heroLines.map((t, tIdx) => (
                <React.Fragment key={tIdx}>
                  {t.active && (
                    <>
                      <span className="heroline" style={{ display: 'block', whiteSpace: 'nowrap' }}>
                        {t.l1}
                        <br />
                        <span style={{ color: '#EF7A30' }}>{t.l2}</span>
                      </span>
                    </>
                  )}
                </React.Fragment>
              ))}
            </h1>
            <div style={{ display: 'flex', gap: '8px', marginTop: '18px', maxWidth: '220px' }}>
              {heroDots.map((d, dIdx) => (
                <React.Fragment key={dIdx}>
                  <button
                    type="button"
                    onClick={d.pick}
                    aria-label={d.label}
                    style={{ flex: '1', height: '22px', padding: '8px 0', border: 'none', background: 'none', cursor: 'pointer' }}
                  >
                    <span style={{ display: 'block', height: '6px', borderRadius: '999px', background: '#3A4249', overflow: 'hidden' }}>
                      {d.active && (
                        <>
                          <span
                            className="bar"
                            style={{
                              display: 'block',
                              height: '100%',
                              background: '#EF7A30',
                              borderRadius: '999px',
                              animationDuration: '4.5s',
                            }}
                          ></span>
                        </>
                      )}
                      {d.done && (
                        <>
                          <span
                            style={{ display: 'block', height: '100%', width: '100%', background: '#EF7A30', borderRadius: '999px' }}
                          ></span>
                        </>
                      )}
                    </span>
                  </button>
                </React.Fragment>
              ))}
            </div>
            <p style={{ margin: '18px 0 0', fontSize: '20px', lineHeight: '1.5', maxWidth: '500px', color: '#D2DADF' }}>
              Bot WhatsApp yang bales chat pelanggan dan nyatet pesanan. Kamu tinggal fokus jualan.
            </p>
            <p style={{ margin: '18px 0 0', display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '14px', fontWeight: '600' }}>
              <span style={{ background: '#30373D', padding: '6px 12px', borderRadius: '999px' }}>Toko online</span>
              <span style={{ background: '#30373D', padding: '6px 12px', borderRadius: '999px' }}>Laundry</span>
              <span style={{ background: '#30373D', padding: '6px 12px', borderRadius: '999px' }}>Salon</span>
              <span style={{ background: '#30373D', padding: '6px 12px', borderRadius: '999px' }}>Warung</span>
            </p>
            <p style={{ margin: '18px 0 0', fontSize: '17px', color: '#D2DADF' }}>
              Mulai <b style={{ fontSize: '26px', letterSpacing: '-0.02em', color: '#FFFFFF' }}>Rp350rb</b> · udah termasuk dipasangin
            </p>
            <a
              className="btn"
              href={waLink}
              target="_blank"
              rel="noopener"
              style={{
                marginTop: '30px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                minHeight: '54px',
                padding: '14px 28px',
                borderRadius: '999px',
                background: '#EF7A30',
                color: '#262C31',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '18px',
              }}
            >
              <WaIcon size={22} color="#262C31" flexNone />
              Konsultasi gratis
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
                  stroke="#EF7A30"
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
                  stroke="#EF7A30"
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
                  stroke="#EF7A30"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flex: 'none' }}
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Dibales ±15 menit di jam kerja
              </li>
            </ul>
          </div>
          <div className="heroart" style={{ flex: '1 1 420px', minWidth: '0', position: 'relative', height: '600px' }}>
            <div className="heromwrap" style={{ position: 'absolute', left: '-40px', bottom: '0', zIndex: '1' }}>
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: '-10px',
                  width: '240px',
                  height: '30px',
                  marginLeft: '-120px',
                  borderRadius: '50%',
                  background: 'radial-gradient(closest-side,rgba(0,0,0,0.55),rgba(0,0,0,0))',
                }}
              ></div>
              <img
                src="/assets/v2/pose-tunjuk-v2.webp"
                alt="Maskot dicodinginAJA menunjuk ke contoh chat"
                className="heromascot"
                style={{ position: 'relative', height: '500px', width: 'auto', display: 'block' }}
              />
            </div>
            <div
              className="herocard"
              style={{
                position: 'absolute',
                right: '0',
                top: '30px',
                width: '270px',
                zIndex: '2',
                background: '#FFFFFF',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 30px 60px -20px rgba(0,0,0,0.7)',
              }}
            >
              <div
                style={{
                  background: '#1F9E55',
                  color: '#FFFFFF',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 'none',
                  }}
                >
                  <img src="/assets/v2/logo.webp" alt="" style={{ width: '24px', height: '24px' }} />
                </span>
                <span style={{ lineHeight: '1.2' }}>
                  <b style={{ display: 'block', fontSize: '14px' }}>Toko Kamu</b>
                  <span style={{ fontSize: '12px', opacity: '0.9' }}>dibalas bot · online</span>
                </span>
              </div>
              <div
                aria-live="polite"
                style={{
                  background: '#EFEAE2',
                  padding: '14px 12px',
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  fontSize: '13px',
                  lineHeight: '1.4',
                  color: '#262C31',
                }}
              >
                {heroChip.map((c, cIdx) => (
                  <React.Fragment key={cIdx}>
                    {c.active && (
                      <>
                        <div
                          className="hb1"
                          style={{
                            alignSelf: 'flex-start',
                            maxWidth: '88%',
                            background: '#FFFFFF',
                            padding: '8px 10px',
                            borderRadius: '4px 12px 12px 12px',
                          }}
                        >
                          {c.q}
                          <span style={{ display: 'block', textAlign: 'right', fontSize: '10px', color: '#667781', marginTop: '2px' }}>
                            {c.t}
                          </span>
                        </div>
                        <div
                          className="hb2"
                          style={{
                            alignSelf: 'flex-end',
                            maxWidth: '88%',
                            background: '#D9FDD3',
                            padding: '8px 10px',
                            borderRadius: '12px 4px 12px 12px',
                          }}
                        >
                          {c.r}
                          <span
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '10px',
                              color: '#667781',
                              marginTop: '2px',
                            }}
                          >
                            {c.t}{' '}
                            <svg
                              aria-hidden="true"
                              width="16"
                              height="10"
                              viewBox="0 0 16 10"
                              fill="none"
                              stroke="#53BDEB"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            >
                              <path d="M1 5l3 3 6-7M6 8l1 1 6-8" />
                            </svg>
                          </span>
                        </div>
                        <div
                          className="hb3"
                          style={{
                            alignSelf: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: '#FFF3E8',
                            color: '#B54708',
                            fontWeight: '700',
                            fontSize: '12px',
                            padding: '6px 12px',
                            borderRadius: '999px',
                          }}
                        >
                          <svg
                            aria-hidden="true"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#D9601A"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ flex: 'none' }}
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {c.pill}
                        </div>
                      </>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="marquee-wrap"
        aria-label="Terhubung dengan aplikasi yang kamu pakai"
        style={{
          marginTop: '36px',
          padding: '26px 0',
          borderTop: '1px solid #3A4249',
          borderBottom: '1px solid #3A4249',
          overflow: 'hidden',
        }}
      >
        <div className="marquee" style={{ display: 'flex', gap: '64px', width: 'max-content', alignItems: 'center', paddingRight: '64px' }}>
          <div style={{ display: 'flex', gap: '64px', alignItems: 'center' }}>
            <MarqueeLogos />
          </div>
          <div aria-hidden="true" style={{ display: 'flex', gap: '64px', alignItems: 'center' }}>
            <MarqueeLogos />
          </div>
        </div>
      </div>
    </section>
  );
}
