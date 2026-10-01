# AURA Studio — Luxury Dark Web Agency (MERN Tech Stack)

A high-performance, dark-luxury web agency platform built on the full **MERN Tech Stack** (MongoDB, Express, React, Node.js) with an **interactive 3D WebGL Three.js background animation**, professional branding typography, dual-currency estimation engine, and comprehensive SEO architecture.

Engineered around the curated **12-Color Branding Palette (Fig 1.1)** with a specialized focus on **Headless CMS for bootstrapping Indian businesses** and **SaaS MVP engineering for global startups**.

---

## 🛠️ Architecture & Tech Stack

### 1. Frontend (`client/`)
- **React 19 / 18** with **Vite** for ultra-fast HMR and sub-second builds.
- **Three.js Interactive 3D Background**: Real-time WebGL particle constellation, glowing brand polyhedra (icosahedron/octahedron/torus knot), undulating 3D wave mesh, and smooth mouse parallax.
- **Branding Fonts**:
  - Display: **`Syne`** (Bold avant-garde luxury geometric branding)
  - Body: **`Plus Jakarta Sans`** (Ultra-crisp modern editorial font)
  - Monospace: **`JetBrains Mono`** (High-precision technical metrics & tags)
- **Comprehensive SEO Layout**:
  - Full OpenGraph & Twitter Card metadata
  - `Schema.org` `ProfessionalService` & `OfferCatalog` JSON-LD structured data
  - Semantic HTML5 hierarchy, landmark roles, and accessible ARIA attributes
- **Interactive Components**:
  - Dual-Currency Switcher (₹ INR / $ USD)
  - Dynamic Project Scope & Cost Estimator with live recalculation
  - Filterable Case Studies with architectural modal dialogs
  - Frictionless Lead Intake Form with instant database persistence
  - Live Slide-Out Admin Drawer to view MongoDB leads in real time

### 2. Backend (`server/`)
- **Node.js** & **Express** REST API.
- **MongoDB** integration with **Mongoose** (`server/models/Inquiry.js`, `server/models/CaseStudy.js`).
- **Resilient Dual-Mode Storage**:
  - Automatically connects to MongoDB (or MongoDB Atlas via `MONGODB_URI` in `.env`).
  - Gracefully falls back to a file-backed JSON store in `server/data/` if MongoDB is offline, guaranteeing 100% zero-failure out-of-the-box operation.
- **API Endpoints**:
  - `POST /api/inquiries`: Submit project briefs directly to the database.
  - `GET /api/inquiries`: Fetch all stored leads for admin review.
  - `DELETE /api/inquiries/:id`: Remove or archive inquiries.
  - `GET /api/case-studies`: Fetch portfolio case studies and metrics.
  - `POST /api/estimates/calculate`: Server-side scope calculation verification.
  - `GET /api/health`: Health status and database diagnostic endpoint.

---

## 🎨 Branding Palette Implementation (Fig 1.1)

All 12 colors are tokenized in `css/tokens.css` and `client/src/styles/tokens.css`:

| Swatch | Hex Code | Role |
| :--- | :--- | :--- |
| **Warm Goldenrod** | `#E5A93B` | Featured badges, key metrics, pricing highlights, 3D particles |
| **Burnt Terracotta** | `#A73C1E` | High-conversion primary CTAs, buttons, 3D core |
| **Deep Slate Teal** | `#2C5D63` | Ambient mesh glow, card borders, 3D undulating wave plane |
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

## 🚀 Running the Project

### Option 1: Full MERN Stack (Recommended)

Run both the Express backend API and the Vite React frontend concurrently with one command from the project root:

```bash
# Install root dependencies
npm install

# Start both Node/Express API server (port 5000) & Vite React client (port 5173):
npm run dev
```

- **React Client**: [http://localhost:5173](http://localhost:5173) (Proxies `/api` to Express)
- **Express API**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### Option 2: Production Build & Run

```bash
# Build React client bundle
npm run build

# Start production server (serves React dist + API on port 5000)
npm start
```

### Option 3: Standalone Client or Server

```bash
# Run backend only:
npm run server

# Run frontend only:
npm run client
```

### Option 4: Static Preview (Zero-Build Fallback)

The root also preserves the standalone static HTML/CSS/JS version with Three.js CDN integration:

```bash
python3 -m http.server 4321
# Open http://localhost:4321 in browser
```

---

## ⚙️ MongoDB Configuration

By default, the server connects to local MongoDB or gracefully uses the local file store in `server/data/inquiries.json`. To connect to a cloud MongoDB Atlas database:

1. Create a `server/.env` file (copy from `server/.env.example`).
2. Add your MongoDB connection string:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/aura_agency?retryWrites=true&w=majority
   ```
3. Restart the server. Mongoose will automatically connect to your Atlas cluster!
