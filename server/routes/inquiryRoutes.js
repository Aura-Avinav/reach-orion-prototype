const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { InquiryService } = require('../models/Inquiry');
const { requireAdminAuth } = require('../middleware/auth');

// Rate limiter for lead intake: max 10 submissions per hour per IP
const intakeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many inquiries submitted from this IP address. Please try again after an hour or contact us on WhatsApp directly.'
  }
});

// Sanitization helper: strict type checking & HTML escaping
const sanitizeString = (val, maxLen = 500) => {
  if (typeof val !== 'string') return '';
  return val
    .trim()
    .slice(0, maxLen)
    .replace(/[<>]/g, ''); // Strip direct tag brackets to prevent XSS
};

const isValidEmail = (email) => {
  if (typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

// POST /api/inquiries - Submit new lead/inquiry (Protected with rate limiting & sanitization)
router.post('/', intakeLimiter, async (req, res) => {
  try {
    const rawBody = req.body || {};
    
    // Strict string extraction preventing NoSQL operator injection
    const name = sanitizeString(rawBody.name, 100);
    const email = typeof rawBody.email === 'string' ? rawBody.email.trim().toLowerCase().slice(0, 150) : '';
    const phone = sanitizeString(rawBody.phone, 30);
    const projectType = sanitizeString(rawBody.projectType, 50) || 'Headless CMS';
    const budget = sanitizeString(rawBody.budget, 60) || 'Flexible';
    const brief = sanitizeString(rawBody.brief, 2000);
    const currency = rawBody.currency === 'USD' ? 'USD' : 'INR';

    if (!name || !email || !brief) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and project brief are required.'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid work email address.'
      });
    }

    const newInquiry = await InquiryService.create({
      name,
      email,
      phone,
      projectType,
      budget,
      brief,
      currency,
      scopeConfig: null
    });

    return res.status(201).json({
      success: true,
      message: 'Project inquiry securely registered with AURA Studio.',
      data: {
        id: newInquiry._id || newInquiry.id,
        name: newInquiry.name,
        projectType: newInquiry.projectType,
        status: newInquiry.status,
        createdAt: newInquiry.createdAt
      }
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error processing inquiry.'
    });
  }
});

// GET /api/inquiries - Fetch leads (Strictly Protected: Requires Valid Admin Key)
router.get('/', requireAdminAuth, async (req, res) => {
  try {
    const inquiries = await InquiryService.find();
    return res.json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve project inquiries.'
    });
  }
});

// DELETE /api/inquiries/:id - Delete lead (Strictly Protected: Requires Valid Admin Key)
router.delete('/:id', requireAdminAuth, async (req, res) => {
  try {
    const id = sanitizeString(req.params.id, 60);
    const result = await InquiryService.findByIdAndDelete(id);
    return res.json({
      success: true,
      message: 'Inquiry removed successfully.',
      result
    });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete inquiry.'
    });
  }
});

module.exports = router;
