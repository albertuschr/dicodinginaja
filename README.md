# dicodinginAJA

Responsive landing page built with React, Vite, CSS, and React Native Web (package-selection components).

## Local development

Run `npm install`, then `npx vite`. Production: `npm run build`.

## Content to finalize

- The pricing section presents six plain-language ready-to-use products with filters for n8n, WhatsApp, Telegram, and Google Sheets, plus a separate custom-project view.
- Set `WHATSAPP_NUMBER` in `src/recommendation.js` only after business number confirmation, in international digits-only format. Product and custom-project CTAs open a modal with an encoded consultation brief. Until configured, copying the brief remains available. No data is sent automatically.
- The former interactive workflow demo has been removed; the page now focuses on understandable products and the custom-project path.
- No customer counts, testimonials, or invented performance claims are included.

## Visuals

Palette follows the supplied brand images. `public/assets/mascot.png` is generated with the built-in image tool using the supplied mascot as reference: preserve orange T-shirt, brown hair, headset, friendly smile, and pointing pose; isolate on a transparent background without text or extra objects. Intro, floating mascot, and flow animations respect reduced-motion preferences.

## Validation

Production bundle built with Vite. Recommendation branches and all 511 nonempty selection combinations were checked, including WhatsApp message encoding. Browser interaction and visual QA were unavailable in the current environment.
