import React from 'react';
import { Award, Building2, ShieldCheck, CheckCircle2, BadgeCheck } from 'lucide-react';

export default function LegalitasModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '640px', width: '94%', padding: '1.25rem 1.5rem', maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Header Compact */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(245, 158, 11, 0.15)',
              color: 'var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#fff', margin: 0, lineHeight: 1.2 }}>
                Legalitas & Sertifikasi
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                CV. HEAVEN SENTOSA - Jaminan Kualitas & Keamanan Pangan
              </p>
            </div>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={onClose} style={{ borderRadius: '50px', padding: '0.2rem 0.6rem', fontSize: '0.8rem' }}>✕</button>
        </div>

        {/* 2x2 Grid compact list to fit perfectly in 1 screen height */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
          
          {/* Card 1: BPOM */}
          <div className="glass-panel" style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <div style={{ background: '#16a34a20', color: '#4ade80', padding: '7px', borderRadius: '8px', flexShrink: 0 }}>
              <Award size={18} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.92rem', fontWeight: '700', marginBottom: '2px' }}>
                Izin Edar BPOM RI MD
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '5px', lineHeight: '1.35' }}>
                Memenuhi standar higienitas & kesehatan higienis sertifikasi BPOM RI MD.
              </p>
              <span style={{ fontSize: '0.7rem', background: 'rgba(74, 222, 128, 0.15)', color: '#4ade80', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(74, 222, 128, 0.3)', fontWeight: '600' }}>
                Terverifikasi Resmi BPOM
              </span>
            </div>
          </div>

          {/* Card 2: HALAL MUI */}
          <div className="glass-panel" style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <div style={{ background: '#f59e0b20', color: '#fbbf24', padding: '7px', borderRadius: '8px', flexShrink: 0 }}>
              <CheckCircle2 size={18} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.92rem', fontWeight: '700', marginBottom: '2px' }}>
                Sertifikat HALAL MUI
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '5px', lineHeight: '1.35' }}>
                100% bahan halal pilihan dengan selongsong collagen halal resmi.
              </p>
              <span style={{ fontSize: '0.7rem', background: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(251, 191, 36, 0.3)', fontWeight: '600' }}>
                Sertifikat Halal Aktif
              </span>
            </div>
          </div>

          {/* Card 3: NKV (Nomor Kontrol Veteriner) */}
          <div className="glass-panel" style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <div style={{ background: '#a855f720', color: '#c084fc', padding: '7px', borderRadius: '8px', flexShrink: 0 }}>
              <BadgeCheck size={18} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.92rem', fontWeight: '700', marginBottom: '2px' }}>
                Sertifikat NKV
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '5px', lineHeight: '1.35' }}>
                Memiliki Nomor Kontrol Veteriner jaminan kelayakan higienis pengolahan daging.
              </p>
              <span style={{ fontSize: '0.7rem', background: 'rgba(192, 132, 252, 0.15)', color: '#c084fc', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(192, 132, 252, 0.3)', fontWeight: '600' }}>
                Sertifikasi NKV Resmi
              </span>
            </div>
          </div>

          {/* Card 4: Legalitas CV / NIB */}
          <div className="glass-panel" style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <div style={{ background: '#3b82f620', color: '#60a5fa', padding: '7px', borderRadius: '8px', flexShrink: 0 }}>
              <Building2 size={18} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.92rem', fontWeight: '700', marginBottom: '2px' }}>
                Legalitas Badan Usaha CV
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '5px', lineHeight: '1.35' }}>
                Terdaftar sebagai <b>CV. HEAVEN SENTOSA</b> lengkap NIB & SIUP resmi.
              </p>
              <span style={{ fontSize: '0.7rem', background: 'rgba(96, 165, 250, 0.15)', color: '#60a5fa', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(96, 165, 250, 0.3)', fontWeight: '600' }}>
                Badan Hukum Terdaftar
              </span>
            </div>
          </div>

        </div>

        <div style={{ marginTop: '1rem', textAlign: 'right' }}>
          <button className="btn btn-primary btn-sm" onClick={onClose} style={{ padding: '0.4rem 1.2rem' }}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
