import React, { useState, useEffect } from 'react';

export default function NoticeBar({ currency, onCurrencyChange }) {
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setIstTime(`Bengaluru / IST: ${istString}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="top-notice-bar" aria-label="Agency Status & Availability">
      <div className="notice-status">
        <span className="pulse-dot" aria-hidden="true"></span>
        <span><strong>Accepting Projects:</strong> 2 Client Slots Available for Q2 Sprint</span>
      </div>
      <div className="notice-actions">
        <span id="agency-clock" className="agency-time-clock">{istTime || 'Bengaluru / IST: --:--:--'}</span>
        <div className="currency-toggle-wrap" role="group" aria-label="Currency Selector">
          <button
            type="button"
            className={`curr-btn ${currency === 'INR' ? 'active' : ''}`}
            onClick={() => onCurrencyChange('INR')}
            aria-label="View pricing in Indian Rupees"
          >
            ₹ INR
          </button>
          <button
            type="button"
            className={`curr-btn ${currency === 'USD' ? 'active' : ''}`}
            onClick={() => onCurrencyChange('USD')}
            aria-label="View pricing in US Dollars"
          >
            $ USD
          </button>
        </div>
      </div>
    </aside>
  );
}
