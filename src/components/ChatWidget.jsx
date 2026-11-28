import { useEffect, useRef, useState } from 'react';
import { Bot, MessageCircle, RotateCcw, Send, Sparkles, X } from 'lucide-react';
import { links } from '../lib.js';

const webhookUrl = import.meta.env.VITE_CHATBOT_WEBHOOK_URL;
const sessionStorageKey = 'dicodinginaja-chat-session';
const quickQuestions = [
  { action: 'faq_layanan', label: 'Layanan apa saja?' },
  { action: 'faq_harga', label: 'Berapa kisaran harganya?' },
  { action: 'faq_proses', label: 'Bagaimana prosesnya?' },
  { action: 'faq_konsultasi', label: 'Konsultasi gratis' },
];

function createSessionId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `chat-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getSessionId() {
  try {
    const existingId = window.sessionStorage.getItem(sessionStorageKey);
    if (existingId) return existingId;
    const sessionId = createSessionId();
    window.sessionStorage.setItem(sessionStorageKey, sessionId);
    return sessionId;
  } catch {
    return createSessionId();
  }
}

function createMessage(role, text, extra = {}) {
  return { id: createSessionId(), role, text, ...extra };
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sessionId] = useState(getSessionId);
  const [messages, setMessages] = useState(() => [
    createMessage(
      'assistant',
      'Hai! Aku asisten dicodinginAJA. Ada yang ingin kamu tanyakan seputar layanan otomasi, harga, atau konsultasi gratis?',
    ),
  ]);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  const sendMessage = async (text, action = 'chat') => {
    const message = text.trim();
    if (!message || isSending) return;

    setInput('');
    setIsSending(true);
    setMessages((current) => [...current, createMessage('user', message)]);
    const pendingReply = createMessage('assistant', 'Sedang menyiapkan jawaban...');
    setMessages((current) => [...current, pendingReply]);

    try {
      if (!webhookUrl) {
        throw new Error('VITE_CHATBOT_WEBHOOK_URL belum dikonfigurasi.');
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, message, sessionId }),
      });

      if (!response.ok) {
        throw new Error(`Webhook merespons dengan status ${response.status}.`);
      }

      const data = await response.json();
      if (typeof data.reply !== 'string' || !data.reply.trim()) {
        throw new Error('Respons webhook tidak memiliki teks reply yang valid.');
      }

      setMessages((current) =>
        current.map((item) => (item.id === pendingReply.id ? { ...item, text: data.reply } : item)),
      );
    } catch (error) {
      console.error('Chatbot webhook request failed:', error);
      setMessages((current) =>
        current.map((item) =>
          item.id === pendingReply.id
            ? {
                ...item,
                text: webhookUrl
                  ? 'Maaf, pesan belum terkirim. Coba lagi sebentar atau hubungi kami lewat WhatsApp.'
                  : 'Chatbot belum tersambung. Silakan hubungi kami lewat WhatsApp sementara.',
                failed: true,
              }
            : item,
        ),
      );
    } finally {
      setIsSending(false);
    }
  };

  const submitMessage = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="chat-widget">
      {isOpen && (
        <section
          className="chat-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="chat-title"
        >
          <header className="chat-header">
            <div className="chat-avatar" aria-hidden="true">
              <Bot size={23} />
            </div>
            <div className="chat-heading">
              <h2 id="chat-title">Asisten dicodinginAJA</h2>
              <p><span className="chat-online-dot" /> Siap bantu cari solusi</p>
            </div>
            <button
              className="chat-close"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Tutup chat"
            >
              <X size={20} />
            </button>
          </header>

          <div className="chat-messages" aria-live="polite" aria-relevant="additions text">
            <div className="chat-date-label"><Sparkles size={13} /> #BiarSistemYangKerja</div>
            {messages.map((message) => (
              <div className={`chat-message-row chat-message-${message.role}`} key={message.id}>
                {message.role === 'assistant' && (
                  <span className="chat-message-avatar" aria-hidden="true"><Bot size={15} /></span>
                )}
                <div className="chat-message-content">
                  <div className="chat-bubble">{message.text}</div>
                  {message.failed && (
                    <a className="chat-whatsapp-link" href={links.waLink} target="_blank" rel="noopener noreferrer">
                      Hubungi kami lewat WhatsApp
                    </a>
                  )}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="chat-quick-questions" aria-label="Pertanyaan yang sering ditanyakan">
                {quickQuestions.map((question) => (
                  <button
                    key={question.action}
                    type="button"
                    disabled={isSending}
                    onClick={() => sendMessage(question.label, question.action)}
                  >
                    {question.label}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-compose" onSubmit={submitMessage}>
            <label className="chat-sr-only" htmlFor="chat-message-input">Tulis pesan</label>
            <input
              id="chat-message-input"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Tulis pertanyaanmu..."
              autoComplete="off"
              disabled={isSending}
            />
            <button
              className="chat-send"
              type="submit"
              aria-label="Kirim pesan"
              disabled={!input.trim() || isSending}
            >
              {isSending ? <RotateCcw className="chat-loading-icon" size={18} /> : <Send size={18} />}
            </button>
          </form>
          <p className="chat-disclaimer">Asisten virtual dicodinginAJA · Konsultasi gratis</p>
        </section>
      )}

      <button
        className={`chat-launcher${isOpen ? ' chat-launcher-open' : ''}`}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Tutup chat' : 'Buka chat dengan dicodinginAJA'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={25} /> : <MessageCircle size={25} />}
        {!isOpen && <span className="chat-launcher-label">Chat kami</span>}
      </button>
    </div>
  );
}
