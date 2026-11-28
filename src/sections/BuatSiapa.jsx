import { wa } from '../lib.js';

const waToko = wa('Halo dicodinginAJA, saya punya toko online, mau tanya soal bot WA.');
const waLaundry = wa('Halo dicodinginAJA, saya punya usaha laundry/salon, mau tanya soal bot WA.');
const waWarung = wa('Halo dicodinginAJA, saya punya warung/kafe, mau tanya soal sistem kasir dan rekap.');

export default function BuatSiapa() {
  return (
    <section style={{ padding: '0 0 104px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 28px' }}>
        <h2
          className="reveal hashtag"
          style={{
            margin: '0',
            textAlign: 'center',
            fontSize: 'clamp(32px,4vw,52px)',
            lineHeight: '1.1',
            letterSpacing: '-0.025em',
            fontWeight: '700',
          }}
        >
          #BiarSistemYangKerja
          <br />
          buat usaha apa aja
        </h2>
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap: '24px', marginTop: '56px' }}
        >
          <article
            className="zoomcard lift reveal"
            style={{
              position: 'relative',
              borderRadius: '36px',
              overflow: 'hidden',
              minHeight: '520px',
              background: '#30373D',
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <img
              src="/assets/v2/scene-toko.webp"
              alt="Pembeli membayar dengan HP di lapak pasar"
              style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'relative',
                width: '100%',
                padding: '140px 32px 32px',
                background: 'linear-gradient(to top,rgba(10,14,18,0.94) 55%,rgba(10,14,18,0))',
              }}
            >
              <h3 style={{ margin: '0', fontSize: '28px', fontWeight: '700', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                Toko dan pedagang
              </h3>
              <p style={{ margin: '8px 0 0', color: '#E3E8EB', fontSize: '16px' }}>Pembeli nanya stok dan harga, langsung dijawab.</p>
              <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
                <span
                  style={{
                    alignSelf: 'flex-start',
                    background: '#FFFFFF',
                    color: '#262C31',
                    padding: '6px 12px',
                    borderRadius: '4px 14px 14px 14px',
                  }}
                >
                  "Kak, kaos hitam size L ada?"
                </span>
                <span
                  style={{
                    alignSelf: 'flex-start',
                    background: '#D9FDD3',
                    color: '#262C31',
                    padding: '6px 12px',
                    borderRadius: '14px 4px 14px 14px',
                  }}
                >
                  "Ada kak, Rp89rb. Mau dikirim ke mana?" <b style={{ color: '#1F7A47', fontSize: '12px' }}>· bot</b>
                </span>
              </div>
              <a
                className="btn"
                href={waToko}
                target="_blank"
                rel="noopener"
                style={{
                  marginTop: '18px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  minHeight: '44px',
                  padding: '10px 22px',
                  borderRadius: '999px',
                  background: '#EF7A30',
                  color: '#262C31',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '15px',
                }}
              >
                Tanya buat toko
              </a>
            </div>
          </article>

          <article
            className="zoomcard lift reveal"
            style={{
              position: 'relative',
              borderRadius: '36px',
              overflow: 'hidden',
              minHeight: '520px',
              background: '#30373D',
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <img
              src="/assets/v2/scene-laundry.webp"
              alt="Pemilik laundry dan pegawai mengecek cucian"
              style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'relative',
                width: '100%',
                padding: '140px 32px 32px',
                background: 'linear-gradient(to top,rgba(10,14,18,0.94) 55%,rgba(10,14,18,0))',
              }}
            >
              <h3 style={{ margin: '0', fontSize: '28px', fontWeight: '700', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                Laundry dan salon
              </h3>
              <p style={{ margin: '8px 0 0', color: '#E3E8EB', fontSize: '16px' }}>
                Pelanggan tanya status atau booking jadwal, langsung dijawab.
              </p>
              <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
                <span
                  style={{
                    alignSelf: 'flex-start',
                    background: '#FFFFFF',
                    color: '#262C31',
                    padding: '6px 12px',
                    borderRadius: '4px 14px 14px 14px',
                  }}
                >
                  "Cucian saya udah beres belum?"
                </span>
                <span
                  style={{
                    alignSelf: 'flex-start',
                    background: '#D9FDD3',
                    color: '#262C31',
                    padding: '6px 12px',
                    borderRadius: '14px 4px 14px 14px',
                  }}
                >
                  "Udah kak, bisa diambil jam 4 sore ya." <b style={{ color: '#1F7A47', fontSize: '12px' }}>· bot</b>
                </span>
              </div>
              <a
                className="btn"
                href={waLaundry}
                target="_blank"
                rel="noopener"
                style={{
                  marginTop: '18px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  minHeight: '44px',
                  padding: '10px 22px',
                  borderRadius: '999px',
                  background: '#EF7A30',
                  color: '#262C31',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '15px',
                }}
              >
                Tanya buat laundry/salon
              </a>
            </div>
          </article>

          <article
            className="zoomcard lift reveal"
            style={{
              position: 'relative',
              borderRadius: '36px',
              overflow: 'hidden',
              minHeight: '520px',
              background: '#30373D',
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <img
              src="/assets/v2/scene-kafe.webp"
              alt="Pelanggan membayar di warung kelontong"
              style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'relative',
                width: '100%',
                padding: '140px 32px 32px',
                background: 'linear-gradient(to top,rgba(10,14,18,0.94) 55%,rgba(10,14,18,0))',
              }}
            >
              <h3 style={{ margin: '0', fontSize: '28px', fontWeight: '700', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                Warung dan kafe
              </h3>
              <p style={{ margin: '8px 0 0', color: '#E3E8EB', fontSize: '16px' }}>Stok dipantau, rekap jualan harian jadi sendiri.</p>
              <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
                <span
                  style={{
                    alignSelf: 'flex-start',
                    background: '#FFFFFF',
                    color: '#262C31',
                    padding: '6px 12px',
                    borderRadius: '4px 14px 14px 14px',
                  }}
                >
                  "Bang, kopi susu masih ada?"
                </span>
                <span
                  style={{
                    alignSelf: 'flex-start',
                    background: '#D9FDD3',
                    color: '#262C31',
                    padding: '6px 12px',
                    borderRadius: '14px 4px 14px 14px',
                  }}
                >
                  "Masih bang, sisa 12 cup hari ini." <b style={{ color: '#1F7A47', fontSize: '12px' }}>· bot</b>
                </span>
              </div>
              <a
                className="btn"
                href={waWarung}
                target="_blank"
                rel="noopener"
                style={{
                  marginTop: '18px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  minHeight: '44px',
                  padding: '10px 22px',
                  borderRadius: '999px',
                  background: '#EF7A30',
                  color: '#262C31',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '15px',
                }}
              >
                Tanya buat warung
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
