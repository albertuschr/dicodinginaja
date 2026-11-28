import React, { useEffect, useRef, useState } from 'react';
import { css, wa, useReducedMotion } from '../lib.js';
import { prodDefs, cats, catLabel, thumbBg } from '../data/products.js';

const waCustom = wa('Halo dicodinginAJA, saya mau konsultasi paket Custom.');

export default function Produk() {
  const reduce = useReducedMotion();
  const [cat, setCat] = useState('Semua');
  const [view, setView] = useState('products');
  const [rot, setRot] = useState(0);
  const [instant, setInstant] = useState(false);
  const flipping = useRef(false);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Animasi "flip" kartu: putar 90°, ganti isi, lanjut dari -90° ke 0°.
  const flipTo = (next) => {
    if (view === next || flipping.current) return;
    flipping.current = true;
    if (reduce) {
      setView(next);
      flipping.current = false;
      return;
    }
    setInstant(false);
    setRot(90);
    timers.current.push(
      setTimeout(() => {
        setView(next);
        setInstant(true);
        setRot(-90);
        const sec = document.getElementById('layanan');
        if (sec && sec.getBoundingClientRect().top < 0) sec.scrollIntoView({ behavior: 'smooth' });
        timers.current.push(
          setTimeout(() => {
            setInstant(false);
            setRot(0);
            flipping.current = false;
          }, 40),
        );
      }, 320),
    );
  };

  const catChips = cats.map((c) => ({
    key: c,
    label: catLabel[c],
    on: c === cat ? 'true' : 'false',
    style: css(
      'min-height:42px;padding:8px 18px;border-radius:999px;font-size:15px;font-weight:600;cursor:pointer;transition:background 0.25s,color 0.25s;' +
        (c === cat
          ? 'background:#EF7A30;color:#262C31;border:1.5px solid #EF7A30'
          : 'background:transparent;color:#FFFFFF;border:1.5px solid #4A535A'),
    ),
    pick: () => setCat(c),
  }));
  const products = prodDefs
    .filter((d) => cat === 'Semua' || d[0] === cat)
    .map((d) => ({
      key: cat + '|' + d[2],
      cat: catLabel[d[0]],
      badge: d[1],
      name: d[2],
      desc: d[3],
      points: d[4].map((t) => ({ t })),
      price: d[5],
      note: d[6],
      priceLabel: d[5] === 'Tanya harga' ? 'Harga' : 'Mulai dari',
      thumb: css(
        'position:relative;height:150px;display:flex;align-items:center;justify-content:center;background-color:' +
          thumbBg[d[0]] +
          ';background-image:repeating-linear-gradient(135deg,rgba(38,44,49,0.05) 0 2px,transparent 2px 14px)',
      ),
      wa: wa('Halo dicodinginAJA, saya mau pesan ' + d[2] + '. Bisa dibantu?'),
      iAuto: d[0] === 'Automation',
      iChat: d[0] === 'Chatbot',
      iConvera: d[0] === 'Convera',
      iWeb: d[0] === 'Website',
      iMobile: d[0] === 'Mobile',
      iPos: d[0] === 'POS',
      iFinance: d[0] === 'Finance',
      iSecurity: d[0] === 'Security',
    }));
  const flipStyle = css(
    'transform:perspective(2400px) rotateY(' +
      rot +
      'deg);transform-origin:50% 0;' +
      (instant ? 'transition:none' : 'transition:transform 0.32s cubic-bezier(.4,0,.2,1)'),
  );
  const showProducts = view === 'products';
  const showCustom = view === 'custom';
  const toCustom = () => flipTo('custom');
  const toProducts = () => flipTo('products');

  return (
    <section id="layanan" style={{ background: '#262C31', padding: '104px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 28px' }}>
        <div style={flipStyle}>
          {showProducts && (
            <>
              <div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    gap: '24px',
                    color: '#FFFFFF',
                  }}
                >
                  <div>
                    <p style={{ margin: '0', fontSize: '14px', fontWeight: '700', letterSpacing: '0.08em', color: '#FFB07A' }}>
                      PRODUK DAN HARGA
                    </p>
                    <h2
                      className="reveal"
                      style={{
                        margin: '12px 0 0',
                        fontSize: 'clamp(32px,4vw,52px)',
                        lineHeight: '1.1',
                        letterSpacing: '-0.025em',
                        fontWeight: '700',
                      }}
                    >
                      Pilih yang siap pakai,
                      <br />
                      atau kami bikinin <span style={{ color: '#EF7A30' }}>khusus.</span>
                    </h2>
                  </div>
                  <p style={{ margin: '0', maxWidth: '380px', color: '#D2DADF', fontSize: '16px' }}>
                    Harga jelas dari awal. Klik <b style={{ color: '#FFFFFF' }}>Pesan</b>, langsung nyambung ke WhatsApp kami.
                  </p>
                </div>

                <div role="group" aria-label="Filter kategori" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '36px' }}>
                  {catChips.map((c) => (
                    <React.Fragment key={c.key}>
                      <button type="button" onClick={c.pick} aria-pressed={c.on} style={c.style}>
                        {c.label}
                      </button>
                    </React.Fragment>
                  ))}
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill,minmax(min(280px,100%),1fr))',
                    gap: '20px',
                    marginTop: '28px',
                  }}
                >
                  {products.map((p) => (
                    <React.Fragment key={p.key}>
                      <article
                        className="lift chip"
                        style={{
                          background: '#FFFFFF',
                          color: '#262C31',
                          borderRadius: '28px',
                          overflow: 'hidden',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <div style={p.thumb}>
                          <span
                            style={{
                              position: 'absolute',
                              left: '14px',
                              top: '14px',
                              background: 'rgba(255,255,255,0.9)',
                              color: '#262C31',
                              fontSize: '12px',
                              fontWeight: '600',
                              padding: '4px 10px',
                              borderRadius: '999px',
                            }}
                          >
                            {p.cat}
                          </span>
                          <span
                            style={{
                              position: 'absolute',
                              right: '14px',
                              top: '14px',
                              background: '#262C31',
                              color: '#FFFFFF',
                              fontSize: '12px',
                              fontWeight: '600',
                              padding: '4px 10px',
                              borderRadius: '999px',
                            }}
                          >
                            {p.badge}
                          </span>
                          <span
                            style={{
                              width: '72px',
                              height: '72px',
                              borderRadius: '22px',
                              background: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 10px 24px -10px rgba(38,44,49,0.35)',
                            }}
                          >
                            {p.iAuto && (
                              <>
                                <svg
                                  aria-hidden="true"
                                  width="36"
                                  height="36"
                                  viewBox="0 0 28 24"
                                  fill="none"
                                  stroke="#D9601A"
                                  strokeWidth="2.2"
                                >
                                  <circle cx="4" cy="12" r="2.8" />
                                  <circle cx="12" cy="12" r="2.8" />
                                  <circle cx="23" cy="6" r="2.8" />
                                  <circle cx="23" cy="18" r="2.8" />
                                  <path d="M6.8 12h2.4M14.8 12h2l3.5-5M16.8 12l3.6 4.6" />
                                </svg>
                              </>
                            )}
                            {p.iChat && (
                              <>
                                <svg
                                  aria-hidden="true"
                                  width="34"
                                  height="34"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#D9601A"
                                  strokeWidth="2"
                                  strokeLinejoin="round"
                                >
                                  <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.6-5.4A8.4 8.4 0 1 1 21 11.5z" />
                                  <path d="M8 11h.01M12 11h.01M16 11h.01" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                              </>
                            )}
                            {p.iConvera && (
                              <>
                                <svg
                                  aria-hidden="true"
                                  width="34"
                                  height="34"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#D9601A"
                                  strokeWidth="2.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M3 20h18" />
                                  <path d="M6 16v-4M11 16V8M16 16v-6M20 16V5" />
                                  <path d="M4 9l5-4 4 3 7-5" />
                                </svg>
                              </>
                            )}
                            {p.iWeb && (
                              <>
                                <svg
                                  aria-hidden="true"
                                  width="34"
                                  height="34"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#D9601A"
                                  strokeWidth="2"
                                  strokeLinejoin="round"
                                >
                                  <rect x="2.5" y="4" width="19" height="15" rx="2.5" />
                                  <path d="M2.5 8.5h19M6 6.3h.01M8.5 6.3h.01" strokeLinecap="round" />
                                </svg>
                              </>
                            )}
                            {p.iMobile && (
                              <>
                                <svg
                                  aria-hidden="true"
                                  width="30"
                                  height="34"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#D9601A"
                                  strokeWidth="2"
                                  strokeLinejoin="round"
                                >
                                  <rect x="6" y="2" width="12" height="20" rx="3" />
                                  <path d="M11 18h2" strokeLinecap="round" />
                                </svg>
                              </>
                            )}
                            {p.iPos && (
                              <>
                                <svg
                                  aria-hidden="true"
                                  width="34"
                                  height="34"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#D9601A"
                                  strokeWidth="2"
                                  strokeLinejoin="round"
                                >
                                  <rect x="3" y="3" width="18" height="12" rx="2" />
                                  <path d="M7 19h10l1 2H6zM12 15v4M7 7h5M7 10h3" />
                                </svg>
                              </>
                            )}
                            {p.iFinance && (
                              <>
                                <svg
                                  aria-hidden="true"
                                  width="34"
                                  height="34"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#D9601A"
                                  strokeWidth="2"
                                  strokeLinejoin="round"
                                >
                                  <rect x="2.5" y="6" width="19" height="13" rx="2.5" />
                                  <circle cx="12" cy="12.5" r="3" />
                                  <path d="M6 9.5h.01M18 15.5h.01" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                              </>
                            )}
                            {p.iSecurity && (
                              <>
                                <svg
                                  aria-hidden="true"
                                  width="32"
                                  height="34"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#D9601A"
                                  strokeWidth="2"
                                  strokeLinejoin="round"
                                >
                                  <path d="M12 2.5l8 3v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10v-6z" />
                                  <path d="M8.5 12l2.5 2.5 4.5-5" strokeLinecap="round" />
                                </svg>
                              </>
                            )}
                          </span>
                        </div>
                        <div style={{ padding: '22px 24px 24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: '1' }}>
                          <h3 style={{ margin: '0', fontSize: '20px', fontWeight: '700', lineHeight: '1.25', letterSpacing: '-0.01em' }}>
                            {p.name}
                          </h3>
                          <p style={{ margin: '0', color: '#4A555E', fontSize: '15px', lineHeight: '1.5' }}>{p.desc}</p>
                          <ul
                            style={{
                              listStyle: 'none',
                              padding: '0',
                              margin: '4px 0 0',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '8px',
                              fontSize: '14px',
                            }}
                          >
                            {p.points.map((pt, ptIdx) => (
                              <React.Fragment key={ptIdx}>
                                <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                  <svg
                                    aria-hidden="true"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#D9601A"
                                    strokeWidth="2.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{ flex: 'none', marginTop: '1px' }}
                                  >
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                  {pt.t}
                                </li>
                              </React.Fragment>
                            ))}
                          </ul>
                          <div
                            style={{
                              marginTop: 'auto',
                              paddingTop: '16px',
                              borderTop: '1px solid #F2E4D8',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-end',
                              gap: '12px',
                            }}
                          >
                            <div style={{ lineHeight: '1.25' }}>
                              <span style={{ fontSize: '12px', color: '#4A555E' }}>{p.priceLabel}</span>
                              <br />
                              <b style={{ fontSize: '21px', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>{p.price}</b>
                              <br />
                              <span style={{ fontSize: '12px', color: '#4A555E' }}>{p.note}</span>
                            </div>
                            <a
                              className="btn"
                              href={p.wa}
                              target="_blank"
                              rel="noopener"
                              style={{
                                flex: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                minHeight: '44px',
                                padding: '10px 18px',
                                borderRadius: '999px',
                                background: '#262C31',
                                color: '#FFFFFF',
                                textDecoration: 'none',
                                fontWeight: '700',
                                fontSize: '15px',
                              }}
                            >
                              Pesan{' '}
                              <svg
                                aria-hidden="true"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M7 17L17 7M8 7h9v9" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </article>
                    </React.Fragment>
                  ))}
                  <article
                    className="spancta lift"
                    style={{
                      borderRadius: '28px',
                      background: '#EF7A30',
                      color: '#262C31',
                      padding: '32px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '24px',
                      minHeight: '300px',
                      backgroundImage: 'repeating-linear-gradient(135deg,rgba(38,44,49,0.06) 0 2px,transparent 2px 16px)',
                    }}
                  >
                    <div>
                      <p style={{ margin: '0', fontSize: '13px', fontWeight: '700', letterSpacing: '0.06em' }}>PROYEK CUSTOM</p>
                      <h3
                        style={{
                          margin: '10px 0 0',
                          fontSize: 'clamp(26px,3vw,34px)',
                          lineHeight: '1.1',
                          letterSpacing: '-0.02em',
                          fontWeight: '700',
                        }}
                      >
                        Gak nemu yang pas?
                        <br />
                        Kami rancang khusus buat usahamu.
                      </h3>
                      <p style={{ margin: '12px 0 0', fontSize: '15px', maxWidth: '440px' }}>
                        Buat alur yang pakai banyak aplikasi, AI, atau aturan kerja sendiri. Mulai Rp1.500.000.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={toCustom}
                      className="btn"
                      style={{
                        alignSelf: 'flex-start',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        minHeight: '52px',
                        padding: '12px 26px',
                        borderRadius: '999px',
                        border: 'none',
                        background: '#262C31',
                        color: '#FFFFFF',
                        fontWeight: '700',
                        fontSize: '17px',
                        cursor: 'pointer',
                      }}
                    >
                      Lihat paket Custom{' '}
                      <svg
                        aria-hidden="true"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" />
                        <path d="M18 3v4h-4M6 21v-4h4" />
                      </svg>
                    </button>
                  </article>
                </div>
              </div>
            </>
          )}

          {showCustom && (
            <>
              <div
                style={{
                  background: '#1C2125',
                  border: '1px solid #3A4249',
                  borderRadius: '36px',
                  padding: 'clamp(24px,5vw,56px)',
                  color: '#FFFFFF',
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
                  <div style={{ flex: '1 1 420px', minWidth: '0' }}>
                    <p style={{ margin: '0', fontSize: '14px', fontWeight: '700', letterSpacing: '0.08em', color: '#FFB07A' }}>
                      PROYEK CUSTOM
                    </p>
                    <h2
                      style={{
                        margin: '12px 0 0',
                        fontSize: 'clamp(32px,4vw,52px)',
                        lineHeight: '1.08',
                        letterSpacing: '-0.025em',
                        fontWeight: '700',
                      }}
                    >
                      Butuh lebih dari template?
                      <br />
                      <span style={{ color: '#EF7A30' }}>Kami rancang dari nol.</span>
                    </h2>
                    <p style={{ margin: '18px 0 0', color: '#D2DADF', fontSize: '17px', maxWidth: '520px' }}>
                      Buat usaha yang pakai banyak aplikasi, AI, atau aturan kerja khusus. Cakupan, revisi, dan dukungan disepakati dari
                      awal.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', marginTop: '28px' }}>
                      <div>
                        <span style={{ fontSize: '13px', color: '#D2DADF' }}>Mulai dari</span>
                        <br />
                        <b style={{ fontSize: '34px', letterSpacing: '-0.02em' }}>Rp1.500.000</b>
                      </div>
                      <div>
                        <span style={{ fontSize: '13px', color: '#D2DADF' }}>Lama pengerjaan</span>
                        <br />
                        <b style={{ fontSize: '34px', letterSpacing: '-0.02em' }}>5+ hari</b>
                      </div>
                    </div>
                    <a
                      className="btn"
                      href={waCustom}
                      target="_blank"
                      rel="noopener"
                      style={{
                        marginTop: '28px',
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
                        fontSize: '17px',
                      }}
                    >
                      Konsultasi gratis via WhatsApp{' '}
                      <svg
                        aria-hidden="true"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17L17 7M8 7h9v9" />
                      </svg>
                    </a>
                  </div>
                  <div
                    style={{
                      flex: '1 1 420px',
                      minWidth: '0',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit,minmax(min(200px,100%),1fr))',
                      gap: '12px',
                      alignContent: 'start',
                    }}
                  >
                    <div
                      className="lift"
                      style={{ background: '#262C31', border: '1px solid #3A4249', borderRadius: '22px', padding: '22px' }}
                    >
                      <b style={{ color: '#EF7A30', fontSize: '14px' }}>01</b>
                      <h3 style={{ margin: '10px 0 6px', fontSize: '19px' }}>Chatbot AI</h3>
                      <p style={{ margin: '0', color: '#D2DADF', fontSize: '14px' }}>
                        WhatsApp atau Telegram yang paham produk dan aturan usahamu.
                      </p>
                    </div>
                    <div
                      className="lift"
                      style={{ background: '#262C31', border: '1px solid #3A4249', borderRadius: '22px', padding: '22px' }}
                    >
                      <b style={{ color: '#EF7A30', fontSize: '14px' }}>02</b>
                      <h3 style={{ margin: '10px 0 6px', fontSize: '19px' }}>Sambung aplikasi</h3>
                      <p style={{ margin: '0', color: '#D2DADF', fontSize: '14px' }}>
                        Marketplace, pembayaran, CRM, dan tools internal jadi satu alur.
                      </p>
                    </div>
                    <div
                      className="lift"
                      style={{ background: '#262C31', border: '1px solid #3A4249', borderRadius: '22px', padding: '22px' }}
                    >
                      <b style={{ color: '#EF7A30', fontSize: '14px' }}>03</b>
                      <h3 style={{ margin: '10px 0 6px', fontSize: '19px' }}>Stok dan dokumen</h3>
                      <p style={{ margin: '0', color: '#D2DADF', fontSize: '14px' }}>Stok, invoice, dan arsip diproses otomatis.</p>
                    </div>
                    <div
                      className="lift"
                      style={{ background: '#262C31', border: '1px solid #3A4249', borderRadius: '22px', padding: '22px' }}
                    >
                      <b style={{ color: '#EF7A30', fontSize: '14px' }}>04</b>
                      <h3 style={{ margin: '10px 0 6px', fontSize: '19px' }}>Kelola tim</h3>
                      <p style={{ margin: '0', color: '#D2DADF', fontSize: '14px' }}>Tugas, absensi, dan laporan harian di satu tempat.</p>
                    </div>
                  </div>
                </div>
                <ol
                  style={{
                    listStyle: 'none',
                    padding: '28px 0 0',
                    margin: '40px 0 0',
                    borderTop: '1px solid #3A4249',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit,minmax(min(180px,100%),1fr))',
                    gap: '20px',
                  }}
                >
                  <li>
                    <b style={{ color: '#EF7A30' }}>1</b>
                    <br />
                    <b style={{ fontSize: '17px' }}>Konsultasi</b>
                    <br />
                    <span style={{ color: '#D2DADF', fontSize: '14px' }}>Kami petakan proses dan kebutuhanmu.</span>
                  </li>
                  <li>
                    <b style={{ color: '#EF7A30' }}>2</b>
                    <br />
                    <b style={{ fontSize: '17px' }}>Penawaran</b>
                    <br />
                    <span style={{ color: '#D2DADF', fontSize: '14px' }}>Cakupan, harga, dan jadwal jelas.</span>
                  </li>
                  <li>
                    <b style={{ color: '#EF7A30' }}>3</b>
                    <br />
                    <b style={{ fontSize: '17px' }}>Pengerjaan</b>
                    <br />
                    <span style={{ color: '#D2DADF', fontSize: '14px' }}>Kami buat, uji, dan perbaiki.</span>
                  </li>
                  <li>
                    <b style={{ color: '#EF7A30' }}>4</b>
                    <br />
                    <b style={{ fontSize: '17px' }}>Serah terima</b>
                    <br />
                    <span style={{ color: '#D2DADF', fontSize: '14px' }}>Panduan, pelatihan, dan dukungan.</span>
                  </li>
                </ol>
                <div style={{ marginTop: '36px', display: 'flex', justifyContent: 'center' }}>
                  <button
                    type="button"
                    onClick={toProducts}
                    className="btn"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      minHeight: '50px',
                      padding: '12px 26px',
                      borderRadius: '999px',
                      border: '1.5px solid #FFFFFF',
                      background: 'transparent',
                      color: '#FFFFFF',
                      fontWeight: '700',
                      fontSize: '16px',
                      cursor: 'pointer',
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" />
                      <path d="M18 3v4h-4M6 21v-4h4" />
                    </svg>
                    Balik ke produk siap pakai
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
