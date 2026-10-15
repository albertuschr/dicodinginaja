import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { View, Text, Pressable } from 'react-native-web';
import {
    ArrowUpRight, ArrowRight, Plus, Minus, Check, MessageCircle, Send,
    Workflow, FileSpreadsheet, Boxes, FileText, Users, Play, RotateCcw,
    X, Menu, Copy, CheckCheck, ChevronDown, Zap
} from 'lucide-react';
import './style.css';
import { needs, recommend, makeBrief, whatsappUrl, WHATSAPP_NUMBER } from './recommendation.js';

const services = [
    {
        title: 'Chatbot & customer service',
        desc: 'Pertanyaan berulang? Biar bot yang bantu jawab. Hubungkan WhatsApp API atau Telegram dengan alur layanan bisnis Anda.',
        tags: ['WhatsApp API', 'Bot Telegram', 'AI chatbot'],
        icon: MessageCircle
    },
    {
        title: 'Data & laporan otomatis',
        desc: 'Dari input data sampai rekap keuangan. Satukan informasi agar tim tidak perlu salin-tempel setiap hari.',
        tags: ['Google Sheets', 'Rekap keuangan', 'Document processing'],
        icon: FileSpreadsheet
    },
    {
        title: 'Operasional & integrasi',
        desc: 'Buat tools yang sudah dipakai saling terhubung. Atur inventori, alur kerja tim, dan pertukaran data melalui API.',
        tags: ['Inventori', 'Workforce management', 'API integration'],
        icon: Workflow
    }
];

const plans = [
    {
        name: 'Basic',
        price: 'Rp200.000',
        lead: 'Satu alur sederhana, mulai dari template.',
        features: [
            'Template n8n: satu alur siap pakai',
            'Template + instalasi mulai Rp350.000',
            'Chatbot dengan menu mulai Rp650.000',
            'Panduan & uji coba untuk opsi instalasi'
        ],
        for: 'Harga awal untuk template saja, tanpa instalasi.',
        note: 'Estimasi 1–3 hari, sesuai opsi.'
    },
    {
        name: 'Premium',
        price: 'Rp1.500.000',
        lead: 'Chatbot AI dan pencatatan yang terhubung.',
        features: [
            'WhatsApp terhubung ke Gemini AI',
            'Percakapan tercatat di Google Sheets',
            'Integrasi teks, gambar, dan file sesuai alur',
            'Penyesuaian alur, 1 revisi & SOP PDF'
        ],
        for: 'Untuk alur WhatsApp → AI → Google Sheets.',
        note: 'Estimasi 5 hari, sesuai cakupan.'
    },
    {
        name: 'Custom',
        price: null,
        lead: 'Alur khusus untuk operasional bisnis Anda.',
        features: [
            'Pemetaan proses & kebutuhan integrasi',
            'API khusus atau alur lintas platform',
            'Inventori, dokumen, atau manajemen tim',
            'Cakupan, revisi & dukungan disepakati'
        ],
        for: 'Penawaran setelah konsultasi kebutuhan.',
        note: 'Waktu pengerjaan mengikuti cakupan.'
    }
];

const faqs = [
    [
        'Belum tahu bagian mana yang bisa diautomasi?',
        'Tidak masalah. Mulai dari cerita tentang pekerjaan yang paling sering diulang. Dari situ, kita bisa memetakan proses dan menentukan bagian yang paling masuk akal untuk diautomasi.'
    ],
    [
        'Apakah bisa pakai tools yang sudah digunakan?',
        'Bisa didiskusikan. Integrasi bergantung pada akses API, izin akun, dan kemampuan platform yang Anda gunakan. Kebutuhan ini akan diperiksa saat konsultasi.'
    ],
    [
        'Berapa biaya dan lama pengerjaannya?',
        'Biaya dan waktu pengerjaan mengikuti kompleksitas alur, jumlah integrasi, dan kebutuhan bisnis. Penawaran disepakati setelah konsultasi. Biaya layanan pihak ketiga, jika ada, dijelaskan terpisah.'
    ],
    [
        'Setelah go-live, apakah masih dibantu?',
        'Tersedia garansi bug dan support after-sales. Cakupan, durasi, dan revisi minor disepakati sesuai paket sebelum pengerjaan dimulai.'
    ]
];

