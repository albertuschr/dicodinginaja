import React from 'react';
import { css, useCycle, useMediaQuery } from '../lib.js';
import { testiAll } from '../data/testimonials.js';

export default function Testimoni() {
  // Laptop: 2 kartu per layar → 3 posisi geser. HP: 1 kartu per layar → 4 posisi (biar kartu terakhir kelihatan).
  const single = useMediaQuery('(max-width:760px)');
  const pages = single ? testiAll.length : testiAll.length - 1;
  const [slideRaw, pick] = useCycle(pages, 6000, { restartMs: 5200 });
  const s = slideRaw % pages;
  const testi = testiAll;
  const trackStyle = css('display:flex;gap:24px;transform:translateX(calc(-1 * ' + s + ' * var(--step)))');
  const dots = Array.from({ length: pages }, (_, i) => ({
    label: 'Testimoni ' + (i + 1),
    style: css(
      'display:block;height:10px;border-radius:999px;transition:width 0.3s,background 0.3s;' +
        (i === s ? 'width:28px;background:#EF7A30' : 'width:10px;background:#F2C9AE'),
    ),
    pick: () => pick(i),
  }));
  const prev = () => pick(s - 1);
  const next = () => pick(s + 1);

  return (
    <section style={{ padding: '104px 0' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 28px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
          <h2
            className="reveal"
            style={{ margin: '0', fontSize: 'clamp(32px,4vw,52px)', lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '700' }}
          >
            Chat dari klien kami
          </h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={prev}
              aria-label="Sebelumnya"
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                border: '2px solid #262C31',
                background: '#FFFFFF',
                cursor: 'pointer',
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
                stroke="#262C31"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Berikutnya"
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                border: 'none',
                background: '#262C31',
                cursor: 'pointer',
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
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginTop: '40px', alignItems: 'stretch' }}>
          <div style={{ flex: '0 1 240px', minWidth: '0', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
            <img
              src="/assets/v2/pose-jempol.webp"
              alt="Maskot mengangkat jempol"
              style={{ height: '380px', objectFit: 'contain', display: 'block' }}
            />
          </div>
          <div style={{ flex: '1 1 640px', minWidth: '0', overflow: 'hidden' }}>
            <div className="ttrack" style={trackStyle}>
              {testi.map((t, tIdx) => (
                <React.Fragment key={tIdx}>
                  <figure className="tcard" style={{ margin: '0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div
                      style={{
                        borderRadius: '28px',
                        overflow: 'hidden',
                        background: '#EFEAE2',
                        boxShadow: '0 20px 40px -24px rgba(38,44,49,0.45)',
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '400px',
                      }}
                    >
                      <div
                        style={{
                          background: '#075E54',
                          color: '#FFFFFF',
                          padding: '14px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                        }}
                      >
                        <span
                          className="blurname"
                          style={{ width: '40px', height: '40px', borderRadius: '50%', background: `${t.avatar}`, flex: 'none' }}
                        ></span>
                        <span style={{ lineHeight: '1.25' }}>
                          <b className="blurname" style={{ fontSize: '15px', display: 'inline-block' }}>
                            {t.name}
                          </b>
                          <br />
                          <span style={{ fontSize: '12px', opacity: '0.85' }}>{t.biz}</span>
                        </span>
                      </div>
                      <div
                        style={{
                          flex: '1',
                          padding: '16px 12px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          fontSize: '14px',
                          lineHeight: '1.45',
                        }}
                      >
                        <span
                          style={{
                            alignSelf: 'center',
                            background: '#FFFFFF',
                            color: '#4A555E',
                            fontSize: '11px',
                            padding: '3px 10px',
                            borderRadius: '8px',
                          }}
                        >
                          {t.day}
                        </span>
                        {t.msgs.map((m, mIdx) => (
                          <React.Fragment key={mIdx}>
                            <div style={m.style}>
                              {m.text}
                              <span
                                style={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  alignItems: 'center',
                                  gap: '4px',
                                  fontSize: '11px',
                                  color: '#667781',
                                  marginTop: '2px',
                                }}
                              >
                                {m.time}
                                {m.me && (
                                  <>
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
                                  </>
                                )}
                              </span>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    <figcaption style={{ fontSize: '14px', color: '#4A555E', padding: '0 8px' }}>
                      <b style={{ color: '#262C31' }}>{t.biz}</b> · nama disamarkan atas izin klien
                    </figcaption>
                  </figure>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '28px' }}>
          {dots.map((d, dIdx) => (
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
    </section>
  );
}
