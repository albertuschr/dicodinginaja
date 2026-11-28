import { useEffect, useRef, useState } from 'react';

// Batas aman: kalau video macet/gak bisa diputar, overlay tetap hilang (video aslinya ±2,4 detik).
const MAX_MS = 6000;

/** Video bumper logo yang diputar sekali waktu website pertama dibuka. */
export default function Bumper() {
  const [done, setDone] = useState(false);
  const video = useRef(null);

  useEffect(() => {
    if (done) return undefined;
    const html = document.documentElement;
    const body = document.body;
    const prev = [html.style.overflow, body.style.overflow];
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    const t = setTimeout(() => setDone(true), MAX_MS);
    // Autoplay bisa ditolak browser (mode hemat daya, dll) → langsung lewati.
    video.current?.play()?.catch(() => setDone(true));
    return () => {
      clearTimeout(t);
      [html.style.overflow, body.style.overflow] = prev;
    };
  }, [done]);

  return (
    <div className={`bumper${done ? ' done' : ''}`} aria-hidden="true">
      <video
        ref={video}
        className="bumper-video"
        src="/assets/bumper.mov"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => setDone(true)}
        onError={() => setDone(true)}
      />
    </div>
  );
}
