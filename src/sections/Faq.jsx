import React, { useState } from 'react';
import { css } from '../lib.js';
import { faqDefs } from '../data/faqs.js';

export default function Faq() {
  const [faqOpen, setFaqOpen] = useState(0);
  const faqs = faqDefs.map((d, i) => {
    const open = faqOpen === i;
    return {
      q: d[0],
      a: d[1],
      open,
      panelStyle: css(
        'display:grid;transition:grid-template-rows 0.4s cubic-bezier(.2,.8,.2,1),opacity 0.4s;' +
          (open ? 'grid-template-rows:1fr;opacity:1' : 'grid-template-rows:0fr;opacity:0'),
      ),
      iconStyle: css(
        'flex:none;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;line-height:1;transition:transform 0.3s,background 0.3s;' +
          (open ? 'background:#EF7A30;color:#262C31;transform:rotate(45deg)' : 'background:#FFF6EE;color:#262C31'),
      ),
      toggle: () => setFaqOpen(open ? -1 : i),
    };
  });

  return (
    <section id="bantuan" style={{ background: '#FFF6EE', padding: '104px 0' }}>
      <div
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '0 28px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ flex: '1 1 300px', minWidth: '0', textAlign: 'center' }}>
          <h2
            className="reveal"
            style={{ margin: '0', fontSize: 'clamp(32px,4vw,52px)', lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '700' }}
          >
            Masih ragu?
            <br />
            Wajar kok.
          </h2>
          <img
            className="wiggle"
            src="/assets/v2/pose-bingung.webp"
            alt="Maskot menggaruk kepala dengan tanda tanya"
            style={{ height: '400px', marginTop: '20px', objectFit: 'contain' }}
          />
        </div>
        <div style={{ flex: '1.8 1 520px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((f, fIdx) => (
            <React.Fragment key={fIdx}>
              <div style={{ background: '#FFFFFF', borderRadius: '24px', overflow: 'hidden' }}>
                <h3 style={{ margin: '0' }}>
                  <button
                    type="button"
                    onClick={f.toggle}
                    aria-expanded={f.open}
                    style={{
                      width: '100%',
                      minHeight: '72px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '20px 28px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      fontSize: '19px',
                      fontWeight: '600',
                      color: '#262C31',
                      cursor: 'pointer',
                    }}
                  >
                    <span>{f.q}</span>
                    <span aria-hidden="true" style={f.iconStyle}>
                      +
                    </span>
                  </button>
                </h3>
                <div style={f.panelStyle}>
                  <div style={{ overflow: 'hidden' }}>
                    <p style={{ margin: '0', padding: '0 28px 24px', color: '#3A454E', fontSize: '17px' }}>{f.a}</p>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
