import React from 'react';
import { Project } from './data';

export function Mockup({ project }: { project: Project }) {
  const { mockup, accent } = project;
  const glass: React.CSSProperties = {
    background: 'rgba(255,255,255,0.07)',
    border: '1.5px solid rgba(255,255,255,0.13)',
    borderRadius: 18,
  };

  if (mockup === 'mobile') return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div style={{ ...glass, width: 180, height: 340, padding: 10, display: 'flex', flexDirection: 'column', borderRadius: 28 }}>
        <div style={{ flex: 1, background: '#fff', borderRadius: 20, padding: 14, overflow: 'hidden' }}>
          <div style={{ width: '55%', height: 7, background: accent, borderRadius: 4, marginBottom: 8 }} />
          <div style={{ width: '80%', height: 4, background: '#0001', borderRadius: 3, marginBottom: 4 }} />
          <div style={{ width: '68%', height: 4, background: '#0001', borderRadius: 3, marginBottom: 16 }} />
          <div style={{ height: 72, background: accent + '28', borderRadius: 12, marginBottom: 10 }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
            {[1,2,3,4].map(k => <div key={k} style={{ height: 52, background: '#0000000A', borderRadius: 10 }} />)}
          </div>
          <div style={{ marginTop: 10, height: 28, background: accent + '18', borderRadius: 8 }} />
        </div>
      </div>
    </div>
  );

  if (mockup === 'desktop') return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', height: '100%', paddingBottom: 14 }}>
      <div style={{ ...glass, width: '90%', height: 195 }}>
        <div style={{ height: 22, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', gap: 5, padding: '0 10px', borderRadius: '18px 18px 0 0' }}>
          {[1,2,3].map(k => <div key={k} style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />)}
        </div>
        <div style={{ padding: 12, display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 10 }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, height: 150 }}>
            {[1,2,3,4,5].map(k => (
              <div key={k} style={{ margin: '10px 8px 0', height: 6, background: 'rgba(255,255,255,0.12)', borderRadius: 3, width: `${70 - k * 5}%` }} />
            ))}
          </div>
          <div>
            <div style={{ height: 9, background: accent + '55', borderRadius: 4, marginBottom: 8, width: '45%' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 7, marginBottom: 8 }}>
              {[1,2,3].map(k => <div key={k} style={{ height: 42, background: 'rgba(255,255,255,0.05)', borderRadius: 8 }} />)}
            </div>
            <div style={{ height: 60, background: accent + '14', borderRadius: 10 }} />
          </div>
        </div>
      </div>
    </div>
  );

  // tablet
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <div style={{ ...glass, width: '80%', height: 195, padding: 16 }}>
        <div style={{ height: 9, width: '40%', background: accent, borderRadius: 5, marginBottom: 12 }} />
        {[1,2,3].map(k => <div key={k} style={{ height: 5, background: 'rgba(255,255,255,0.14)', borderRadius: 3, marginBottom: 7, width: `${90 - k * 8}%` }} />)}
        <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
          <div style={{ width: '38%', height: 68, background: accent + '20', borderRadius: 10 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[1,2,3].map(k => <div key={k} style={{ height: 18, background: 'rgba(255,255,255,0.07)', borderRadius: 6 }} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
