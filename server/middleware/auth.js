/**
 * Authentication Middleware for Admin Operations
 * Protects client lead PII and management endpoints from unauthorized public access.
 */
const requireAdminAuth = (req, res, next) => {
  const adminSecret = process.env.ADMIN_SECRET || 'aura_studio_founder_key_2026';
  
  // Check x-admin-key header or Bearer token
  const providedKey = req.headers['x-admin-key'] || 
    (req.headers.authorization && req.headers.authorization.startsWith('Bearer ') 
      ? req.headers.authorization.slice(7).trim() 
      : null);

  if (!providedKey || providedKey !== adminSecret) {
    return res.status(401).json({
      success: false,
      message: 'Access Denied: Invalid or missing Admin Key. This resource is protected to safeguard client privacy.'
    });
  }

  next();
};

module.exports = { requireAdminAuth };
