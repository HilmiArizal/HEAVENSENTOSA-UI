import React from 'react';
import { Instagram, Phone, Award } from 'lucide-react';

// Custom TikTok Icon Component
function TikTokIcon({ size = 16 }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.83V7.63a6.34 6.34 0 0 0-3.5 1 6.34 6.34 0 1 0 10.84 4.54V9.05a8.28 8.28 0 0 0 4.77 1.48V7.08a4.84 4.84 0 0 1-2-0.39z"/>
    </svg>
  );
}

export default function TentangKamiModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '640px', width: '94%', padding: '1.25rem 1.5rem', maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Header Compact */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', paddingBottom: '0.65rem', borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <img 
              src="/logo-hs.png" 
              alt="Heaven Sentosa Logo" 
              style={{ height: '38px', objectFit: 'contain' }} 
            />
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#fff', margin: 0, lineHeight: 1.2 }}>
                Tentang CV. HEAVEN SENTOSA
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', margin: 0, fontWeight: '700' }}>
                PRODUSEN SOSIS BAKAR PREMIUM SAREN ONE
              </p>
            </div>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={onClose} style={{ borderRadius: '50px', padding: '0.2rem 0.6rem', fontSize: '0.8rem' }}>✕</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', color: 'var(--text-main)', fontSize: '0.85rem', lineHeight: '1.45' }}>
          <p style={{ margin: 0 }}>
            <b>CV. HEAVEN SENTOSA</b> adalah produsen & distributor olahan daging premium terpercaya yang menghadirkan lini sosis bakar lezat berkualitas tinggi lewat brand unggulan <b>SAREN ONE</b>.
          </p>

          <div className="glass-panel" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--accent-gold)' }}>
            <h4 style={{ color: '#fff', marginBottom: '0.35rem', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Award size={16} style={{ color: 'var(--accent-gold)' }} /> Keunggulan Produk Kami:
            </h4>
            <ul style={{ paddingLeft: '1.1rem', margin: 0, color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              <li>Menggunakan daging pilihan kualitas terbaik dengan tekstur juicy & kenyal.</li>
              <li>Bumbu rempah racikan khas yang meresap sempurna saat dibakar/digoreng.</li>
              <li>Tersedia varian gramasi komplit (250g, 500g, 900g) untuk UMKM & Konsumsi.</li>
              <li>Diproses higienis dengan standar pengawasan kualitas ketat.</li>
            </ul>
          </div>

          {/* Social Media & Contact Buttons - Compact 3 Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.6rem', marginTop: '0.25rem' }}>
            
            {/* Instagram Button */}
            <a 
              href="https://instagram.com/sarenone.sosis" 
              target="_blank" 
              rel="noreferrer"
              className="btn"
              style={{
                background: 'linear-gradient(135deg, #e1306c, #fd1d1d, #f56040)',
                color: '#fff',
                borderRadius: 'var(--radius-md)',
                padding: '0.55rem 0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontSize: '0.82rem',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(225, 48, 108, 0.25)'
              }}
            >
              <Instagram size={16} /> @sarenone.sosis
            </a>

            {/* TikTok Button */}
            <a 
              href="https://www.tiktok.com/@sarenone.official" 
              target="_blank" 
              rel="noreferrer"
              className="btn"
              style={{
                background: 'linear-gradient(135deg, #000000, #111111)',
                color: '#fff',
                borderRadius: 'var(--radius-md)',
                padding: '0.55rem 0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontSize: '0.82rem',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(37, 244, 238, 0.2)',
                border: '1px solid rgba(37, 244, 238, 0.4)'
              }}
            >
              <TikTokIcon size={16} /> @sarenone.official
            </a>

            {/* WhatsApp Button */}
            <a 
              href="https://wa.me/6287861764814?text=Hallo,%20ada%20yang%20ingin%20saya%20tanyakan" 
              target="_blank" 
              rel="noreferrer"
              className="btn"
              style={{
                background: 'linear-gradient(135deg, #25d366, #128c7e)',
                color: '#fff',
                borderRadius: 'var(--radius-md)',
                padding: '0.55rem 0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontSize: '0.82rem',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)'
              }}
            >
              <Phone size={16} /> Hubungi WhatsApp
            </a>


          </div>
        </div>

        <div style={{ marginTop: '0.85rem', textAlign: 'right' }}>
          <button className="btn btn-primary btn-sm" onClick={onClose} style={{ padding: '0.35rem 1.1rem' }}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
