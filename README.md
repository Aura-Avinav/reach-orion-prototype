# AURA Studio — Luxury Dark Web Agency Website

A high-performance, dark-luxury web agency website built with semantic HTML5, modern vanilla CSS tokens, and JavaScript. Engineered around the curated **12-Color Branding Palette (Fig 1.1)** with a focus on **Headless CMS for bootstrapping Indian businesses** and **SaaS MVP engineering for global startups**.

---

## 🎨 Branding Palette Implementation (Fig 1.1)

All 12 colors are tokenized in [`css/tokens.css`](file:///run/media/avinav/Personal%20Files/projects/random/css/tokens.css):

| Swatch | Hex Code | Role |
| :--- | :--- | :--- |
| **Warm Goldenrod** | `#E5A93B` | Featured badges, key metrics, pricing highlights |
| **Burnt Terracotta** | `#A73C1E` | High-conversion primary CTAs & buttons |
| **Deep Slate Teal** | `#2C5D63` | Ambient mesh glow, card borders, secondary tags |
| **Cool Cream White** | `#F4F0E8` | High-contrast editorial headings & titles |
| **Light Sky Blue** | `#9BC4DC` | Subdued secondary accent |
| **Charcoal Black** | `#161719` | Root background & deep card layering |
| **Rich Walnut Brown** | `#54321E` | Elevated hover surfaces & warm shadows |
| **Latte Tan** | `#CCA072` | Section numbering (`01`, `02`) & quote elements |
| **Medium Sage Green** | `#7C9579` | Live project availability pill & ROI badges |
| **Soft Sky Blue** | `#97C4DE` | Monospace tags, status text, and links |
| **Dusty Ochre** | `#D89B52` | Warm secondary badges & card glows |
| **Subtle Mist Grey** | `#CED2D5` | Hairline borders & body paragraph text |

---

## ⚡ Core Features

1. **Dual-Currency Switcher (₹ INR / $ USD)**:
   - Toggles pricing tiers and the scope calculator between Indian Rupees and US Dollars.
2. **Interactive Project Scope & Cost Estimator**:
   - Live recalculation based on archetype, page count slider, and feature add-on checkboxes.
   - **"Lock In This Configuration"** pre-fills the inquiry form automatically.
3. **Transparent 3-Tier Packages**:
   - **Bootstrap Sprint** (₹45,000 / $650 • 10–14 days)
   - **Flagship Bespoke** (₹1,20,000 / $1,750 • 3–4 weeks)
   - **SaaS MVP & Retainer** (₹2,40,000 / $3,400 • 4–6 weeks)
4. **Interactive Case Studies & Modal**:
   - Filterable by Headless CMS, SaaS MVP, and Luxury & D2C.
   - Clickable cards open an architectural deep-dive dialog with quantifiable metrics.
5. **Zero-Database Frictionless Lead Intake**:
   - Saves submissions directly to browser `localStorage`.
   - Generates pre-filled `mailto:` email fallback with one click.
   - Direct 1-click WhatsApp chat integration.
6. **Built-in SEO & Performance**:
   - `Schema.org` `ProfessionalService` JSON-LD graph.
   - OpenGraph and Twitter card metadata.
   - Sub-second load times with zero third-party framework dependencies.

---

## 🚀 Running Locally

The local preview server is already running on port 4321:
```bash
# Open in your browser:
http://localhost:4321
```

Or run anytime with Python:
```bash
python3 -m http.server 4321
```

## 🌐 Deploying to Production (Zero Build Required)

Because this project uses vanilla modern web standards:
- **Cloudflare Pages**: Connect your Git repo or run `npx wrangler pages deploy .`
- **Vercel**: Run `npx vercel .`
- **GitHub Pages**: Push to repository and enable GitHub Pages in Settings.
