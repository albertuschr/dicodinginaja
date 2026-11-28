# Redesign landing page dicodinginAJA — bahan untuk Claude Code

Folder ini berisi desain final dari Claude Design, siap dipindahkan ke kode React (Vite) di repo ini.

## Isi
- `landing-redesign.dc.html` — sumber desain lengkap (format Design Component). Semua teks, warna,
  urutan section, animasi CSS (keyframes), dan data/state ada di sini. Bagian `<script type="text/x-dc">`
  berisi logika: `renderVals()` = data per section, `componentDidMount()` = timer carousel.
  `{{nama}}` = nilai dari `renderVals()`, `<sc-for>` = map/loop, `<sc-if>` = conditional render.
- `../../public/assets/v2/` — semua gambar (maskot, foto, screenshot project) dalam .webp.
  Di desain dipanggil sebagai `/assets/v2/<nama>.webp`.

## Brand
- Oranye `#EF7A30`, charcoal `#262C31` (gelap), krem `#FFF6EE`.
- Font: Lexend (Google Fonts).
- Bahasa: santai, pakai "kamu", buat orang awam.
- WhatsApp: 081295731556 (link `https://wa.me/6281295731556?text=...`, ada pesan otomatis per tombol).

## Urutan section
1. Navbar (Beranda, Layanan, Coba bot, Project, Bantuan + tombol Chat kami)
2. Hero — tagline besar yang ganti tiap 4,5 detik + garis progres + maskot nunjuk ke kartu chat WA
   yang isinya ikut ganti. Di bawahnya marquee logo aplikasi.
3. Kenapa (3 maskot)
4. Buat siapa (3 kartu foto + contoh chat)
5. Produk & harga (`#layanan`) — katalog 14 produk, filter kategori, kartu Custom yang flip
6. Demo bot (`#demo`) — animasi workflow n8n + HP WhatsApp
7. Project (`#project`) — 5 tab: Website, Mobile App, POS, Convera, Chatbot (tanpa tombol link)
8. Kata mereka — testimoni (CATATAN: masih karangan, ganti sebelum launch)
9. FAQ (`#bantuan`)
10. CTA penutup + sosmed
11. Footer

## Catatan sebelum live
- Testimoni dan beberapa angka di Project masih karangan → ganti dengan yang asli.
- Link sosmed (IG, TikTok, YouTube, email) masih placeholder.
