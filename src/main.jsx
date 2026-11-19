import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
    ArrowUpRight, Plus, Minus, Check, MessageCircle, Send,
    Workflow, FileSpreadsheet, Boxes, FileText, X, Menu, Copy, CheckCheck
} from 'lucide-react';
import './style.css';
import { makeBrief, whatsappUrl, WHATSAPP_NUMBER } from './recommendation.js';

const services = [
    {
        title: 'Chatbot & customer service',
        desc: 'Jawab pertanyaan pelanggan, kirim katalog, dan terima order dari channel yang mereka gunakan.',
        tags: ['WhatsApp', 'E-commerce', 'Website'],
        icon: MessageCircle
    },
    {
        title: 'Data, laporan & finance',
        desc: 'Rapikan input data, rekap penjualan, invoice, dan laporan keuangan dari sumber yang sudah digunakan.',
        tags: ['Google Sheets', 'Finance', 'Reports'],
        icon: FileSpreadsheet
    },
    {
        title: 'Website, app & operations',
        desc: 'Bangun website, mobile app, POS, atau sistem internal yang sesuai dengan proses kerja Anda.',
        tags: ['Website', 'Mobile app', 'POS'],
        icon: Workflow
    }
];

const products = [
    {
        id: 'logger-whatsapp',
        name: 'Logger WhatsApp → Google Sheets',
        description: 'Setiap pesan masuk tercatat otomatis ke spreadsheet.',
        preview: 'alur n8n',
        category: 'Automation',
        price: 'Rp200.000',
        priceNote: '+ instalasi Rp150.000',
        timing: 'Unduh instan',
        features: ['File workflow n8n (.json)', 'Panduan setup PDF', 'Contoh sheet siap salin'],
        icon: FileSpreadsheet
    },
    {
        id: 'chatbot-menu',
        name: 'Chatbot WhatsApp dengan Menu',
        description: 'Balasan otomatis bertingkat untuk FAQ, katalog, dan jam buka.',
        preview: 'menu chatbot',
        category: 'Chatbot',
        price: 'Rp650.000',
        priceNote: 'Termasuk instalasi',
        timing: '1–3 hari',
        features: ['Hingga 10 menu & sub-menu', 'Instalasi & uji coba', 'Panduan edit isi menu'],
        icon: MessageCircle
    },
    {
        id: 'telegram-notification',
        name: 'Bot Telegram Notifikasi Pesanan',
        description: 'Kirim notifikasi ke grup tim setiap ada pesanan atau form baru.',
        preview: 'notifikasi bot',
        category: 'Chatbot',
        price: 'Rp250.000',
        priceNote: '+ instalasi Rp150.000',
        timing: 'Unduh instan',
        features: ['Template bot + webhook', 'Format pesan bisa diubah', 'Panduan setup PDF'],
        icon: Send
    },
    {
        id: 'stock-inventory',
        name: 'Sheet Stok & Inventori',
        description: 'Stok masuk-keluar, peringatan stok menipis, dan rekap bulanan.',
        preview: 'sheet stok',
        category: 'Automation',
        price: 'Rp150.000',
        priceNote: 'Template saja',
        timing: 'Unduh instan',
        features: ['Template Google Sheets', 'Apps Script peringatan', 'Video panduan singkat'],
        icon: Boxes
    },
    {
        id: 'invoice-email',
        name: 'Invoice Otomatis ke Email',
        description: 'Isi baris di Sheets, invoice PDF terkirim ke pelanggan.',
        preview: 'invoice PDF',
        category: 'Automation',
        price: 'Rp250.000',
        priceNote: '+ instalasi Rp150.000',
        timing: 'Unduh instan',
        features: ['Template invoice + Sheets', 'Apps Script kirim email', 'Panduan setup PDF'],
        icon: FileText
    },
    {
        id: 'ai-whatsapp',
        name: 'Paket Chatbot AI WhatsApp',
        description: 'WhatsApp terhubung ke Gemini AI, percakapan tercatat di Sheets.',
        preview: 'chat AI',
        category: 'Chatbot',
        price: 'Rp1.500.000',
        priceNote: 'Termasuk instalasi',
        timing: '± 5 hari',
        features: ['Integrasi teks, gambar, file', '1 revisi & SOP PDF', 'Instalasi & uji coba'],
        icon: Workflow
    },
    {
        id: 'website',
        name: 'Website & Web Platform',
        description: 'Mulai dari landing page hingga platform web dengan fitur dan akses pengguna.',
        preview: 'web platform',
        category: 'Website',
        price: 'Custom quote',
        priceNote: 'Sesuai scope',
        timing: 'By scope',
        features: ['Landing page & company profile', 'Web app dengan login dan dashboard', 'Responsive design'],
        icon: Workflow
    },
    {
        id: 'mobile-app',
        name: 'Mobile App iOS & Android',
        description: 'Aplikasi mobile untuk pelanggan, tim internal, atau kebutuhan operasional.',
        preview: 'mobile app',
        category: 'Mobile',
        price: 'Custom quote',
        priceNote: 'Essential → Custom',
        timing: 'By scope',
        features: ['Satu codebase untuk iOS & Android', 'Essential hingga custom feature', 'Rilis dan maintenance plan'],
        icon: Boxes
    },
    {
        id: 'pos',
        name: 'POS & Retail System',
        description: 'Sistem kasir dan operasional toko untuk satu outlet hingga banyak cabang.',
        preview: 'point of sale',
        category: 'POS',
        price: 'Custom quote',
        priceNote: 'Lite → Enterprise',
        timing: 'By scope',
        features: ['Kasir, produk, dan stok', 'Laporan per outlet dan cabang', 'Odoo-powered untuk kebutuhan enterprise'],
        icon: Boxes
    },
    {
        id: 'chatbot-channel',
        name: 'Chatbot Multi-channel',
        description: 'Chatbot untuk WhatsApp, e-commerce, website, atau private server.',
        preview: 'multi-channel bot',
        category: 'Chatbot',
        price: 'Custom quote',
        priceNote: 'Sesuai channel',
        timing: 'By scope',
        features: ['FAQ dan katalog otomatis', 'WhatsApp, e-commerce, dan website', 'Private server tersedia'],
        icon: MessageCircle
    },
    {
        id: 'convera',
        name: 'Convera Ads Intelligence',
        description: 'Hubungkan data iklan dengan penjualan untuk melihat channel yang benar-benar menghasilkan.',
        preview: 'ads to sales',
        category: 'Convera',
        price: 'Custom quote',
        priceNote: 'Essential → Enterprise',
        timing: 'By scope',
        features: ['Tracking campaign dan conversion', 'Dashboard performa iklan', 'Data siap dipakai untuk keputusan'],
        icon: FileSpreadsheet
    },
    {
        id: 'sheets-automation',
        name: 'Sheets Automation',
        description: 'Spreadsheet yang membantu input, validasi, notifikasi, dan laporan berjalan otomatis.',
        preview: 'spreadsheet flow',
        category: 'Automation',
        price: 'Custom quote',
        priceNote: 'Essential → Custom',
        timing: 'By scope',
        features: ['Google Sheets & Apps Script', 'Notifikasi dan approval flow', 'Template sampai custom system'],
        icon: FileSpreadsheet
    },
    {
        id: 'finance-automation',
        name: 'Finance Automation',
        description: 'Kurangi pekerjaan rekap dan susun laporan keuangan dari data yang sudah tersedia.',
        preview: 'finance report',
        category: 'Finance',
        price: 'Custom quote',
        priceNote: 'Essential → Custom',
        timing: 'By scope',
        features: ['Rekap pemasukan dan pengeluaran', 'Invoice dan laporan berkala', 'Export untuk kebutuhan finance'],
        icon: FileText
    },
    {
        id: 'security-solutions',
        name: 'Security Solutions',
        description: 'Temukan celah, uji sistem, dan tingkatkan kesiapan tim menghadapi risiko keamanan.',
        preview: 'security assessment',
        category: 'Security',
        price: 'Custom quote',
        priceNote: 'Assessment → Training',
        timing: 'By scope',
        features: ['Vulnerability assessment', 'Penetration testing', 'Security awareness & phishing simulation'],
        icon: Workflow
    }
];

