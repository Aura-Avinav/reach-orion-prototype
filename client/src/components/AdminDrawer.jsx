import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Trash2, Database, CheckCircle, Mail, Phone, Clock, Lock, ShieldCheck, LogOut } from 'lucide-react';

export default function AdminDrawer({ isOpen, onClose }) {
  const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem('aura_admin_session_key') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!sessionStorage.getItem('aura_admin_session_key'));
  const [passkeyInput, setPasskeyInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [inquiries, setInquiries] = useState([]);
  const [dbStatus, setDbStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // Authenticate and fetch leads with admin key
  const fetchLeads = async (keyToUse = adminKey) => {
    if (!keyToUse) return;
    setLoading(true);
    setAuthError('');

    try {
      // 1. Fetch server health / DB status
      const healthRes = await fetch('/api/health');
      if (healthRes.ok) {
        const healthData = await healthRes.json();
        setDbStatus(healthData.database);
      }

      // 2. Fetch inquiries from Express backend with security header
      const res = await fetch('/api/inquiries', {
        headers: {
          'x-admin-key': keyToUse
        }
      });

      if (res.status === 401) {
        setIsAuthenticated(false);
        sessionStorage.removeItem('aura_admin_session_key');
        setAuthError('Invalid Admin Key. Access denied.');
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setInquiries(data.data || []);
        setIsAuthenticated(true);
        sessionStorage.setItem('aura_admin_session_key', keyToUse);
        setAdminKey(keyToUse);
      } else {
        setAuthError('Failed to fetch inquiries. Please try again.');
      }
    } catch {
      setAuthError('Connection error. Server may be starting or offline.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated && adminKey) {
      fetchLeads(adminKey);
    }
  }, [isOpen, isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!passkeyInput.trim()) return;
    fetchLeads(passkeyInput.trim());
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminKey('');
    setPasskeyInput('');
    setInquiries([]);
    sessionStorage.removeItem('aura_admin_session_key');
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this lead?')) return;
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-key': adminKey
        }
      });
      setInquiries(prev => prev.filter(i => (i._id || i.id) !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        justifyContent: 'flex-end',
        transition: 'opacity 0.3s ease'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          height: '100%',
          backgroundColor: '#161719',
          borderLeft: '1px solid var(--border-medium)',
          boxShadow: '-12px 0 45px rgba(0,0,0,0.85)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '22px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Lock size={19} color="var(--palette-warm-goldenrod)" />
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--palette-cool-cream-white)' }}>
              Founder Lead Portal
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isAuthenticated && (
              <>
                <button
                  onClick={() => fetchLeads()}
                  disabled={loading}
                  title="Refresh Leads"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--palette-subtle-mist-grey)',
                    cursor: 'pointer',
                    padding: '6px',
                    borderRadius: '6px'
                  }}
                >
                  <RefreshCw size={16} className={loading ? 'spin' : ''} />
                </button>
                <button
                  onClick={handleLogout}
                  title="Lock / Sign Out"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--palette-burnt-terracotta)',
                    cursor: 'pointer',
                    padding: '6px',
                    borderRadius: '6px'
                  }}
                >
                  <LogOut size={16} />
                </button>
              </>
            )}
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--palette-subtle-mist-grey)',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '6px'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Security Gate (When Not Authenticated) */}
        {!isAuthenticated ? (
          <div style={{ padding: '36px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(229, 169, 59, 0.12)',
                  border: '1px solid var(--palette-warm-goldenrod)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto'
                }}
              >
                <ShieldCheck size={28} color="var(--palette-warm-goldenrod)" />
              </div>
              <h4 style={{ color: 'var(--palette-cool-cream-white)', fontSize: '1.25rem', marginBottom: '8px' }}>
                Protected Lead Registry
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
                Client contact details, project briefs, and budgets are confidential. Enter your Founder Admin Passkey to unlock this portal.
              </p>
            </div>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--palette-subtle-mist-grey)', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                  Founder Admin Passkey
                </label>
                <input
                  type="password"
                  value={passkeyInput}
                  onChange={(e) => setPasskeyInput(e.target.value)}
                  placeholder="Enter admin secret..."
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--palette-cool-cream-white)',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {authError && (
                <div style={{ color: '#FF6B6B', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
                  ⚠️ {authError}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !passkeyInput.trim()}
                className="btn-primary"
                style={{
                  justifyContent: 'center',
                  padding: '12px',
                  fontSize: '0.9rem',
                  opacity: loading || !passkeyInput.trim() ? 0.6 : 1
                }}
              >
                {loading ? 'Verifying...' : 'Unlock Client Leads'}
              </button>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textAlign: 'center', marginTop: '6px' }}>
                Configured via <code>ADMIN_SECRET</code> in <code>server/.env</code>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Leads View */
          <>
            {/* Database Status Strip */}
            <div
              style={{
                padding: '12px 24px',
                backgroundColor: 'rgba(44, 93, 99, 0.15)',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: dbStatus?.includes('MongoDB') ? '#7C9579' : '#E5A93B'
                  }}
                />
                <span style={{ color: 'var(--palette-cool-cream-white)' }}>
                  Backend Mode: <strong>{dbStatus || 'Connected'}</strong>
                </span>
              </div>
              <span style={{ color: 'var(--palette-soft-sky-blue)' }}>
                {inquiries.length} Lead{inquiries.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Content Area */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              {loading && (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  Fetching latest inquiries securely...
                </div>
              )}

              {!loading && inquiries.length === 0 && (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    color: 'var(--text-muted)',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    borderRadius: '12px',
                    border: '1px dashed var(--border-subtle)'
                  }}
                >
                  <CheckCircle size={32} color="var(--palette-warm-goldenrod)" style={{ margin: '0 auto 12px auto' }} />
                  <div style={{ color: 'var(--palette-cool-cream-white)', fontWeight: 600, marginBottom: '6px' }}>
                    No Inquiries Yet
                  </div>
                  <p style={{ fontSize: '0.88rem', margin: 0 }}>
                    Inquiries submitted via the contact form or scope calculator will appear here once authenticated.
                  </p>
                </div>
              )}

              {!loading &&
                inquiries.map((inq) => {
                  const id = inq._id || inq.id;
                  const dateStr = inq.createdAt ? new Date(inq.createdAt).toLocaleString() : 'Just now';

                  return (
                    <div
                      key={id}
                      style={{
                        backgroundColor: 'rgba(24, 26, 29, 0.85)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '12px',
                        padding: '18px',
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div>
                          <h4 style={{ margin: 0, color: 'var(--palette-cool-cream-white)', fontSize: '1.05rem' }}>
                            {inq.name}
                          </h4>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', fontSize: '0.78rem', color: 'var(--palette-soft-sky-blue)', fontFamily: 'var(--font-mono)' }}>
                            <span>{inq.projectType}</span>
                            <span>•</span>
                            <span>Budget: {inq.budget || 'Flexible'}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete(id)}
                          title="Delete record"
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'rgba(255,255,255,0.3)',
                            cursor: 'pointer',
                            padding: '4px'
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: '10px 0', whiteSpace: 'pre-wrap' }}>
                        {inq.brief}
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '0.8rem', color: 'var(--palette-subtle-mist-grey)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <Mail size={13} color="var(--palette-latte-tan)" />
                          <a href={`mailto:${inq.email}`} style={{ color: 'var(--palette-latte-tan)' }}>{inq.email}</a>
                        </div>
                        {inq.phone && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Phone size={13} color="var(--palette-medium-sage-green)" />
                            <span>{inq.phone}</span>
                          </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                          <Clock size={12} />
                          <span>{dateStr}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
