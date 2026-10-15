# dicodinginAJA

Responsive landing page built with React, Vite, CSS, and React Native Web (package-selection components).

## Local development

Run `npm install`, then `npx vite`. Production: `npm run build`.

## Content to finalize

- Packages: Basic starts from Rp200,000 (template only; installation from Rp350,000; menu chatbot from Rp650,000), Premium from Rp1,500,000, Custom quoted after consultation. Prices follow supplied references.
- Set `WHATSAPP_NUMBER` in `src/recommendation.js` only after business number confirmation, in international digits-only format. The modal then opens WhatsApp with an encoded brief including ALL selected needs, recommendation, chosen package, name and notes. Until configured, copying the brief remains available. No data is sent automatically.
- Recommendation: one simple need → Basic; AI/data processing or 2–3 needs → Premium; any advanced integration/operations requirement or 4+ needs → Custom. Clearing choices removes the recommendation.
- Workflow demo is illustrative and does not call external services.
- No customer counts, testimonials, or invented performance claims are included.

## Visuals

Palette follows the supplied brand images. `public/assets/mascot.png` is generated with the built-in image tool using the supplied mascot as reference: preserve orange T-shirt, brown hair, headset, friendly smile, and pointing pose; isolate on a transparent background without text or extra objects. Intro, floating mascot, and flow animations respect reduced-motion preferences.

## Validation

Production bundle built with Vite. Recommendation branches and all 511 nonempty selection combinations were checked, including WhatsApp message encoding. Browser interaction and visual QA were unavailable in the current environment.