const faqs = [
    [
        'Saya belum tahu harus mulai dari mana.',
        'Ceritakan pekerjaan yang paling sering diulang atau paling banyak memakan waktu. Kami bantu menentukan solusi yang paling masuk akal.'
    ],
    [
        'Apakah bisa memakai tools yang sudah kami gunakan?',
        'Bisa. Kami akan melihat akses, data, dan batasan tools tersebut sebelum menentukan cara integrasinya.'
    ],
    [
        'Berapa biaya dan waktu pengerjaannya?',
        'Tergantung scope, jumlah fitur, dan integrasi. Setelah kebutuhan jelas, kami kirimkan scope, timeline, dan penawaran tertulis.'
    ],
    [
        'Apakah ada support setelah sistem digunakan?',
        'Ada. Cakupan support, garansi bug, dan maintenance plan disepakati sebelum pengerjaan dimulai.'
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
    const [menu, setMenu] = useState(false);
    const [modal, setModal] = useState(null);
    const [productView, setProductView] = useState('ready');
    const [productFilter, setProductFilter] = useState('Semua');
    const [service, setService] = useState(0);
    const [faq, setFaq] = useState(0);
    const [copied, setCopied] = useState(false);
    const [name, setName] = useState('');
    const [need, setNeed] = useState('');
    const [intro, setIntro] = useState(true);
    const catalogFlip = useRef(null);

    const dialog = useRef(null);
    const trigger = useRef(null);

    // useEffect(() => {
    //     const t = setTimeout(() => setIntro(false), 1500);
    //     return () => clearTimeout(t);
    // }, []);

    useEffect(() => {
    if (!intro) return;

    const html = document.documentElement;
    const body = document.body;

    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    return () => {
        html.style.overflow = previousHtmlOverflow;
        body.style.overflow = previousBodyOverflow;
    };
}, [intro]);
    
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

    const brief = makeBrief({ name, plan: modal, selected: [], notes: need });
    const waLink = whatsappUrl(WHATSAPP_NUMBER, brief);

    function switchProductView(view) {
        setProductView(view);
        window.setTimeout(() => {
            catalogFlip.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
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
        <div
            className={`intro ${!intro ? 'done' : ''}`}
            aria-hidden="true"
>
            <video
                className="intro-video"
                src="/assets/bumper.mov"
                autoPlay
                muted
                playsInline
                onEnded={() => setIntro(false)}
                onError={() => setIntro(false)}
            />
        </div>

            <header>
                <div className="nav shell">
                    <Brand />
                    <nav className={menu ? 'open' : ''}>
                        {[['Solusi', '#layanan'], ['Process', '#cara-kerja'], ['Produk', '#paket'], ['FAQ', '#faq']].map(([t, h]) => (
                            <a href={h} key={h} onClick={() => setMenu(false)}>{t}</a>
                        ))}
                    </nav>
                    <button className="nav-cta" onClick={() => setModal('Konsultasi gratis')}>
                        Konsultasi <ArrowUpRight size={17} />
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
                        <div className="eyebrow"><i /> SOFTWARE & AUTOMATION PARTNER</div>
                        <h1>
                            Rapikan proses.<br />
                            Fokus pada<br />
                            <em>bisnis Anda.</em>
                        </h1>
                        <p>
                            Kami membangun website, aplikasi, chatbot, POS,<br />
                            dan sistem automation sesuai kebutuhan bisnis Anda.
                        </p>
                        <div className="hero-actions">
                            <button className="button orange" onClick={() => setModal('Konsultasi gratis')}>
                                Mulai konsultasi <ArrowUpRight size={20} />
                            </button>
                            {/* <a className="text-link" href="#demo">
                                <span className="play"><Play size={13} fill="currentColor" /></span> Lihat cara kerjanya
                            </a> */}
                        </div>
                        <div className="hero-note">
                            <Check size={14} /> Clear scope. Practical solutions.
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
                                <small>CUSTOMER CHAT</small>
                                <strong>Balasan lebih cepat <CheckCheck size={14} /></strong>
                            </div>
                        </div>
                        <div className="float-card sheet">
                            <span className="app-icon blue"><FileSpreadsheet size={22} /></span>
                            <div>
                                <small>BUSINESS DATA</small>
                                <strong>Data lebih rapi.</strong>
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
                            <span className="eyebrow">01 / SOLUTIONS</span>
                            <h2>Solusi untuk proses<br />yang perlu <span className="serif">dirapikan.</span></h2>
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
                                Bahas solusi ini <ArrowUpRight size={18} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Cara Kerja */}
                <section className="section shell" id="cara-kerja" data-reveal>
                    <div className="section-head" data-reveal>
                        <div>
                            <span className="eyebrow">02 / PROCESS</span>
                            <h2>Dari kebutuhan<br /><span className="serif">sampai siap digunakan.</span></h2>
                        </div>
                        {/* <p>Proses jelas dari awal.<br />Anda tahu apa yang dibuat dan cara memakainya.</p> */}
                    </div>
                    <div className="steps" data-reveal>
                        {[
                            ['01', 'Ceritakan prosesnya', 'Kami pelajari pekerjaan, tools, dan target Anda.'],
                            ['02', 'Susun scope', 'Fitur, integrasi, timeline, dan biaya ditulis dengan jelas.'],
                            ['03', 'Build & review', 'Solusi dibuat, diuji, lalu direview bersama.'],
                            ['04', 'Handover & support', 'Anda menerima sistem, dokumentasi, dan support sesuai scope.']
                        ].map(([n, t, d]) => (
                            <div className="step" key={n}>
                                <span>{n}</span>
                                <h3>{t}</h3>
                                <p>{d}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Produk & layanan */}
                <section className="package-section" id="paket" data-reveal>
                    <div className="shell">
                        <div className="catalog-heading" data-reveal>
                            <div>
                                <span className="eyebrow">03 / PRODUK & HARGA</span>
                                <h2>Pilih produk siap pakai,<br />atau bangun alur<br /><span className="serif">khusus</span> bersama kami.</h2>
                            </div>
                        </div>

                        <div ref={catalogFlip} className={'catalog-flip ' + (productView === 'custom' ? 'is-flipped' : '')}>
                            <div className="catalog-flip-inner">
                                <div className="catalog-face catalog-front" aria-hidden={productView === 'custom'}>
                                    <div className="catalog-subhead">
                                        <div><span className="catalog-letter">A</span><h3>Produk siap pakai <small>Ready-to-use</small></h3><span>Harga tetap · langsung dikirim <small>Fixed price · instant delivery</small></span></div>
                                        <div className="product-filters" role="tablist" aria-label="Filter produk">
                                            {['Semua', 'Website', 'Mobile', 'POS', 'Chatbot', 'Automation', 'Convera', 'Finance', 'Security'].map(filter => (
                                                <button key={filter} className={productFilter === filter ? 'active' : ''} onClick={() => setProductFilter(filter)} role="tab" aria-selected={productFilter === filter}>{filter}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="product-grid">
                                        {products.filter(product => productFilter === 'Semua' || product.category === productFilter).map((product, index) => {
                                            const ProductIcon = product.icon;
                                            return (
                                                <article className="product-card" key={product.id}>
                                                    <div className="product-preview">
                                                        <span>preview: {product.preview}</span>
                                                        <strong><ProductIcon size={13} />{product.category}</strong>
                                                    </div>
                                                    <div className="product-card-body">
                                                        <div className="product-meta"><span>P-{String(index + 1).padStart(2, '0')}</span><span>{product.timing}</span></div>
                                                        <h3>{product.name}</h3>
                                                        <p>{product.description}</p>
                                                        <ul>{product.features.map(feature => <li key={feature}><Check size={14} />{feature}</li>)}</ul>
                                                        <div className="product-buy">
                                                            <div><small>Starts from</small><strong>{product.price}</strong><small>{product.priceNote}</small></div>
                                                            <button onClick={() => { setCopied(false); setModal(product.name); }}>Beli <ArrowUpRight size={15} /></button>
                                                        </div>
                                                    </div>
                                                </article>
                                            );
                                        })}
                                    </div>
                                    <p className="package-disclaimer">Produk siap pakai dikirim setelah pembayaran terkonfirmasi. Biaya platform/API pihak ketiga terpisah jika diperlukan.</p>
                                    <div className="custom-toggle">
                                        <p>Butuh alur yang dirancang khusus untuk bisnis Anda?</p>
                                        <button onClick={() => switchProductView('custom')} aria-label="Lihat proyek custom">
                                            Custom <span>Proyek khusus</span><ArrowUpRight size={21} />
                                        </button>
                                    </div>
                                </div>

                                <div className="catalog-face catalog-back" aria-hidden={productView !== 'custom'}>
                                    <div className="custom-project">
                                        <div className="custom-copy">
                                            <span className="catalog-letter">B &nbsp; Proyek custom <small>Custom project</small></span>
                                            <h3>Butuh lebih dari template?<br />Kami rancang alurnya dari nol.</h3>
                                            <p>Untuk proses yang melibatkan banyak sistem, AI, atau aturan bisnis khusus. Cakupan, revisi, dan dukungan disepakati sejak awal.</p>
                                            <div className="custom-price"><div><small>Starts from · Mulai dari</small><strong>Rp1.500.000</strong></div><div><small>Estimasi · Estimated time</small><strong>5+ hari</strong></div></div>
                                            <button className="button orange" onClick={() => { setCopied(false); setModal('Proyek custom'); }}>Konsultasi gratis via WhatsApp <ArrowUpRight size={18} /></button>
                                        </div>
                                        <div className="custom-topics">
                                            {[
                                                ['01', 'Chatbot AI', 'WhatsApp atau Telegram dengan konteks bisnis Anda.'],
                                                ['02', 'Hubungkan aplikasi', 'Satukan CRM, marketplace, pembayaran, dan tools internal.'],
                                                ['03', 'Inventori & dokumen', 'Stok, invoice, dan arsip diproses otomatis.'],
                                                ['04', 'Manajemen tim', 'Tugas, absensi, dan laporan harian dalam satu tempat.']
                                            ].map(([number, title, description]) => <div key={number}><span>{number}</span><h4>{title}</h4><p>{description}</p></div>)}
                                        </div>
                                        <div className="custom-steps">
                                            {[
                                                ['1', 'Konsultasi', 'Pemetaan proses dan kebutuhan'],
                                                ['2', 'Penawaran', 'Cakupan, harga, dan jadwal jelas'],
                                                ['3', 'Pengerjaan', 'Kami membuat, menguji, dan memperbaiki'],
                                                ['4', 'Serah terima', 'SOP, pelatihan, dan dukungan']
                                            ].map(([number, title, description]) => <div key={number}><span>{number}</span><strong>{title}</strong><small>{description}</small></div>)}
                                        </div>
                                    </div>
                                    <div className="custom-toggle custom-toggle-back">
                                        <p>Ingin melihat produk siap pakai?</p>
                                        <button onClick={() => switchProductView('ready')} aria-label="Lihat produk siap pakai">
                                            Products <span>Produk</span><ArrowUpRight size={17} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="section shell faq-layout" id="faq" data-reveal>
                    <div data-reveal>
                        <span className="eyebrow">FAQ</span>
                        <h2>Pertanyaan<br /><span className="serif">yang sering muncul.</span></h2>
                        <button className="text-link" onClick={() => setModal('Pertanyaan lain')}>
                            Bicarakan kebutuhan Anda <ArrowUpRight size={18} />
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
                        <span className="eyebrow">LET'S TALK</span>
                        <h2>Punya proses<br />yang perlu <span className="serif">dibangun?</span></h2>
                        <button className="button dark" onClick={() => setModal('Konsultasi gratis')}>
                            Mulai konsultasi <ArrowUpRight size={20} />
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
                    <span className="eyebrow">CONSULTATION</span>
                    <h2>Mulai dari <span className="serif">kebutuhan.</span></h2>
                    <p>Topik: <strong>{modal}</strong></p>
                    <div className="modal-needs">
                        <span>{modal || 'Konsultasi umum'}</span>
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
                            Nama / bisnis
                            <input
                                value={name}
                                onChange={e => { setName(e.target.value); setCopied(false); }}
                                placeholder="Nama atau nama bisnis"
                            />
                        </label>
                        <label>
                            Ceritakan kebutuhan Anda
                            <textarea
                                rows="3"
                                value={need}
                                onChange={e => { setNeed(e.target.value); setCopied(false); }}
                                placeholder="Contoh: ingin membuat website, POS, chatbot, atau laporan otomatis…"
                            />
                        </label>
                        <div className="brief-preview">{brief}</div>
                        <button className="button orange" type="submit">
                            {waLink ? 'Lanjut ke WhatsApp' : copied ? 'Ringkasan tersalin' : 'Salin ringkasan konsultasi'}
                            {waLink ? <MessageCircle size={18} /> : copied ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                        <p className="form-note" aria-live="polite">
                            {waLink
                                ? 'Pilihan produk otomatis disertakan. Anda dapat meninjau pesan sebelum mengirimnya.'
                                : copied
                                    ? 'Ringkasan dan pilihan produk tersalin. Belum ada pesan yang dikirim.'
                                    : 'Kontak WhatsApp sedang disiapkan. Untuk sementara, salin ringkasan konsultasi Anda.'
                            }
                        </p>
                    </form>
                </div>
            </dialog>
        </>
    );
}

createRoot(document.getElementById('root')).render(<App />);
