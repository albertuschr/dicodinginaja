import React, { useState } from 'react';
import { css, useCycle } from '../lib.js';

const fadeImg = (on, pos) =>
  css(
    'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:' +
      (pos || 'top') +
      ';display:block;transition:opacity 0.7s ease;opacity:' +
      (on ? 1 : 0),
  );
const webDefs = [
  ['web-hero.webp', 'Halaman utama website INI Best Home'],
  ['web-fitur.webp', 'Bagian fitur aplikasi di website'],
  ['web-member.webp', 'Bagian member dan langganan'],
  ['web-cta.webp', 'Bagian ajakan download dan footer'],
];
const andDefs = [
  ['app-home-and.webp', 'Beranda aplikasi di Android'],
  ['app-paket-and.webp', 'Daftar paket layanan'],
  ['app-profil-and.webp', 'Halaman profil pelanggan'],
  ['app-login-and.webp', 'Halaman masuk akun'],
];
const iosDefs = [
  ['app-splash-ios.webp', 'Layar pembuka aplikasi di iPhone', '#2B2418', '#FFFFFF'],
  ['app-detail-ios.webp', 'Detail layanan Full Body Massage', '#5B4A3E', '#FFFFFF'],
  ['app-paket-ios.webp', 'Daftar paket layanan', '#FDFBF8', '#262C31'],
  ['app-home-ios.webp', 'Beranda aplikasi di iPhone', '#3A2F22', '#FFFFFF'],
];
const csDefs = ['Website', 'Mobile App', 'POS', 'Convera', 'Chatbot'];