function Brand() {
    return (
        <a className="brand" href="#" aria-label="dicodinginAJA beranda">
            dicodingin<span>AJA</span><b>.</b>
        </a>
    );
}

function App() {
    const [selected, setSelected] = useState([]);
    const [menu, setMenu] = useState(false);
    const [modal, setModal] = useState(null);
    const [service, setService] = useState(0);
    const [demo, setDemo] = useState(0);
    const [running, setRunning] = useState(false);
    const [faq, setFaq] = useState(0);
    const [copied, setCopied] = useState(false);
    const [name, setName] = useState('');
    const [need, setNeed] = useState('');
    const [intro, setIntro] = useState(true);

    const timers = useRef([]);
    const dialog = useRef(null);
    const trigger = useRef(null);

    useEffect(() => {
        const t = setTimeout(() => setIntro(false), 1500);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (!running) return;
        [1, 2, 3].forEach((n) =>
            timers.current.push(
                setTimeout(() => {
                    setDemo(n);
                    if (n === 3) setRunning(false);
                }, n * 950)
            )
        );
        return () => {
            timers.current.forEach(clearTimeout);
            timers.current = [];
        };
    }, [running]);

    useEffect(() => {
        if (modal) {
            trigger.current = document.activeElement;
            dialog.current?.showModal();
        } else if (dialog.current?.open) {
            dialog.current.close();
            trigger.current?.focus();
        }
    }, [modal]);

    useEffect(() => {
        const revealItems = document.querySelectorAll('[data-reveal]');
        if (!revealItems.length) return;

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                });
            },
            {
                threshold: 0.16,
                rootMargin: '0px 0px -8% 0px'
            }
        );

        revealItems.forEach(item => observer.observe(item));
        return () => observer.disconnect();
    }, []);

    const recommendation = recommend(selected);
    const brief = makeBrief({ name, plan: modal, selected, notes: need });
    const waLink = whatsappUrl(WHATSAPP_NUMBER, brief);

    function toggleNeed(id) {
        setSelected(prev => prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]);
        setCopied(false);
    }

    async function copy() {
        try {
            await navigator.clipboard.writeText(brief);
            setCopied(true);
        } catch {
            setCopied(false);
            alert('Salin ringkasan secara manual dari kotak di bawah.');
        }
    }

    const Icon = services[service].icon;

    return (
        <>
            <div className={'intro ' + (!intro ? 'done' : '')} aria-hidden="true">
                <img className="intro-mascot" src="/assets/mascot.png" alt="" />
                <span className="intro-mark">dicodingin<span>AJA</span>.</span>
                <span>Siap bantu kerja Anda.</span>
            </div>

            <header>
                <div className="nav shell">
                    <Brand />
                    <nav className={menu ? 'open' : ''}>
                        {[['Layanan', '#layanan'], ['Cara kerja', '#cara-kerja'], ['Paket', '#paket'], ['FAQ', '#faq']].map(([t, h]) => (
                            <a href={h} key={h} onClick={() => setMenu(false)}>{t}</a>
                        ))}
                    </nav>
                    <button className="nav-cta" onClick={() => setModal('Konsultasi gratis')}>
                        Ngobrol dulu <ArrowUpRight size={17} />
                    </button>
                    <button className="menu-btn" aria-label="Buka navigasi" aria-expanded={menu} onClick={() => setMenu(!menu)}>
                        {menu ? <X /> : <Menu />}
                    </button>
                </div>
            </header>

            <main>
                {/* Hero */}
                <section className="hero shell" data-reveal>
                    <div className="hero-copy" data-reveal>
                        <div className="eyebrow"><i /> PARTNER AUTOMASI BISNIS ANDA</div>
                        <h1>
                            Kerjaan berulang?<br />
                            Biar sistem<br />
                            yang <em>kerja.</em>
                        </h1>
                        <p>
                            Anda fokus mengembangkan bisnis.<br />
                            Chat, data, dan pekerjaan rutin?<br className="mobile-break" /> <strong>dicodinginAJA.</strong>
                        </p>
                        <div className="hero-actions">
                            <button className="button orange" onClick={() => setModal('Konsultasi gratis')}>
                                Konsultasi gratis <ArrowUpRight size={20} />
                            </button>
                            {/* <a className="text-link" href="#demo">
                                <span className="play"><Play size={13} fill="currentColor" /></span> Lihat cara kerjanya
                            </a> */}
                        </div>
                        <div className="hero-note">
                            <Check size={14} /> Sesuai alur bisnis Anda <span>·</span> Demo sebelum go-live
                        </div>
                    </div>

                    <div className="hero-art" data-reveal>
                        {/* <div className="orb">
                            <div className="orb-ring" />
                            <div className="orb-label">ALUR KERJA<br />YANG TERHUBUNG.</div>
                        </div> */}
                        <img
                            className="mascot"
                            src="/assets/mascot.png"
                            alt="Maskot dicodinginAJA memakai kaus oranye dan headset"
                        />
                        <div className="float-card message">
                            <span className="app-icon green"><MessageCircle size={20} /></span>
                            <div>
                                <small>PESAN PELANGGAN</small>
                                <strong>Sudah dibalas otomatis <CheckCheck size={14} /></strong>
                            </div>
                        </div>
                        <div className="float-card sheet">
                            <span className="app-icon blue"><FileSpreadsheet size={22} /></span>
                            <div>
                                <small>GOOGLE SHEETS</small>
                                <strong>Data masuk. Beres.</strong>
                            </div>
                            <span className="status-dot" />
                        </div>
                        {/* <div className="mini-label">
                            <Zap size={15} fill="currentColor" /> 
                        </div> */}
                    </div>

                    {/* <a className="scroll" href="#layanan">SCROLL UNTUK EKSPLOR <ChevronDown size={14} /></a> */}
                </section>

                {/* Integrations */}
                <div className="integrations" data-reveal>
                    <div className="shell integration-row">
                       
                        <div className="tool-logo">✳ <b>ChatGPT</b></div>
                        <div className="tool-logo gemini">✦ <b>Gemini</b></div>
                        <div className="tool-logo"><span className="n8n">●—●—●</span> <b>n8n</b></div>
                        <div className="tool-logo"><FileSpreadsheet /> <b>Google Sheets</b></div>
                        <div className="tool-logo"><Send /> <b>Telegram</b></div>
                        <div className="tool-logo"><MessageCircle /> <b>WhatsApp</b></div>
                    </div>
                </div>

                {/* Layanan */}
                <section className="section shell" id="layanan" data-reveal>
                    <div className="section-head" data-reveal>
                        <div>
                            <span className="eyebrow">01 / APA YANG BISA DIBANTU?</span>
                            <h2>Lebih sedikit manual.<br />Lebih banyak <span className="serif">kemajuan.</span></h2>
                        </div>
                        {/* <p>Dari percakapan pertama sampai laporan terakhir.<br />Kita rapikan prosesnya, satu per satu.</p> */}
                    </div>
                    <div className="service-grid" data-reveal>
                        <div className="service-tabs" role="tablist" aria-label="Kategori layanan">
                            {services.map((s, i) => (
                                <button
                                    key={s.title}
                                    role="tab"
                                    aria-selected={service === i}
                                    aria-controls="service-panel"
                                    id={'tab-' + i}
                                    className={service === i ? 'active' : ''}
                                    onClick={() => setService(i)}
                                >
                                    <span>0{i + 1}</span>
                                    <b>{s.title}</b>
                                    <ArrowUpRight size={22} />
                                </button>
                            ))}
                        </div>
                        <div className="service-detail" role="tabpanel" id="service-panel" aria-labelledby={'tab-' + service}>
                            <Icon size={38} strokeWidth={1.3} />
                            <h3>{services[service].title}</h3>
                            <p>{services[service].desc}</p>
                            <div className="tags">
                                {services[service].tags.map(t => <span key={t}>{t}</span>)}
                            </div>
                            <button className="text-link" onClick={() => setModal(services[service].title)}>
                                Diskusikan kebutuhan ini <ArrowUpRight size={18} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Demo */}
                <section className="demo-section" id="demo" data-reveal>
                    <div className="shell demo-layout">
                        <div data-reveal>
                            <span className="eyebrow">COBA LANGSUNG</span>
                            <h2>Satu pesan masuk.<br />Sisanya, <span className="serif">mengalir.</span></h2>
                            <p>
                                Bayangkan pelanggan bertanya, bot menjawab,<br />
                                dan data tercatat. Tanpa pindah-pindah aplikasi.
                            </p>
                            <button
                                className="button orange"
                                disabled={running}
                                onClick={() => { setDemo(0); setRunning(true); }}
                            >
                                {running ? 'Alur sedang berjalan…' : demo === 3 ? 'Ulangi simulasi' : 'Jalankan simulasi'}
                                {demo === 3 ? <RotateCcw size={18} /> : <Play size={16} />}
                            </button>
                            <small className="demo-note">Contoh alur ilustratif. Tidak mengirim pesan atau data asli.</small>
                        </div>

                        <div className="workflow" data-reveal>
                            <div className="workflow-top">
                                <span><i className={running ? 'live' : ''} /> Customer inquiry flow</span>
                                <small>{demo === 3 ? 'SELESAI' : running ? 'RUNNING' : 'READY TO RUN'}</small>
                            </div>
                            {[
                                {
                                    icon: MessageCircle,
                                    title: 'Pesan masuk',
                                    text: '"Halo, boleh minta info layanan?"',
                                    done: 'Pesan pelanggan diterima'
                                },
                                {
                                    icon: Zap,
                                    title: 'AI menyiapkan jawaban',
                                    text: 'Menjawab dari informasi bisnis Anda',
                                    done: 'Balasan layanan telah disiapkan'
                                },
                                {
                                    icon: FileSpreadsheet,
                                    title: 'Data tercatat otomatis',
                                    text: 'Prospek baru masuk ke Google Sheets',
                                    done: 'Prospek ditambahkan ke spreadsheet'
                                }
                            ].map((s, i) => (
                                <React.Fragment key={s.title}>
                                    <div className={'flow-node ' + (demo > i ? 'complete' : '')}>
                                        <span className="node-icon"><s.icon size={21} /></span>
                                        <div>
                                            <strong>{s.title}</strong>
                                            <small>{demo > i ? s.done : s.text}</small>
                                        </div>
                                        <span className="node-check">
                                            {demo > i ? <Check size={16} /> : String(i + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                    {i < 2 && (
                                        <div className={'connector ' + (demo > i ? 'complete' : '')}>
                                            <span />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                            <div className="flow-result" aria-live="polite">
                                {demo === 3
                                    ? '✓ Beres. Tim Anda bisa fokus ke langkah berikutnya.'
                                    : 'Tiga langkah. Satu alur yang terhubung.'}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cara Kerja */}
                <section className="section shell" id="cara-kerja" data-reveal>
                    <div className="section-head" data-reveal>
                        <div>
                            <span className="eyebrow">02 / DARI IDE SAMPAI JALAN</span>
                            <h2>Ngobrol dulu.<br /><span className="serif">Kita urus alurnya.</span></h2>
                        </div>
                        {/* <p>Proses jelas dari awal.<br />Anda tahu apa yang dibuat dan cara memakainya.</p> */}
                    </div>
                    <div className="steps" data-reveal>
                        {[
                            ['01', 'Ceritakan kebutuhan', 'Mulai dari proses yang menyita waktu. Konsultasinya gratis.'],
                            ['02', 'Kita rancang & bangun', 'Alur disesuaikan dengan bisnis, tools, dan kebutuhan tim Anda.'],
                            ['03', 'Coba sebelum live', 'Lihat demo, beri masukan, dan pastikan alurnya sesuai.'],
                            ['04', 'Jalan, lalu didampingi', 'Konfigurasi remote, garansi bug, dan support sesuai kesepakatan.']
                        ].map(([n, t, d]) => (
                            <div className="step" key={n}>
                                <span>{n}</span>
                                <h3>{t}</h3>
                                <p>{d}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Paket */}
                <section className="package-section" id="paket" data-reveal>
                    <div className="shell">
                        <div className="section-head" data-reveal>
                            <div>
                                <span className="eyebrow">03 / PAKET & KEBUTUHAN</span>
                                <h2>Mulai dari pekerjaan<br />yang ingin <span className="serif">diringankan.</span></h2>
                            </div>
                            {/* <p>Pilih kebutuhan Anda.<br />Kami bantu arahkan ke paket yang sesuai.</p> */}
                        </div>

                        <div className="recommendation-builder" data-reveal>
                            <div className="picker-heading">
                                <div>
                                    <h3>Apa yang ingin Anda otomatiskan?</h3>
                                    <p>Boleh pilih lebih dari satu.</p>
                                </div>
                                {selected.length > 0 && (
                                    <button className="reset-needs" onClick={() => { setSelected([]); setCopied(false); }}>
                                        Hapus pilihan <X size={13} />
                                    </button>
                                )}
                            </div>
                            <div className="need-options">
                                {needs.map(n => (
                                    <label
                                        className={'need-option ' + (selected.includes(n.id) ? 'checked' : '')}
                                        key={n.id}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(n.id)}
                                            onChange={() => toggleNeed(n.id)}
                                        />
                                        <span className="check-box">
                                            {selected.includes(n.id) && <Check size={13} />}
                                        </span>
                                        {n.label}
                                    </label>
                                ))}
                            </div>
                            <div className="recommendation-result" aria-live="polite" aria-atomic="true">
                                {recommendation ? (
                                    <>
                                        <span className="result-mark"><Check size={18} /></span>
                                        <div>
                                            <strong>Rekomendasi awal: {recommendation.name}</strong>
                                            <p>{recommendation.reason}</p>
                                        </div>
                                        <a href={'#plan-' + recommendation.name} className="result-jump">
                                            Lihat paket <ArrowRight size={16} />
                                        </a>
                                    </>
                                ) : (
                                    <p>Pilih kebutuhan di atas untuk melihat rekomendasi paket.</p>
                                )}
                            </div>
                        </div>

                        <div className="packages" data-reveal>
                            {plans.map((p, i) => {
                                const matched = recommendation?.name === p.name;
                                return (
                                    <article
                                        id={'plan-' + p.name}
                                        className={'package ' + (matched ? 'recommended' : '')}
                                        key={p.name}
                                        aria-label={p.name + (matched ? ' — Cocok untuk Anda' : '')}
                                    >
                                        {matched && (
                                            <div className="recommendation-badge">
                                                <Check size={14} /> Cocok untuk Anda
                                            </div>
                                        )}
                                        <div className="package-number">0{i + 1} <ArrowUpRight size={24} /></div>
                                        <h3>{p.name}</h3>
                                        <p className="plan-lead">{p.lead}</p>
                                        <div className="quote-price">
                                            {p.price ? (
                                                <>
                                                    <span className="starts-from">Starts from</span>
                                                    <strong>{p.price}</strong>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="starts-from">Penawaran personal</span>
                                                    <strong>Sesuai kebutuhan</strong>
                                                </>
                                            )}
                                            <small>{p.for}</small>
                                        </div>
                                        <ul>
                                            {p.features.map(f => (
                                                <li key={f}><Check size={16} />{f}</li>
                                            ))}
                                        </ul>
                                        <p className="plan-timing">{p.note}</p>
                                        <Pressable
                                            accessibilityRole="button"
                                            onPress={() => { setCopied(false); setModal(p.name); }}
                                            style={({ hovered, pressed }) => ({
                                                backgroundColor: matched ? '#ef7a35' : 'transparent',
                                                borderWidth: 1,
                                                borderColor: matched ? '#ef7a35' : '#a3afb4',
                                                borderRadius: 6,
                                                paddingVertical: 15,
                                                paddingHorizontal: 18,
                                                opacity: pressed ? .8 : 1,
                                                transform: hovered ? [{ translateY: -2 }] : [],
                                                cursor: 'pointer'
                                            })}
                                        >
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Text style={{ fontSize: 13, fontWeight: '600', color: '#252e31' }}>
                                                    {WHATSAPP_NUMBER ? 'Konsultasi via WhatsApp' : 'Konsultasikan ' + p.name}
                                                </Text>
                                                <MessageCircle size={18} color="#252e31" />
                                            </View>
                                        </Pressable>
                                    </article>
                                );
                            })}
                        </div>
                        <p className="package-disclaimer">
                            Rekomendasi awal berdasarkan pilihan Anda, bukan penawaran final. Harga, biaya platform/API, dan cakupan dikonfirmasi saat konsultasi.
                        </p>
                    </div>
                </section>

                {/* FAQ */}
                <section className="section shell faq-layout" id="faq" data-reveal>
                    <div data-reveal>
                        <span className="eyebrow">MASIH PENASARAN?</span>
                        <h2>Bagus.<br /><span className="serif">Tanya AJA.</span></h2>
                        <button className="text-link" onClick={() => setModal('Pertanyaan lain')}>
                            Punya pertanyaan lain? <ArrowUpRight size={18} />
                        </button>
                    </div>
                    <div className="faqs" data-reveal>
                        {faqs.map(([q, a], i) => (
                            <div className="faq" key={q}>
                                <button
                                    aria-expanded={faq === i}
                                    aria-controls={'faq-' + i}
                                    onClick={() => setFaq(faq === i ? null : i)}
                                >
                                    {q}
                                    {faq === i ? <Minus size={18} /> : <Plus size={18} />}
                                </button>
                                <div id={'faq-' + i} hidden={faq !== i}>
                                    <p>{a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact */}
                <section className="contact-section shell" data-reveal>
                    <div className="contact-art" data-reveal>
                        <img src="/assets/mascot.png" alt="" loading="lazy" />
                        <span>Ada yang bisa dibantu?</span>
                    </div>
                    <div>
                        <span className="eyebrow">KURANGI REPOTNYA. TAMBAH WAKTUNYA.</span>
                        <h2>Ada yang bisa<br /><span className="serif">diautomasi?</span></h2>
                        <button className="button dark" onClick={() => setModal('Konsultasi gratis')}>
                            Yuk, ngobrol gratis <ArrowUpRight size={20} />
                        </button>
                    </div>
                </section>
            </main>

            <footer className="shell">
                <Brand />
                {/* <p>Automasi yang mengikuti cara kerja Anda.</p> */}
                <span>© {new Date().getFullYear()} dicodinginAJA.</span>
                <a href="#">Kembali ke atas ↑</a>
            </footer>

            <dialog
                ref={dialog}
                onCancel={() => setModal(null)}
                onClick={e => { if (e.target === dialog.current) setModal(null); }}
            >
                <div className="modal-inner">
                    <button className="modal-close" aria-label="Tutup" onClick={() => { setModal(null); setCopied(false); }}>
                        <X />
                    </button>
                    <span className="eyebrow">MULAI DARI CERITA ANDA</span>
                    <h2>Ngobrolin <span className="serif">ide.</span></h2>
                    <p>Pilihan Anda: <strong>{modal}</strong></p>
                    <div className="modal-needs">
                        {selected.length
                            ? needs.filter(n => selected.includes(n.id)).map(n => <span key={n.id}>{n.label}</span>)
                            : <span>Belum memilih kebutuhan</span>
                        }
                    </div>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            if (waLink) {
                                window.open(waLink, '_blank', 'noopener,noreferrer');
                            } else {
                                copy();
                            }
                        }}
                    >
                        <label>
                            Nama Anda
                            <input
                                value={name}
                                onChange={e => { setName(e.target.value); setCopied(false); }}
                                placeholder="Nama atau nama bisnis"
                            />
                        </label>
                        <label>
                            Apa yang ingin dibuat lebih praktis?
                            <textarea
                                rows="3"
                                value={need}
                                onChange={e => { setNeed(e.target.value); setCopied(false); }}
                                placeholder="Tambahkan detail, tools yang digunakan, atau perkiraan volume pekerjaan…"
                            />
                        </label>
                        <div className="brief-preview">{brief}</div>
                        <button className="button orange" type="submit">
                            {waLink ? 'Lanjut ke WhatsApp' : copied ? 'Ringkasan tersalin' : 'Salin ringkasan konsultasi'}
                            {waLink ? <MessageCircle size={18} /> : copied ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                        <p className="form-note" aria-live="polite">
                            {waLink
                                ? 'Pilihan kebutuhan otomatis disertakan. Anda dapat meninjau pesan sebelum mengirimnya.'
                                : copied
                                    ? 'Ringkasan dan pilihan kebutuhan tersalin. Belum ada pesan yang dikirim.'
                                    : 'Kontak WhatsApp sedang disiapkan. Untuk sementara, salin ringkasan kebutuhan Anda.'
                            }
                        </p>
                    </form>
                </div>
            </dialog>
        </>
    );
}

createRoot(document.getElementById('root')).render(<App />);
