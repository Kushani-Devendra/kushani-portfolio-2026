import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function NotFoundPage() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#fff', textAlign: 'center', padding: '40px 24px',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: easeOut }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}
      >
        {/* Big 404 */}
        <div style={{
          fontFamily: 'Instrument Serif, serif',
          fontSize: 'clamp(100px, 20vw, 200px)',
          lineHeight: 0.9,
          letterSpacing: '-0.06em',
          color: '#2E2C29',
          opacity: 0.07,
          userSelect: 'none',
        }}>
          404
        </div>

        <div style={{ marginTop: -32 }}>
          <h1 style={{
            fontFamily: 'Instrument Serif, serif',
            fontSize: 'clamp(28px, 4vw, 48px)',
            letterSpacing: '-0.04em',
            color: '#2E2C29',
            lineHeight: 1,
            marginBottom: 14,
          }}>
            Page not found
          </h1>
          <p style={{
            fontFamily: 'Instrument Sans, sans-serif',
            fontWeight: 300, fontSize: 17,
            color: '#9FA0A3', lineHeight: 1.6,
            maxWidth: 360,
          }}>
            This page doesn't exist or was moved. Let's get you back somewhere useful.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '12px 28px', borderRadius: 99,
              background: '#2E2C29', color: '#fff',
              fontFamily: 'Instrument Sans, sans-serif', fontWeight: 500, fontSize: 14,
              textDecoration: 'none', transition: 'background 0.22s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#4A4845')}
            onMouseLeave={e => (e.currentTarget.style.background = '#2E2C29')}
          >
            ← Home
          </Link>
          <Link
            to="/work"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '12px 28px', borderRadius: 99,
              border: '1.5px solid rgba(0,0,0,0.13)',
              color: '#2E2C29',
              fontFamily: 'Instrument Sans, sans-serif', fontWeight: 500, fontSize: 14,
              textDecoration: 'none', transition: 'all 0.22s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#2E2C29'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = '#2E2C29'; }}
          >
            View work
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
