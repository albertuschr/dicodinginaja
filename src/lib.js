import { useCallback, useEffect, useState } from 'react';

export const WA_NUMBER = '6281295731556';
export const wa = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

// Link sosmed — masih placeholder, ganti sebelum launch.
export const links = {
  waLink: wa('Halo dicodinginAJA, saya mau konsultasi gratis.'),
  igLink: '#',
  ttLink: '#',
  ytLink: '#',
  mailLink: 'mailto:halo@dicodinginaja.com',
};

// Ubah string CSS ("a:b;c:d") jadi object style React. Dipakai buat style dinamis
// supaya nilainya bisa disalin persis dari desain. Hasil di-cache per string.
const cache = new Map();
export function css(str) {
  let obj = cache.get(str);
  if (obj) return obj;
  obj = {};
  let depth = 0;
  let cur = '';
  const push = () => {
    const i = cur.indexOf(':');
    if (i > 0) {
      const k = cur.slice(0, i).trim();
      const key = k.startsWith('--') ? k : k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      obj[key] = cur.slice(i + 1).trim();
    }
    cur = '';
  };
  for (const ch of str) {
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    if (ch === ';' && depth === 0) push();
    else cur += ch;
  }
  push();
  if (cache.size > 500) cache.clear();
  cache.set(str, obj);
  return obj;
}

export function useMediaQuery(query) {
  const get = () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(query).matches;
  const [match, setMatch] = useState(get);
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

/**
 * Index yang maju otomatis tiap `ms` (kalau autoplay aktif).
 * `pick(i)` pindah ke index i dan me-restart timer (pakai `restartMs` kalau diisi),
 * sama seperti `restart()` di desain.
 */
export function useCycle(count, ms, { restartMs, restartOnPick = true } = {}) {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [period, setPeriod] = useState(ms);
  const [epoch, setEpoch] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    const t = setInterval(() => setIdx((i) => (i + 1) % count), period);
    return () => clearInterval(t);
  }, [reduce, count, period, epoch]);

  const pick = useCallback(
    (i) => {
      setIdx(((i % count) + count) % count);
      if (restartOnPick) {
        if (restartMs) setPeriod(restartMs);
        setEpoch((e) => e + 1);
      }
    },
    [count, restartMs, restartOnPick],
  );

  return [idx, pick];
}
