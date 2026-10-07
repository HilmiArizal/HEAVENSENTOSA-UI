import React from 'react';
import { Flame, Star, Sparkles, Award, Instagram } from 'lucide-react';

export default function Hero() {
  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      padding: '4.5rem 0 4rem 0',
      backgroundImage: `linear-gradient(to bottom, rgba(16, 12, 9, 0.78), rgba(22, 18, 14, 0.88)), url('/hero-bg.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderBottom: '1px solid rgba(245, 158, 11, 0.15)'
    }}>



      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.45rem 1.25rem',
          borderRadius: '50px',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(234, 88, 12, 0.15))',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          color: 'var(--accent-gold)',
          fontSize: '0.88rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          boxShadow: '0 4px 15px rgba(245, 158, 11, 0.15)'
        }}>
          <Sparkles size={16} /> 100% Sosis Olahan Praktis & Kualitas Premium
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.3rem, 5.5vw, 4rem)',
          fontWeight: '700',
          lineHeight: '1.2',
          marginBottom: '1.2rem',
          color: '#ffffff'
        }}>
          Kelezatan Sosis Premium <br/>
          <span style={{
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #f97316)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            SAREN ONE • EAT GOW • BEULEUM
          </span>
        </h2>

        <p style={{
          maxWidth: '700px',
          margin: '0 auto 2rem auto',
          color: 'var(--text-muted)',
          fontSize: '1.1rem',
          fontWeight: '400',
          lineHeight: '1.7'
        }}>
          Nikmati renyahnya selongsong collagen alami, tekstur daging sapi juicy melimpah, dan bumbu rempah pilihan otentik khas Saren One.
        </p>

        {/* Social Media Buttons Pill Links */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '2rem'
        }}>
          {/* Instagram Button */}
          <a
            href="https://instagram.com/sarenone.sosis"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'linear-gradient(135deg, #e1306c, #fd1d1d, #f56040)',
              color: '#ffffff',
              padding: '0.65rem 1.4rem',
              borderRadius: '50px',
              fontWeight: '800',
              fontSize: '0.9rem',
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(225, 48, 108, 0.35)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Instagram size={18} /> @sarenone.sosis
          </a>

          {/* TikTok Button */}
          <a
            href="https://www.tiktok.com/@sarenone.official"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'linear-gradient(135deg, #000000, #111111)',
              color: '#ffffff',
              padding: '0.65rem 1.4rem',
              borderRadius: '50px',
              fontWeight: '800',
              fontSize: '0.9rem',
              textDecoration: 'none',
              border: '1px solid rgba(37, 244, 238, 0.5)',
              boxShadow: '0 6px 20px rgba(37, 244, 238, 0.25)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.83V7.63a6.34 6.34 0 0 0-3.5 1 6.34 6.34 0 1 0 10.84 4.54V9.05a8.28 8.28 0 0 0 4.77 1.48V7.08a4.84 4.84 0 0 1-2-0.39z"/>
            </svg>
            @sarenone.official
          </a>
        </div>


        {/* Feature Highlights Pill Badges */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.75rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#e2d7cb', fontSize: '0.92rem', fontWeight: '600' }}>
            <Award size={18} color="var(--accent-gold)" /> Kualitas Terjamin & Halal
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#e2d7cb', fontSize: '0.92rem', fontWeight: '600' }}>
            <Flame size={18} color="var(--accent-amber)" /> Siap Bakar & Goreng
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#e2d7cb', fontSize: '0.92rem', fontWeight: '600' }}>
            <Star size={18} color="var(--accent-gold)" /> Recomended Saren One
          </div>
        </div>
      </div>
    </div>
  );
}