export default function Project() {
  const [ci, setCi] = useState(0);
  // Galeri screenshot ganti tiap 3,2 detik (klik titik gak me-restart timer, sama kayak desain).
  const [g, setGal] = useCycle(4, 3200, { restartOnPick: false });

  const wi = g % 4;
  const webShots = webDefs.map((d, i) => ({ src: '/assets/v2/' + d[0], alt: d[1], style: fadeImg(i === wi) }));
  const webDots = webDefs.map((d, i) => ({
    label: d[1],
    style: css(
      'display:block;height:10px;border-radius:999px;transition:width 0.3s,background 0.3s;' +
        (i === wi ? 'width:28px;background:#D9601A' : 'width:10px;background:#F2C9AE'),
    ),
    pick: () => setGal(i),
  }));
  const andShots = andDefs.map((d, i) => ({ src: '/assets/v2/' + d[0], alt: d[1], style: fadeImg(i === g % 4) }));
  const ii = (g + 2) % 4;
  const iosShots = iosDefs.map((d, i) => ({
    src: '/assets/v2/' + d[0],
    alt: d[1],
    wrap: css('position:absolute;inset:0;transition:opacity 0.7s ease;opacity:' + (i === ii ? 1 : 0) + ';background:' + d[2]),
    bar: css(
      'position:absolute;left:0;right:0;top:0;height:38px;padding:10px 20px 0 24px;display:flex;justify-content:space-between;align-items:flex-start;background:' +
        d[2] +
        ';color:' +
        d[3] +
        ';z-index:1',
    ),
  }));
  const csTabs = csDefs.map((l, i) => ({
    label: l,
    selected: i === ci ? 'true' : 'false',
    style: css(
      'min-height:48px;padding:12px 22px;border-radius:999px;font-size:16px;font-weight:600;cursor:pointer;transition:background 0.3s,color 0.3s;' +
        (i === ci
          ? 'background:#262C31;color:#FFFFFF;border:2px solid #262C31'
          : 'background:#FFFFFF;color:#262C31;border:2px solid #F2C9AE'),
    ),
    pick: () => setCi(i),
  }));
  const cs0 = ci === 0,
    cs1 = ci === 1,
    cs2 = ci === 2,
    cs3 = ci === 3,
    cs4 = ci === 4;

  return (
    <section id="project" style={{ background: '#FFF6EE', padding: '104px 0' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 28px' }}>
        <h2
          className="reveal"
          style={{
            margin: '0',
            textAlign: 'center',
            fontSize: 'clamp(32px,4vw,52px)',
            lineHeight: '1.1',
            letterSpacing: '-0.025em',
            fontWeight: '700',
          }}
        >
          Project yang udah kami kerjain
        </h2>
        <p style={{ margin: '16px auto 0', textAlign: 'center', color: '#4A555E', fontSize: '18px', maxWidth: '600px' }}>
          Bukan janji. Ini masalahnya, ini yang kami buat, ini hasilnya.
        </p>
        <div
          role="tablist"
          aria-label="Pilih project"
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginTop: '36px' }}
        >
          {csTabs.map((t, tIdx) => (
            <React.Fragment key={tIdx}>
              <button type="button" role="tab" aria-selected={t.selected} onClick={t.pick} style={t.style}>
                {t.label}
              </button>
            </React.Fragment>
          ))}
        </div>

        {/* 1. Website INI Best Home */}
        {cs0 && (
          <>
            <article
              className="chip"
              style={{
                marginTop: '36px',
                background: '#FFFFFF',
                borderRadius: '36px',
                padding: 'clamp(24px,4vw,48px)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '40px',
                alignItems: 'center',
              }}
            >
              <div style={{ flex: '1 1 400px', minWidth: '0' }}>
                <p style={{ margin: '0', fontSize: '14px', fontWeight: '700', color: '#D9601A', letterSpacing: '0.04em' }}>
                  WEBSITE · JASA PIJAT PANGGILAN
                </p>
                <h3 style={{ margin: '8px 0 0', fontSize: '34px', fontWeight: '700', letterSpacing: '-0.02em' }}>Website INI Best Home</h3>
                <dl style={{ margin: '24px 0 0', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '16px' }}>
                  <div>
                    <dt style={{ fontWeight: '700' }}>Masalahnya</dt>
                    <dd style={{ margin: '4px 0 0', color: '#4A555E' }}>
                      Aplikasinya udah rilis di Android dan iOS, tapi belum ada website buat ngenalin layanan dan ngarahin orang buat
                      download. Google Play juga minta halaman hapus akun.
                    </dd>
                  </div>
                  <div>
                    <dt style={{ fontWeight: '700' }}>Yang kami buat</dt>
                    <dd style={{ margin: '4px 0 0', color: '#4A555E' }}>
                      Website premium yang ngejelasin layanan, fitur aplikasi, paket member, dan cara jadi mitra. Lengkap dengan halaman
                      Kebijakan Privasi dan Hapus Akun yang satu tema sama aplikasinya.
                    </dd>
                  </div>
                </dl>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit,minmax(min(130px,100%),1fr))',
                    gap: '12px',
                    marginTop: '24px',
                  }}
                >
                  <div style={{ background: '#FFF6EE', borderRadius: '20px', padding: '16px' }}>
                    <b style={{ display: 'block', fontSize: '26px', letterSpacing: '-0.02em' }}>2 toko</b>
                    <span style={{ fontSize: '13px', color: '#4A555E' }}>link Google Play dan App Store di satu tempat</span>
                  </div>
                  <div style={{ background: '#FFF6EE', borderRadius: '20px', padding: '16px' }}>
                    <b style={{ display: 'block', fontSize: '26px', letterSpacing: '-0.02em' }}>Lolos</b>
                    <span style={{ fontSize: '13px', color: '#4A555E' }}>review Google Play dan App Store</span>
                  </div>
                  <div style={{ background: '#FFF6EE', borderRadius: '20px', padding: '16px' }}>
                    <b style={{ display: 'block', fontSize: '26px', letterSpacing: '-0.02em' }}>Rapi</b>
                    <span style={{ fontSize: '13px', color: '#4A555E' }}>di HP dan laptop</span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  flex: '1.3 1 460px',
                  minWidth: '0',
                  background: '#FFE3CF',
                  borderRadius: '28px',
                  padding: 'clamp(16px,3vw,28px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    boxShadow: '0 20px 40px -20px rgba(38,44,49,0.45)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 14px', background: '#262C31' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57' }}></span>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FEBC2E' }}></span>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28C840' }}></span>
                    <span style={{ marginLeft: '10px', color: '#D2DADF', fontSize: '12px' }}>home.besthomeservice.id</span>
                  </div>
                  <div style={{ position: 'relative', aspectRatio: '1915/1096', background: '#211A14' }}>
                    {webShots.map((w, wIdx) => (
                      <React.Fragment key={wIdx}>
                        <img src={w.src} alt={w.alt} style={w.style} />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  {webDots.map((d, dIdx) => (
                    <React.Fragment key={dIdx}>
                      <button
                        type="button"
                        onClick={d.pick}
                        aria-label={d.label}
                        style={{ border: 'none', background: 'none', padding: '8px 2px', cursor: 'pointer' }}
                      >
                        <span style={d.style}></span>
                      </button>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </article>
          </>
        )}

        {/* 2. Aplikasi INI Best Home */}
        {cs1 && (
          <>
            <article
              className="chip"
              style={{
                marginTop: '36px',
                background: '#FFFFFF',
                borderRadius: '36px',
                padding: 'clamp(24px,4vw,48px)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '40px',
                alignItems: 'center',
              }}
            >
              <div style={{ flex: '1 1 400px', minWidth: '0' }}>
                <p style={{ margin: '0', fontSize: '14px', fontWeight: '700', color: '#D9601A', letterSpacing: '0.04em' }}>
                  APLIKASI ANDROID DAN iOS · JASA PIJAT PANGGILAN
                </p>
                <h3 style={{ margin: '8px 0 0', fontSize: '34px', fontWeight: '700', letterSpacing: '-0.02em' }}>Aplikasi INI Best Home</h3>
                <dl style={{ margin: '24px 0 0', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '16px' }}>
                  <div>
                    <dt style={{ fontWeight: '700' }}>Masalahnya</dt>
                    <dd style={{ margin: '4px 0 0', color: '#4A555E' }}>
                      Pesanan pijat panggilan masih lewat chat. Pelanggan susah lihat harga, pilih terapis, dan atur jadwal, admin juga
                      kewalahan nyatet.
                    </dd>
                  </div>
                  <div>
                    <dt style={{ fontWeight: '700' }}>Yang kami buat</dt>
                    <dd style={{ margin: '4px 0 0', color: '#4A555E' }}>
                      Aplikasi buat Android dan iOS. Pelanggan pilih layanan, pilih terapis (Standard atau Pro, pria atau wanita), atur
                      jadwal, lihat total harga sebelum bayar, plus member Bronze sampai Gold, referral, dan forum.
                    </dd>
                  </div>
                </dl>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit,minmax(min(130px,100%),1fr))',
                    gap: '12px',
                    marginTop: '24px',
                  }}
                >
                  <div style={{ background: '#FFF6EE', borderRadius: '20px', padding: '16px' }}>
                    <b style={{ display: 'block', fontSize: '26px', letterSpacing: '-0.02em' }}>2</b>
                    <span style={{ fontSize: '13px', color: '#4A555E' }}>platform: Android dan iOS</span>
                  </div>
                  <div style={{ background: '#FFF6EE', borderRadius: '20px', padding: '16px' }}>
                    <b style={{ display: 'block', fontSize: '26px', letterSpacing: '-0.02em' }}>5.0</b>
                    <span style={{ fontSize: '13px', color: '#4A555E' }}>rating layanan di aplikasi</span>
                  </div>
                  <div style={{ background: '#FFF6EE', borderRadius: '20px', padding: '16px' }}>
                    <b style={{ display: 'block', fontSize: '26px', letterSpacing: '-0.02em' }}>40+</b>
                    <span style={{ fontSize: '13px', color: '#4A555E' }}>booking per layanan</span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  flex: '1.3 1 460px',
                  minWidth: '0',
                  background: '#FFE3CF',
                  borderRadius: '28px',
                  padding: '32px 16px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '28px',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: '230px',
                      borderRadius: '40px',
                      background: '#1C2125',
                      padding: '9px',
                      boxShadow: '0 24px 40px -20px rgba(38,44,49,0.6)',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        borderRadius: '32px',
                        overflow: 'hidden',
                        aspectRatio: '738/1600',
                        background: '#F7F3EE',
                      }}
                    >
                      {andShots.map((a, aIdx) => (
                        <React.Fragment key={aIdx}>
                          <img src={a.src} alt={a.alt} style={a.style} />
                        </React.Fragment>
                      ))}
                      <span
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '9px',
                          transform: 'translateX(-50%)',
                          width: '11px',
                          height: '11px',
                          borderRadius: '50%',
                          background: '#0B0D0F',
                          boxShadow: '0 0 0 2px rgba(255,255,255,0.15)',
                        }}
                      ></span>
                    </div>
                  </div>
                  <p style={{ margin: '12px 0 0', fontSize: '14px', fontWeight: '700' }}>Android</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: '230px',
                      borderRadius: '40px',
                      background: '#1C2125',
                      padding: '9px',
                      boxShadow: '0 24px 40px -20px rgba(38,44,49,0.6)',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        borderRadius: '32px',
                        overflow: 'hidden',
                        aspectRatio: '738/1600',
                        background: '#F7F3EE',
                      }}
                    >
                      {iosShots.map((p, pIdx) => (
                        <React.Fragment key={pIdx}>
                          <div style={p.wrap}>
                            <div style={p.bar}>
                              <b style={{ fontSize: '12px' }}>9:41</b>
                              <span style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                <svg aria-hidden="true" width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
                                  <rect x="0" y="7" width="3" height="4" rx="1" />
                                  <rect x="4.5" y="5" width="3" height="6" rx="1" />
                                  <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
                                  <rect x="13.5" y="0" width="3" height="11" rx="1" />
                                </svg>
                                <svg aria-hidden="true" width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
                                  <path d="M7.5 2.2c2.1 0 4 .8 5.4 2.1l1.1-1.1C12.3 1.6 10 .6 7.5.6S2.7 1.6 1 3.2l1.1 1.1c1.4-1.3 3.3-2.1 5.4-2.1zm0 3.2c1.2 0 2.3.5 3.1 1.2l1.1-1.1c-1.1-1-2.6-1.7-4.2-1.7s-3.1.7-4.2 1.7l1.1 1.1c.8-.7 1.9-1.2 3.1-1.2zm0 3.1L9.2 10 7.5 11.7 5.8 10z" />
                                </svg>
                                <span
                                  style={{
                                    width: '24px',
                                    height: '11px',
                                    border: '1.4px solid currentColor',
                                    borderRadius: '3px',
                                    padding: '1px',
                                    display: 'inline-flex',
                                  }}
                                >
                                  <span style={{ flex: '1', background: 'currentColor', borderRadius: '1px' }}></span>
                                </span>
                              </span>
                            </div>
                            <img
                              src={p.src}
                              alt={p.alt}
                              style={{
                                position: 'absolute',
                                left: '0',
                                right: '0',
                                top: '38px',
                                bottom: '0',
                                width: '100%',
                                height: 'calc(100% - 38px)',
                                objectFit: 'cover',
                                objectPosition: 'top',
                                display: 'block',
                              }}
                            />
                          </div>
                        </React.Fragment>
                      ))}
                      <span
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '9px',
                          transform: 'translateX(-50%)',
                          width: '62px',
                          height: '18px',
                          borderRadius: '999px',
                          background: '#000000',
                          zIndex: '5',
                        }}
                      ></span>
                      <span
                        style={{
                          position: 'absolute',
                          left: '50%',
                          bottom: '7px',
                          transform: 'translateX(-50%)',
                          width: '90px',
                          height: '4px',
                          borderRadius: '999px',
                          background: 'rgba(38,44,49,0.55)',
                          zIndex: '5',
                        }}
                      ></span>
                    </div>
                  </div>
                  <p style={{ margin: '12px 0 0', fontSize: '14px', fontWeight: '700' }}>iPhone</p>
                </div>
              </div>
            </article>
          </>
        )}

        {/* 3. Kasir Warkop */}
        {cs2 && (
          <>
            <article
              className="chip"
              style={{
                marginTop: '36px',
                background: '#FFFFFF',
                borderRadius: '36px',
                padding: 'clamp(24px,4vw,48px)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '40px',
                alignItems: 'center',
              }}
            >
              <div style={{ flex: '1 1 400px', minWidth: '0' }}>
                <p style={{ margin: '0', fontSize: '14px', fontWeight: '700', color: '#D9601A', letterSpacing: '0.04em' }}>
                  SISTEM KASIR · WARKOP
                </p>
                <h3 style={{ margin: '8px 0 0', fontSize: '34px', fontWeight: '700', letterSpacing: '-0.02em' }}>
                  Kasir Warkop Titik Hoki
                </h3>
                <dl style={{ margin: '24px 0 0', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '16px' }}>
                  <div>
                    <dt style={{ fontWeight: '700' }}>Masalahnya</dt>
                    <dd style={{ margin: '4px 0 0', color: '#4A555E' }}>
                      Pesanan dicatat di kertas, kembalian sering salah hitung, dan rekap jualan tiap malam makan waktu satu jam.
                    </dd>
                  </div>
                  <div>
                    <dt style={{ fontWeight: '700' }}>Yang kami buat</dt>
                    <dd style={{ margin: '4px 0 0', color: '#4A555E' }}>
                      Website kasir di tablet dengan printer struk. Menu per kategori, pesanan per meja, catatan rasa dan suhu, hitung
                      kembalian otomatis, rekap harian, plus menu owner dan pegawai yang dipisah.
                    </dd>
                  </div>
                </dl>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit,minmax(min(130px,100%),1fr))',
                    gap: '12px',
                    marginTop: '24px',
                  }}
                >
                  <div style={{ background: '#FFF6EE', borderRadius: '20px', padding: '16px' }}>
                    <b style={{ display: 'block', fontSize: '26px', letterSpacing: '-0.02em' }}>5 menit</b>
                    <span style={{ fontSize: '13px', color: '#4A555E' }}>rekap harian (dulu 1 jam)</span>
                  </div>
                  <div style={{ background: '#FFF6EE', borderRadius: '20px', padding: '16px' }}>
                    <b style={{ display: 'block', fontSize: '26px', letterSpacing: '-0.02em' }}>0</b>
                    <span style={{ fontSize: '13px', color: '#4A555E' }}>salah hitung kembalian</span>
                  </div>
                  <div style={{ background: '#FFF6EE', borderRadius: '20px', padding: '16px' }}>
                    <b style={{ display: 'block', fontSize: '26px', letterSpacing: '-0.02em' }}>58 mm</b>
                    <span style={{ fontSize: '13px', color: '#4A555E' }}>struk langsung dari printer</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '24px' }}></div>
              </div>
              <div
                style={{
                  flex: '1.4 1 480px',
                  minWidth: '0',
                  background: '#FFE3CF',
                  borderRadius: '28px',
                  padding: 'clamp(18px,3vw,32px) clamp(18px,3vw,32px) clamp(40px,6vw,72px)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    borderRadius: '22px',
                    background: '#1C2125',
                    padding: '12px',
                    boxShadow: '0 24px 40px -20px rgba(38,44,49,0.6)',
                  }}
                >
                  <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#FFFFFF' }}>
                    <img
                      src="/assets/v2/pos-kasir.webp"
                      alt="Layar kasir Warkop Titik Hoki di tablet"
                      style={{ width: '100%', display: 'block' }}
                    />
                  </div>
                </div>
                <div
                  className="posstruk"
                  style={{
                    position: 'absolute',
                    right: 'clamp(8px,3vw,28px)',
                    bottom: '-18px',
                    width: 'clamp(120px,26%,190px)',
                    background: '#FFFFFF',
                    padding: '8px 6px 14px',
                    borderRadius: '4px',
                    boxShadow: '0 18px 30px -10px rgba(38,44,49,0.45)',
                    transform: 'rotate(4deg)',
                  }}
                >
                  <img src="/assets/v2/pos-struk.webp" alt="Contoh struk Warkop Titik Hoki" style={{ width: '100%', display: 'block' }} />
                </div>
              </div>
            </article>
          </>
        )}

        {/* 4. Convera */}
        {cs3 && (
          <>
            <article
              className="chip"
              style={{
                marginTop: '36px',
                background: '#FFFFFF',
                borderRadius: '36px',
                padding: 'clamp(24px,4vw,48px)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '40px',
                alignItems: 'center',
              }}
            >
              <div style={{ flex: '1 1 400px', minWidth: '0' }}>
                <p style={{ margin: '0', fontSize: '14px', fontWeight: '700', color: '#D9601A', letterSpacing: '0.04em' }}>
                  PRODUK KAMI · IKLAN KE WHATSAPP
                </p>
                <h3 style={{ margin: '8px 0 0', fontSize: '34px', fontWeight: '700', letterSpacing: '-0.02em' }}>Convera</h3>
                <dl style={{ margin: '24px 0 0', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '16px' }}>
                  <div>
                    <dt style={{ fontWeight: '700' }}>Masalahnya</dt>
                    <dd style={{ margin: '4px 0 0', color: '#4A555E' }}>
                      Udah pasang iklan di Facebook dan Instagram, tapi gak tau iklan mana yang bikin orang chat WA, apalagi yang sampai
                      beli.
                    </dd>
                  </div>
                  <div>
                    <dt style={{ fontWeight: '700' }}>Yang kami buat</dt>
                    <dd style={{ margin: '4px 0 0', color: '#4A555E' }}>
                      Dashboard yang nyambungin chat WA ke iklannya. Kelihatan iklan mana yang menghasilkan pembeli, dan datanya dikirim
                      balik ke Meta supaya iklan makin tepat sasaran.
                    </dd>
                  </div>
                </dl>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit,minmax(min(130px,100%),1fr))',
                    gap: '12px',
                    marginTop: '24px',
                  }}
                >
                  <div style={{ background: '#FFF6EE', borderRadius: '20px', padding: '16px' }}>
                    <b style={{ display: 'block', fontSize: '26px', letterSpacing: '-0.02em' }}>-50%</b>
                    <span style={{ fontSize: '13px', color: '#4A555E' }}>biaya per hasil iklan</span>
                  </div>
                  <div style={{ background: '#FFF6EE', borderRadius: '20px', padding: '16px' }}>
                    <b style={{ display: 'block', fontSize: '26px', letterSpacing: '-0.02em' }}>Rp7rb</b>
                    <span style={{ fontSize: '13px', color: '#4A555E' }}>per hasil iklan Meta, dulu Rp14rb</span>
                  </div>
                  <div style={{ background: '#FFF6EE', borderRadius: '20px', padding: '16px' }}>
                    <b style={{ display: 'block', fontSize: '26px', letterSpacing: '-0.02em' }}>1</b>
                    <span style={{ fontSize: '13px', color: '#4A555E' }}>dashboard buat semua iklan</span>
                  </div>
                </div>
              </div>
              <div style={{ flex: '1.3 1 460px', minWidth: '0', background: '#FFE3CF', borderRadius: '28px', padding: '28px' }}>
                <div
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    boxShadow: '0 20px 40px -20px rgba(38,44,49,0.4)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 14px', background: '#262C31' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57' }}></span>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FEBC2E' }}></span>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28C840' }}></span>
                    <span style={{ marginLeft: '10px', color: '#D2DADF', fontSize: '12px' }}>convera · Overview</span>
                  </div>
                  <img src="/assets/v2/ss-convera.webp" alt="Dashboard Convera" style={{ width: '100%', display: 'block' }} />
                </div>
              </div>
            </article>
          </>
        )}

        {/* 5. Chatbot toko baju */}
        {cs4 && (
          <>
            <article
              className="chip"
              style={{
                marginTop: '36px',
                background: '#FFFFFF',
                borderRadius: '36px',
                padding: 'clamp(24px,4vw,48px)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '40px',
                alignItems: 'center',
              }}
            >
              <div style={{ flex: '1 1 400px', minWidth: '0' }}>
                <p style={{ margin: '0', fontSize: '14px', fontWeight: '700', color: '#D9601A', letterSpacing: '0.04em' }}>
                  CHATBOT WA · TOKO ONLINE
                </p>
                <h3 style={{ margin: '8px 0 0', fontSize: '34px', fontWeight: '700', letterSpacing: '-0.02em' }}>Bot Toko Baju Rina</h3>
                <dl style={{ margin: '24px 0 0', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '16px' }}>
                  <div>
                    <dt style={{ fontWeight: '700' }}>Masalahnya</dt>
                    <dd style={{ margin: '4px 0 0', color: '#4A555E' }}>
                      80-an chat per hari, admin cuma satu. Banyak pembeli kabur karena kelamaan dibales.
                    </dd>
                  </div>
                  <div>
                    <dt style={{ fontWeight: '700' }}>Yang kami buat</dt>
                    <dd style={{ margin: '4px 0 0', color: '#4A555E' }}>
                      Bot WA pakai AI yang jawab stok dan harga langsung dari Google Sheets. Pesanan otomatis masuk tabel, admin tinggal
                      packing.
                    </dd>
                  </div>
                </dl>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit,minmax(min(130px,100%),1fr))',
                    gap: '12px',
                    marginTop: '24px',
                  }}
                >
                  <div style={{ background: '#FFF6EE', borderRadius: '20px', padding: '16px' }}>
                    <b style={{ display: 'block', fontSize: '26px', letterSpacing: '-0.02em' }}>&lt;10 dtk</b>
                    <span style={{ fontSize: '13px', color: '#4A555E' }}>waktu balas chat</span>
                  </div>
                  <div style={{ background: '#FFF6EE', borderRadius: '20px', padding: '16px' }}>
                    <b style={{ display: 'block', fontSize: '26px', letterSpacing: '-0.02em' }}>+35%</b>
                    <span style={{ fontSize: '13px', color: '#4A555E' }}>pesanan per bulan</span>
                  </div>
                  <div style={{ background: '#FFF6EE', borderRadius: '20px', padding: '16px' }}>
                    <b style={{ display: 'block', fontSize: '26px', letterSpacing: '-0.02em' }}>24 jam</b>
                    <span style={{ fontSize: '13px', color: '#4A555E' }}>jalan tanpa admin</span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  flex: '1.3 1 460px',
                  minWidth: '0',
                  background: '#FFE3CF',
                  borderRadius: '28px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    boxShadow: '0 20px 40px -20px rgba(38,44,49,0.4)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 14px', background: '#262C31' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57' }}></span>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FEBC2E' }}></span>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28C840' }}></span>
                    <span style={{ marginLeft: '10px', color: '#D2DADF', fontSize: '12px' }}>n8n · Workflow bot</span>
                  </div>
                  <img src="/assets/v2/ss-chat.webp" alt="Workflow bot di n8n" style={{ width: '100%', display: 'block' }} />
                </div>
                <div
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    boxShadow: '0 20px 40px -20px rgba(38,44,49,0.4)',
                    width: '70%',
                    alignSelf: 'flex-end',
                    marginTop: '-60px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', background: '#262C31' }}>
                    <span style={{ color: '#D2DADF', fontSize: '11px' }}>Google Sheets · Pesanan</span>
                  </div>
                  <img src="/assets/v2/ss-sheets.webp" alt="Tabel pesanan di Google Sheets" style={{ width: '100%', display: 'block' }} />
                </div>
              </div>
            </article>
          </>
        )}
      </div>
    </section>
  );
}
