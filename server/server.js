const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const dotenv = require('dotenv');
const { connectDB, getDBStatus } = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (with automatic resilient fallback)
connectDB();

// 1. Security Headers via Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://cdnjs.cloudflare.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'blob:', 'https:'],
        connectSrc: ["'self'", 'http://localhost:*', 'ws://localhost:*'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: []
      }
    },
    crossOriginEmbedderPolicy: false
  })
);

// 2. CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim()) 
  : ['http://localhost:5173', 'http://localhost:4321', 'http://localhost:5000'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server) or listed origins
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(new Error('Blocked by CORS policy'));
  },
  credentials: true
}));

// 3. Body Parser with strict payload size limit (30kb)
app.use(express.json({ limit: '30kb' }));
app.use(express.urlencoded({ extended: true, limit: '30kb' }));

// 4. Global API Rate Limiter: max 250 requests per 15 minutes
const globalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 250,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again later.'
  }
});
app.use('/api', globalApiLimiter);

// 5. API Routes
app.use('/api/inquiries', require('./routes/inquiryRoutes'));
app.use('/api/case-studies', require('./routes/portfolioRoutes'));
app.use('/api/estimates', require('./routes/estimateRoutes'));

// System Health & Diagnostics (Exposes zero confidential keys)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    agency: 'AURA Studio Engineering Core',
    timestamp: new Date().toISOString(),
    database: getDBStatus().type,
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0-mern'
  });
});

// Production client serving
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '../client/dist');
  app.use(express.static(clientDist));
  app.use((req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// Global Central Error Handler (Prevents leaking stack traces)
app.use((err, req, res, next) => {
  console.error('[AURA Studio Error]', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'An internal error occurred. Please contact hello@aurastudio.agency.' 
      : err.message
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`[AURA Studio API] Server running on http://localhost:${PORT}`);
  console.log(`[AURA Studio API] Database mode: ${getDBStatus().type}`);
  console.log(`[AURA Studio API] Security shields: Helmet, Rate-Limiting, Admin Auth, and Input Sanitization active.`);
});
