// Set only after the business owner confirms the destination, in international format.
export const WHATSAPP_NUMBER = '6285946083824';

export const needs = [
  { id: 'whatsapp', label: 'Chatbot WhatsApp', level: 1 },
  { id: 'telegram', label: 'Bot Telegram', level: 1 },
  { id: 'sheets', label: 'Google Sheets automation', level: 1 },
  { id: 'finance', label: 'Rekap keuangan', level: 2 },
  { id: 'ai', label: 'Balasan dengan AI', level: 2 },
  { id: 'documents', label: 'Pemrosesan dokumen', level: 2 },
  { id: 'inventory', label: 'Manajemen inventori', level: 3 },
  { id: 'workforce', label: 'Manajemen tim', level: 3 },
  { id: 'api', label: 'Integrasi API khusus', level: 3 },
];

export function recommend(ids) {
  const chosen = needs.filter(n => ids.includes(n.id));
  if (!chosen.length) return null;
  if (chosen.some(n => n.level === 3) || chosen.length >= 4)
    return { name: 'Custom', reason: 'Kebutuhan ini perlu pemetaan alur dan integrasi lebih lanjut. Kita tentukan cakupannya bersama.' };
  if (chosen.some(n => n.level === 2) || chosen.length >= 2)
    return { name: 'Premium', reason: 'Pilihan Anda membutuhkan pengolahan data, AI, atau beberapa proses yang saling terhubung.' };
  return { name: 'Basic', reason: 'Satu kebutuhan sederhana bisa dimulai dari satu alur. Template dan instalasi disesuaikan saat konsultasi.' };
}

export function makeBrief({ name, plan, selected, notes }) {
  const list = needs.filter(n => selected.includes(n.id)).map(n => `• ${n.label}`).join('\n');
  const rec = recommend(selected);
  return `Halo dicodinginAJA! Saya ingin konsultasi automasi.\n\nNama / bisnis: ${name || 'Belum diisi'}\nPaket yang diminati: ${plan || rec?.name || 'Belum menentukan'}\nRekomendasi website: ${rec?.name || 'Belum ada'}\n\nKebutuhan:\n${list || '• Ingin diskusi terlebih dahulu'}\n\nCatatan: ${notes || 'Mohon bantu jelaskan alur dan estimasi biayanya.'}`;
}

export function whatsappUrl(number, message) {
  return /^\d{8,15}$/.test(number)
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : null;
}
