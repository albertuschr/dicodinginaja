import { links } from '../lib.js';
import { SocialLinks } from '../components/shared.jsx';

export default function Footer() {
  const { waLink } = links;

  return (
    <footer style={{ background: '#1C2125', color: '#D2DADF' }}>
      <div
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '56px 28px 40px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '40px',
        }}
      >
        <div style={{ maxWidth: '320px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
            <span style={{ fontWeight: '700', fontSize: '21px', color: '#FFFFFF' }}>
              dicodingin<span style={{ color: '#EF7A30' }}>AJA</span>
            </span>
          </div>
          <p style={{ margin: '16px 0 0', fontSize: '15px' }}>#BiarSistemYangKerja</p>
          <SocialLinks style={{ display: 'flex', gap: '10px', marginTop: '20px' }} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '56px', fontSize: '15px' }}>
          <div>
            <b style={{ display: 'block', color: '#FFFFFF', marginBottom: '12px' }}>Layanan</b>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="#layanan" style={{ color: '#D2DADF', textDecoration: 'none' }}>
                Chatbot WhatsApp
              </a>
              <a href="#layanan" style={{ color: '#D2DADF', textDecoration: 'none' }}>
                Catat pesanan
              </a>
              <a href="#layanan" style={{ color: '#D2DADF', textDecoration: 'none' }}>
                Convera
              </a>
            </div>
          </div>
          <div>
            <b style={{ display: 'block', color: '#FFFFFF', marginBottom: '12px' }}>Bantuan</b>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="#layanan" style={{ color: '#D2DADF', textDecoration: 'none' }}>
                Harga
              </a>
              <a href="#bantuan" style={{ color: '#D2DADF', textDecoration: 'none' }}>
                Tanya jawab
              </a>
              <a href={waLink} target="_blank" rel="noopener" style={{ color: '#D2DADF', textDecoration: 'none' }}>
                WA 0812-9573-1556
              </a>
            </div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '20px 28px 32px', borderTop: '1px solid #3A4249', fontSize: '14px' }}>
        © 2026 dicodinginAJA
      </div>
    </footer>
  );
}
