import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PASS_KEY = 'kd_portfolio_auth';
const PASSWORD = 'kushani2025'; // change this to your preferred password

export function useAuth() {
  const [authed, setAuthed] = useState(() => {
    try { return sessionStorage.getItem(PASS_KEY) === 'true'; } catch { return false; }
  });
  const unlock = () => {
    try { sessionStorage.setItem(PASS_KEY, 'true'); } catch {}
    setAuthed(true);
  };
  return { authed, unlock };
}

export function PasswordGate({ onUnlock, modal = false }: { onUnlock: () => void; modal?: boolean }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 600);
  }, []);

  const attempt = () => {
    if (value === PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setValue('');
      setTimeout(() => { setShake(false); setError(false); }, 1200);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') attempt();
  };

  const inner = (
    <motion.div
        initial={{ opacity: 0, y: modal ? 0 : 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: modal ? 0.25 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, maxWidth: 420, width: '100%' }}
      >
        {/* Lock icon */}
        <motion.div
          animate={{ rotate: error ? [0, -8, 8, -6, 6, 0] : 0 }}
          transition={{ duration: 0.45 }}
          style={{ marginBottom: 32 }}
        >
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: '#F0EDE8',
            border: '1.5px solid rgba(0,0,0,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
              <rect x="1" y="9" width="18" height="12" rx="3" stroke="#2E2C29" strokeWidth="1.5" />
              <path d="M6 9V6a4 4 0 1 1 8 0v3" stroke="#2E2C29" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="10" cy="15" r="1.5" fill="#2E2C29" />
            </svg>
          </div>
        </motion.div>

        {/* Wordmark */}
        <div style={{
          fontFamily: 'Instrument Serif, serif',
          fontSize: 28, letterSpacing: '-0.04em',
          color: '#2E2C29', marginBottom: 8, lineHeight: 1,
        }}>
          Kushani Devendra
        </div>
        <div style={{
          fontFamily: 'Instrument Sans, sans-serif',
          fontSize: 14, fontWeight: 300,
          color: '#9FA0A3', letterSpacing: '-0.01em', marginBottom: 48,
        }}>
          This portfolio is password protected.
        </div>

        {/* Input */}
        <motion.div
          animate={shake ? { x: [-12, 12, -10, 10, -6, 6, 0] } : { x: 0 }}
          transition={{ duration: 0.45 }}
          style={{ width: '100%' }}
        >
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 12, width: '100%',
          }}>
            <div style={{ position: 'relative' }}>
              <input
                ref={inputRef}
                type="password"
                placeholder="Enter password"
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={handleKey}
                style={{
                  width: '100%',
                  padding: '14px 52px 14px 18px',
                  fontFamily: 'Instrument Sans, sans-serif',
                  fontSize: 15, fontWeight: 400,
                  color: '#2E2C29',
                  background: '#fff',
                  border: `1.5px solid ${error ? '#E84455' : 'rgba(0,0,0,0.12)'}`,
                  borderRadius: 12,
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  letterSpacing: '0.04em',
                }}
                onFocus={e => { if (!error) e.target.style.borderColor = '#2E2C29'; }}
                onBlur={e => { if (!error) e.target.style.borderColor = 'rgba(0,0,0,0.12)'; }}
              />
              {/* Submit arrow */}
              <button
                onClick={attempt}
                style={{
                  position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                  width: 32, height: 32, borderRadius: 8,
                  background: value ? '#2E2C29' : 'rgba(0,0,0,0.06)',
                  border: 'none', cursor: value ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 6.5h9M6.5 2l4.5 4.5-4.5 4.5" stroke={value ? '#fff' : '#9FA0A3'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    fontFamily: 'Instrument Sans, sans-serif',
                    fontSize: 13, color: '#E84455',
                    textAlign: 'center', letterSpacing: '-0.01em',
                  }}
                >
                  Incorrect password. Please try again.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer note */}
        <div style={{
          marginTop: 48,
          fontFamily: 'Instrument Sans, sans-serif',
          fontSize: 12, color: '#C4C5C7', letterSpacing: '-0.01em',
          textAlign: 'center',
        }}>
          Reach out at{' '}
          <a href="mailto:kushani2000@gmail.com" style={{ color: '#9FA0A3', textDecoration: 'none' }}>
            kushani2000@gmail.com
          </a>{' '}
          to request access.
        </div>
    </motion.div>
  );

  if (modal) return inner;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#FAFAF8',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: 32,
    }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06, pointerEvents: 'none' }}>
        <filter id="pg-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#pg-grain)" />
      </svg>
      {inner}
    </div>
  );
}
