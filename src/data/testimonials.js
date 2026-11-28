// CATATAN: testimoni ini masih karangan dari desain — ganti dengan chat asli sebelum launch.
import { css } from '../lib.js';

const bubbleThem = css('align-self:flex-start;max-width:86%;background:#FFFFFF;padding:7px 10px 4px;border-radius:4px 12px 12px 12px');
const bubbleMe = css('align-self:flex-end;max-width:86%;background:#D9FDD3;padding:7px 10px 4px;border-radius:12px 4px 12px 12px');
const mk = (arr) => arr.map((m) => ({ text: m[1], time: m[2], me: m[0] === 'me', style: m[0] === 'me' ? bubbleMe : bubbleThem }));

export const testiAll = [
  {
    name: 'Pak Budi Santoso',
    biz: 'Laundry kiloan, Depok',
    day: 'Kemarin',
    avatar: '#C8A27A',
    msgs: mk([
      ['them', 'Kak mau bilang makasih. Semalem ada 30an chat masuk pas saya tidur, kebales semua sama botnya', '06.12'],
      ['them', 'Pagi tinggal liat tabel, udah rapi semua', '06.12'],
      ['me', 'Wah ikut seneng Pak! Kalau ada balasan yang mau diubah, kabarin aja ya', '07.30'],
      ['them', 'Siap kak, mantap pokoknya', '07.31'],
    ]),
  },
  {
    name: 'Rina Kartika',
    biz: 'Toko baju online, Bekasi',
    day: 'Senin',
    avatar: '#E8A0B4',
    msgs: mk([
      ['them', 'Kak minggu ini orderan naik lumayan loh', '20.05'],
      ['them', 'Pembeli gak nunggu lama lagi, admin aku jadi bisa fokus packing', '20.05'],
      ['me', 'Mantap Kak! Mau sekalian dibikinin rekap mingguan otomatis?', '20.11'],
      ['them', 'Boleh bgt kak, kabarin harganya ya', '20.12'],
    ]),
  },
  {
    name: 'Bang Yoga',
    biz: 'Warkop, Gading Serpong',
    day: 'Sabtu',
    avatar: '#9CB7D4',
    msgs: mk([
      ['them', 'Bang kasirnya enak bgt, rekap malem tinggal klik doang', '23.40'],
      ['them', 'Dulu bisa sejam ngitung, sekarang 5 menit beres', '23.40'],
      ['me', 'Siap bang, semoga makin laris!', '23.52'],
    ]),
  },
  {
    name: 'Bu Sari Wulandari',
    biz: 'Salon kecantikan, Tangerang',
    day: '12/11/2026',
    avatar: '#B9A6E0',
    msgs: mk([
      ['them', 'Kak pengingat booking otomatisnya ngebantu banget', '10.02'],
      ['them', 'Pelanggan udah jarang lupa jadwal, gak ada yang batal mendadak lagi', '10.03'],
      ['me', 'Senang dengernya Bu! Makasih udah percaya sama kami', '10.15'],
    ]),
  },
];
