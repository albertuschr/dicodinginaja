import React, { useEffect, useReducer, useRef } from 'react';
import { css, wa, useReducedMotion } from '../lib.js';
import { WaIcon } from '../components/shared.jsx';

const waDemo = wa('Halo kak, kaos hitam oversize size L masih ada?');
const STEPS = 14;
const TICK = 850;

function reducer(s, a) {
  if (a === 'reset') return { ...s, step: 0 };
  if (a === 'tick') {
    const n = (s.step + 1) % STEPS;
    return { step: n, execs: n === 10 ? s.execs + 1 : s.execs };
  }
  if (typeof a === 'object' && a.scale) return { ...s, scale: a.scale };
  return s;
}

export default function Demo() {
  const reduce = useReducedMotion();
  const [{ step: k, execs, scale: sc = 0.86 }, dispatch] = useReducer(reducer, { step: 10, execs: 1284, scale: 0.86 });
  const timer = useRef(null);

  const startTicking = () => {
    clearInterval(timer.current);
    timer.current = setInterval(() => dispatch('tick'), TICK);
  };
  useEffect(() => {
    if (reduce) return undefined;
    startTicking();
    return () => clearInterval(timer.current);
  }, [reduce]);

  // Canvas n8n lebarnya 900px, di-scale biar pas sama lebar kontainer.
  useEffect(() => {
    const fit = document.getElementById('n8nfit');
    if (!fit || !('ResizeObserver' in window)) return undefined;
    const ro = new ResizeObserver((es) => {
      const w = es[0].contentRect.width;
      if (w > 0) dispatch({ scale: Math.min(1.25, w / 900) });
    });
    ro.observe(fit);
    return () => ro.disconnect();
  }, []);

  const ph = (run, done) => ({ run, done });
  const boxCss = (st, radius, w, h) =>
    css(
      'position:relative;width:' +
        w +
        ';height:' +
        h +
        ';border-radius:' +
        radius +
        ';background:#3A3E44;display:flex;align-items:center;justify-content:center;transition:border-color 0.3s,box-shadow 0.3s;' +
        (st.run
          ? 'border:2px solid #FF9B45;box-shadow:0 0 0 6px rgba(255,155,69,0.18)'
          : st.done
            ? 'border:2px solid #3FB950'
            : 'border:2px solid #64696F'),
    );
  const tr = ph(k === 1, k >= 2),
    ag = ph(k >= 3 && k <= 5, k >= 6),
    sh = ph(k === 7, k >= 8),
    sd = ph(k === 9, k >= 10);
  const sub = (i) => ph(k === 3 + i, k >= 4 + i);
  const nTrig = { box: boxCss(tr, '55px 16px 16px 55px', '110px', '110px'), ...tr };
  const nAgent = { box: boxCss(ag, '16px', '230px', '110px'), ...ag };
  const nSheet = { box: boxCss(sh, '16px', '110px', '110px'), ...sh };
  const nSend = { box: boxCss(sd, '16px', '110px', '110px'), ...sd };
  const sModel = { box: boxCss(sub(0), '50%', '64px', '64px') };
  const sMem = { box: boxCss(sub(1), '50%', '64px', '64px') };
  const sTool = { box: boxCss(sub(2), '50%', '64px', '64px') };
  const edge = (on) => ({
    cls: on ? 'flow' : '',
    done: on,
    st: css(on ? 'stroke:#3FB950;stroke-width:2.5' : 'stroke:#6B7078;stroke-width:2'),
    fill: css(on ? 'fill:#3FB950' : 'fill:#6B7078'),
  });
  const subLine = (i) => css(k >= 3 + i ? 'stroke:#3FB950;stroke-width:2' : 'stroke:#6B7078;stroke-width:1.5');
  const e1 = edge(k >= 2),
    e2 = edge(k >= 6),
    e3 = edge(k >= 8);
  const l1 = subLine(0),
    l2 = subLine(1),
    l3 = subLine(2);
  const n8nH = Math.round(460 * sc) + 'px';
  const n8nInner = css(
    'position:absolute;left:0;top:0;width:900px;height:460px;transform-origin:0 0;transform:scale(' + sc.toFixed(4) + ')',
  );
  const toast = k >= 10;
  const execCount = execs.toLocaleString('id-ID');
  const showQ = k >= 1,
    showTyping = k >= 3 && k < 10,
    showA = k >= 10,
    showSheet = k >= 8;
  const phoneStatus = k >= 3 && k < 10 ? 'sedang mengetik…' : 'online';
  const runDemo = () => {
    dispatch('reset');
    if (!reduce) startTicking();
  };

  return (
    <>
      <section id="demo" style={{ background: '#262C31', padding: '104px 0', color: '#FFFFFF' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 28px' }}>
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>
            <p
              style={{
                margin: '0',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(239,122,48,0.16)',
                color: '#FFB07A',
                fontWeight: '600',
                fontSize: '14px',
                padding: '6px 14px',
                borderRadius: '999px',
              }}
            >
              <span className="livedot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3FB950' }}></span>Live demo
            </p>
            <h2
              className="reveal"
              style={{
                margin: '16px 0 0',
                fontSize: 'clamp(32px,4vw,52px)',
                lineHeight: '1.1',
                letterSpacing: '-0.025em',
                fontWeight: '700',
              }}
            >
              Lihat botnya kerja,
              <br />
              detik demi detik
            </h2>
            <p style={{ margin: '16px 0 0', fontSize: '18px', color: '#D2DADF' }}>
              Kiri: "otak" bot di n8n. Kanan: yang dilihat pelanggan di WhatsApp. Semua kejadian dalam hitungan detik.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px', marginTop: '56px', alignItems: 'stretch' }}>
            {/* n8n canvas */}
            <div
              style={{
                flex: '1.7 1 560px',
                minWidth: '0',
                borderRadius: '28px',
                overflow: 'hidden',
                border: '1px solid #3A4249',
                background: '#2B2E33',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px 12px',
                  padding: '12px 18px',
                  background: '#232528',
                  borderBottom: '1px solid #3A3D42',
                  fontSize: '13px',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <b style={{ fontSize: '14px' }}>Bot Toko Baju</b>
                  <span style={{ color: '#9AA0A6' }}>/ Workflow</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#C9CDD2' }}>
                    Active
                    <span
                      style={{
                        width: '34px',
                        height: '18px',
                        borderRadius: '999px',
                        background: '#3FB950',
                        position: 'relative',
                        display: 'inline-block',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          right: '2px',
                          top: '2px',
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          background: '#FFFFFF',
                        }}
                      ></span>
                    </span>
                  </span>
                  <span className="hide-sm" style={{ color: '#9AA0A6' }}>
                    Executions: <b style={{ color: '#FFFFFF' }}>{execCount}</b>
                  </span>
                  <button
                    type="button"
                    onClick={runDemo}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      minHeight: '36px',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#EF7A30',
                      color: '#262C31',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                  >
                    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="#262C31">
                      <polygon points="6 4 20 12 6 20" />
                    </svg>
                    Test workflow
                  </button>
                </span>
              </div>
              <div id="n8nfit" className="n8ngrid" style={{ position: 'relative', height: `${n8nH}`, overflow: 'hidden' }}>
                <div style={n8nInner}>
                  <svg aria-hidden="true" width="900" height="460" viewBox="0 0 900 460" style={{ position: 'absolute', inset: '0' }}>
                    <path d="M140 175 L212 175" className={e1.cls} style={e1.st} fill="none" />
                    <path d="M480 175 L562 175" className={e2.cls} style={e2.st} fill="none" />
                    <path d="M680 175 L752 175" className={e3.cls} style={e3.st} fill="none" />
                    <polygon points="212,169 220,175 212,181" style={e1.fill} />
                    <polygon points="562,169 570,175 562,181" style={e2.fill} />
                    <polygon points="752,169 760,175 752,181" style={e3.fill} />
                    <circle cx="140" cy="175" r="5" fill="#8A9097" />
                    <circle cx="480" cy="175" r="5" fill="#8A9097" />
                    <circle cx="680" cy="175" r="5" fill="#8A9097" />
                    <path d="M265 236 L265 312" strokeDasharray="5 5" style={l1} fill="none" />
                    <path d="M350 236 L350 312" strokeDasharray="5 5" style={l2} fill="none" />
                    <path d="M435 236 L435 312" strokeDasharray="5 5" style={l3} fill="none" />
                    <rect x="260" y="225" width="10" height="10" transform="rotate(45 265 230)" fill="#C9CDD2" />
                    <rect x="345" y="225" width="10" height="10" transform="rotate(45 350 230)" fill="#C9CDD2" />
                    <rect x="430" y="225" width="10" height="10" transform="rotate(45 435 230)" fill="#C9CDD2" />
                  </svg>

                  {e1.done && (
                    <>
                      <span
                        className="chip"
                        style={{ position: 'absolute', left: '152px', top: '150px', fontSize: '11px', color: '#3FB950', fontWeight: '600' }}
                      >
                        1 item
                      </span>
                    </>
                  )}
                  {e2.done && (
                    <>
                      <span
                        className="chip"
                        style={{ position: 'absolute', left: '496px', top: '150px', fontSize: '11px', color: '#3FB950', fontWeight: '600' }}
                      >
                        1 item
                      </span>
                    </>
                  )}
                  {e3.done && (
                    <>
                      <span
                        className="chip"
                        style={{ position: 'absolute', left: '690px', top: '150px', fontSize: '11px', color: '#3FB950', fontWeight: '600' }}
                      >
                        1 item
                      </span>
                    </>
                  )}

                  {/* Trigger node */}
                  <div style={{ position: 'absolute', left: '30px', top: '120px', width: '110px', height: '110px' }}>
                    <div style={nTrig.box}>
                      <WaIcon size={46} color="#25D366" />
                      <span
                        style={{
                          position: 'absolute',
                          left: '-14px',
                          top: '40px',
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: '#2B2E33',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="#FF9B45">
                          <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
                        </svg>
                      </span>
                      {nTrig.run && (
                        <>
                          <span
                            className="spin"
                            style={{
                              position: 'absolute',
                              right: '8px',
                              bottom: '8px',
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              border: '3px solid rgba(255,155,69,0.3)',
                              borderTopColor: '#FF9B45',
                            }}
                          ></span>
                        </>
                      )}
                      {nTrig.done && (
                        <>
                          <span
                            className="chip"
                            style={{
                              position: 'absolute',
                              right: '8px',
                              bottom: '8px',
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              background: '#3FB950',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <svg
                              aria-hidden="true"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#FFFFFF"
                              strokeWidth="4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                        </>
                      )}
                    </div>
                    <p
                      style={{
                        margin: '10px 0 0',
                        textAlign: 'center',
                        fontSize: '13px',
                        fontWeight: '600',
                        lineHeight: '1.3',
                        width: '150px',
                        marginLeft: '-20px',
                      }}
                    >
                      WhatsApp Trigger
                      <br />
                      <span style={{ fontWeight: '400', color: '#9AA0A6', fontSize: '12px' }}>On new message</span>
                    </p>
                  </div>

                  {/* AI Agent */}
                  <div style={{ position: 'absolute', left: '220px', top: '120px', width: '260px', height: '110px' }}>
                    <div style={nAgent.box}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <svg
                          aria-hidden="true"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#FFFFFF"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="4" y="8" width="16" height="12" rx="3" />
                          <path d="M12 8V4" />
                          <circle cx="12" cy="3" r="1" />
                          <circle cx="9" cy="14" r="1.3" fill="#FFFFFF" />
                          <circle cx="15" cy="14" r="1.3" fill="#FFFFFF" />
                          <path d="M2 13v2M22 13v2" />
                        </svg>
                        <span style={{ fontSize: '15px', fontWeight: '700', lineHeight: '1.2' }}>
                          AI Agent
                          <br />
                          <span style={{ fontWeight: '400', color: '#9AA0A6', fontSize: '12px' }}>Tools Agent</span>
                        </span>
                      </span>
                      {nAgent.run && (
                        <>
                          <span
                            className="spin"
                            style={{
                              position: 'absolute',
                              right: '10px',
                              bottom: '10px',
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              border: '3px solid rgba(255,155,69,0.3)',
                              borderTopColor: '#FF9B45',
                            }}
                          ></span>
                        </>
                      )}
                      {nAgent.done && (
                        <>
                          <span
                            className="chip"
                            style={{
                              position: 'absolute',
                              right: '10px',
                              bottom: '10px',
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              background: '#3FB950',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <svg
                              aria-hidden="true"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#FFFFFF"
                              strokeWidth="4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                        </>
                      )}
                    </div>
                    <span
                      style={{
                        position: 'absolute',
                        left: '15px',
                        top: '124px',
                        width: '60px',
                        textAlign: 'center',
                        fontSize: '10px',
                        color: '#9AA0A6',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Chat Model
                    </span>
                    <span
                      style={{
                        position: 'absolute',
                        left: '100px',
                        top: '124px',
                        width: '60px',
                        textAlign: 'center',
                        fontSize: '11px',
                        color: '#9AA0A6',
                      }}
                    >
                      Memory
                    </span>
                    <span
                      style={{
                        position: 'absolute',
                        left: '185px',
                        top: '124px',
                        width: '60px',
                        textAlign: 'center',
                        fontSize: '11px',
                        color: '#9AA0A6',
                      }}
                    >
                      Tool
                    </span>
                  </div>

                  {/* Sub nodes */}
                  <div style={{ position: 'absolute', left: '233px', top: '312px', width: '64px', textAlign: 'center' }}>
                    <div style={sModel.box}>
                      <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="#8AB4F8">
                        <path d="M12 1.5c.6 5.6 4.9 9.9 10.5 10.5-5.6.6-9.9 4.9-10.5 10.5C11.4 16.9 7.1 12.6 1.5 12 7.1 11.4 11.4 7.1 12 1.5z" />
                      </svg>
                    </div>
                    <p
                      style={{
                        margin: '8px 0 0',
                        fontSize: '11px',
                        lineHeight: '1.25',
                        width: '80px',
                        marginLeft: '-8px',
                        color: '#C9CDD2',
                      }}
                    >
                      Gemini
                      <br />
                      Chat Model
                    </p>
                  </div>
                  <div style={{ position: 'absolute', left: '318px', top: '312px', width: '64px', textAlign: 'center' }}>
                    <div style={sMem.box}>
                      <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9CDD2" strokeWidth="2">
                        <ellipse cx="12" cy="5" rx="8" ry="3" />
                        <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
                        <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
                      </svg>
                    </div>
                    <p
                      style={{
                        margin: '8px 0 0',
                        fontSize: '11px',
                        lineHeight: '1.25',
                        width: '80px',
                        marginLeft: '-8px',
                        color: '#C9CDD2',
                      }}
                    >
                      Simple
                      <br />
                      Memory
                    </p>
                  </div>
                  <div style={{ position: 'absolute', left: '403px', top: '312px', width: '64px', textAlign: 'center' }}>
                    <div style={sTool.box}>
                      <svg aria-hidden="true" width="24" height="26" viewBox="0 0 22 24">
                        <path d="M3 1h11l6 6v14.5A1.5 1.5 0 0 1 18.5 23h-15A1.5 1.5 0 0 1 2 21.5v-19A1.5 1.5 0 0 1 3 1z" fill="#34A853" />
                        <path d="M6 11h10v8H6zM6 15h10M11 11v8" fill="none" stroke="#FFFFFF" strokeWidth="1.6" />
                      </svg>
                    </div>
                    <p
                      style={{
                        margin: '8px 0 0',
                        fontSize: '11px',
                        lineHeight: '1.25',
                        width: '80px',
                        marginLeft: '-8px',
                        color: '#C9CDD2',
                      }}
                    >
                      Cek stok
                      <br />
                      (Sheets)
                    </p>
                  </div>

                  {/* Sheets append */}
                  <div style={{ position: 'absolute', left: '570px', top: '120px', width: '110px', height: '110px' }}>
                    <div style={nSheet.box}>
                      <svg aria-hidden="true" width="40" height="44" viewBox="0 0 22 24">
                        <path d="M3 1h11l6 6v14.5A1.5 1.5 0 0 1 18.5 23h-15A1.5 1.5 0 0 1 2 21.5v-19A1.5 1.5 0 0 1 3 1z" fill="#34A853" />
                        <path d="M6 11h10v8H6zM6 15h10M11 11v8" fill="none" stroke="#FFFFFF" strokeWidth="1.6" />
                      </svg>
                      {nSheet.run && (
                        <>
                          <span
                            className="spin"
                            style={{
                              position: 'absolute',
                              right: '8px',
                              bottom: '8px',
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              border: '3px solid rgba(255,155,69,0.3)',
                              borderTopColor: '#FF9B45',
                            }}
                          ></span>
                        </>
                      )}
                      {nSheet.done && (
                        <>
                          <span
                            className="chip"
                            style={{
                              position: 'absolute',
                              right: '8px',
                              bottom: '8px',
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              background: '#3FB950',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <svg
                              aria-hidden="true"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#FFFFFF"
                              strokeWidth="4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                        </>
                      )}
                    </div>
                    <p
                      style={{
                        margin: '10px 0 0',
                        textAlign: 'center',
                        fontSize: '13px',
                        fontWeight: '600',
                        lineHeight: '1.3',
                        width: '150px',
                        marginLeft: '-20px',
                      }}
                    >
                      Google Sheets
                      <br />
                      <span style={{ fontWeight: '400', color: '#9AA0A6', fontSize: '12px' }}>append: row</span>
                    </p>
                  </div>

                  {/* WA send */}
                  <div style={{ position: 'absolute', left: '760px', top: '120px', width: '110px', height: '110px' }}>
                    <div style={nSend.box}>
                      <WaIcon size={46} color="#25D366" />
                      {nSend.run && (
                        <>
                          <span
                            className="spin"
                            style={{
                              position: 'absolute',
                              right: '8px',
                              bottom: '8px',
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              border: '3px solid rgba(255,155,69,0.3)',
                              borderTopColor: '#FF9B45',
                            }}
                          ></span>
                        </>
                      )}
                      {nSend.done && (
                        <>
                          <span
                            className="chip"
                            style={{
                              position: 'absolute',
                              right: '8px',
                              bottom: '8px',
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              background: '#3FB950',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <svg
                              aria-hidden="true"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#FFFFFF"
                              strokeWidth="4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                        </>
                      )}
                    </div>
                    <p
                      style={{
                        margin: '10px 0 0',
                        textAlign: 'center',
                        fontSize: '13px',
                        fontWeight: '600',
                        lineHeight: '1.3',
                        width: '150px',
                        marginLeft: '-20px',
                      }}
                    >
                      WhatsApp
                      <br />
                      <span style={{ fontWeight: '400', color: '#9AA0A6', fontSize: '12px' }}>send: message</span>
                    </p>
                  </div>

                  {/* toast */}
                  {toast && (
                    <>
                      <div
                        className="chip"
                        style={{
                          position: 'absolute',
                          right: '20px',
                          bottom: '24px',
                          background: '#1F2124',
                          border: '1px solid #3FB950',
                          borderRadius: '12px',
                          padding: '10px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          fontSize: '13px',
                        }}
                      >
                        <span
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: '#3FB950',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <svg
                            aria-hidden="true"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>
                          <b>Workflow executed successfully</b>
                          <br />
                          <span style={{ color: '#9AA0A6' }}>dalam 3,2 detik</span>
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* phone */}
            <div
              style={{
                flex: '1 1 300px',
                minWidth: '0',
                maxWidth: '420px',
                margin: '0 auto',
                width: '100%',
                borderRadius: '36px',
                background: '#111518',
                padding: '10px',
                boxShadow: '0 30px 60px -24px rgba(0,0,0,0.6)',
              }}
            >
              <div
                style={{
                  borderRadius: '28px',
                  overflow: 'hidden',
                  background: '#EFEAE2',
                  color: '#262C31',
                  height: '100%',
                  minHeight: '440px',
                  display: 'flex',
                  flexDirection: 'column',
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
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: '#FFE3CF',
                      color: '#D9601A',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                    }}
                  >
                    TB
                  </span>
                  <span style={{ lineHeight: '1.25' }}>
                    <b style={{ fontSize: '15px' }}>Toko Baju Rina</b>
                    <br />
                    <span style={{ fontSize: '12px', opacity: '0.85' }}>{phoneStatus}</span>
                  </span>
                </div>
                <div
                  aria-live="polite"
                  style={{
                    flex: '1',
                    padding: '16px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
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
                    Hari ini
                  </span>
                  {showQ && (
                    <>
                      <div
                        className="chip"
                        style={{
                          alignSelf: 'flex-start',
                          maxWidth: '84%',
                          background: '#FFFFFF',
                          padding: '8px 12px',
                          borderRadius: '4px 12px 12px 12px',
                        }}
                      >
                        Kak, kaos hitam oversize size L masih ada? Harganya berapa?
                        <span style={{ display: 'block', textAlign: 'right', fontSize: '11px', color: '#667781', marginTop: '2px' }}>
                          23.41
                        </span>
                      </div>
                    </>
                  )}
                  {showTyping && (
                    <>
                      <div
                        className="chip"
                        style={{
                          alignSelf: 'flex-end',
                          background: '#D9FDD3',
                          padding: '10px 14px',
                          borderRadius: '12px 4px 12px 12px',
                          display: 'flex',
                          gap: '4px',
                        }}
                      >
                        <span className="dot1" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#667781' }}></span>
                        <span className="dot2" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#667781' }}></span>
                        <span className="dot3" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#667781' }}></span>
                      </div>
                    </>
                  )}
                  {showA && (
                    <>
                      <div
                        className="chip"
                        style={{
                          alignSelf: 'flex-end',
                          maxWidth: '84%',
                          background: '#D9FDD3',
                          padding: '8px 12px',
                          borderRadius: '12px 4px 12px 12px',
                        }}
                      >
                        Masih ada kak, sisa 4 pcs. Harganya Rp89.000. Mau langsung order? Ketik nama dan alamat ya, nanti ongkirnya
                        dihitungin.
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
                          23.41{' '}
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
                    </>
                  )}
                  {showSheet && (
                    <>
                      <div
                        className="chip"
                        style={{
                          alignSelf: 'center',
                          marginTop: 'auto',
                          background: '#FFFFFF',
                          border: '1px solid #DDE5DA',
                          borderRadius: '12px',
                          padding: '8px 12px',
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <svg aria-hidden="true" width="14" height="16" viewBox="0 0 22 24">
                          <path d="M3 1h11l6 6v14.5A1.5 1.5 0 0 1 18.5 23h-15A1.5 1.5 0 0 1 2 21.5v-19A1.5 1.5 0 0 1 3 1z" fill="#34A853" />
                        </svg>
                        <span>
                          <b>Baris baru di Sheets:</b> Pembeli · Kaos hitam L · Tanya stok
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <a
              className="btn pulse"
              href={waDemo}
              target="_blank"
              rel="noopener"
              style={{
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
              <WaIcon size={24} color="#262C31" flexNone />
              Coba bot-nya sekarang
            </a>
            <p style={{ margin: '14px 0 0', fontSize: '15px', color: '#D2DADF', maxWidth: '520px' }}>
              Bot demo ini pura-pura jadi toko baju. Tanya stok, harga, atau ongkir. Dibales otomatis, 24 jam.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
