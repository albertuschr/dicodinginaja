import { links } from '../lib.js';
import { WaIcon } from '../components/shared.jsx';

export default function Navbar() {
  const { waLink } = links;

  return (
    <header style={{ position: 'sticky', top: '0', zIndex: '20', background: '#262C31' }}>
      <div
        className="navin"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '14px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
        }}
      >
        <a href="#beranda" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <span
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src="/assets/v2/logo.webp" alt="" style={{ width: '30px', height: '30px' }} />
          </span>
          <span className="navbrand" style={{ fontWeight: '700', fontSize: '21px', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            dicodingin<span style={{ color: '#EF7A30' }}>AJA</span>
          </span>
        </a>
        <nav className="navlinks" aria-label="Menu utama" style={{ display: 'flex', gap: '26px', fontWeight: '600', fontSize: '16px' }}>
          <a href="#beranda" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
            Beranda
          </a>
          <a href="#layanan" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
            Layanan
          </a>
          <a href="#demo" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
            Coba bot
          </a>
          <a href="#project" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
            Project
          </a>
          <a href="#bantuan" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
            Bantuan
          </a>
        </nav>
        <a
          href={waLink}
          target="_blank"
          rel="noopener"
          className="btn navcta"
          aria-label="Chat kami di WhatsApp"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            minHeight: '44px',
            padding: '10px 22px',
            borderRadius: '999px',
            background: '#EF7A30',
            color: '#262C31',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '16px',
          }}
        >
          <WaIcon size={20} color="#262C31" flexNone />
          <span className="navlabel">Chat kami</span>
        </a>
      </div>
    </header>
  );
}
