import React, { useState } from 'react';
import { ShieldCheck, LogIn, Award, Info, Package, LogOut, Menu, X } from 'lucide-react';

export default function Navbar({ 
  activeRole, 
  setActiveRole, 
  onOpenLegalitas,
  onOpenTentang,
  onOpenLogin,
  onLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToCatalog = () => {
    if (activeRole !== 'user') {
      setActiveRole('user');
    }
    setTimeout(() => {
      const el = document.getElementById('catalog-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <nav className="glass-nav">
      <div className="container nav-header-container">
        
        {/* Brand & Logo Header */}
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} 
          onClick={() => { setActiveRole('user'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <img 
            src="/logo-hs.png" 
            alt="Heaven Sentosa Logo" 
            className="nav-logo-img"
          />
          <div>
            <h1 className="nav-brand-title">
              CV. HEAVEN SENTOSA
            </h1>
            <div className="nav-brand-subtitle">
              PRODUCT CATALOG
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="desktop-nav-links">
          <button
            className="nav-link-btn"
            onClick={scrollToCatalog}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-gold)'; e.currentTarget.style.background = 'rgba(245, 158, 11, 0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-main)'; e.currentTarget.style.background = 'transparent'; }}
          >
            <Package size={16} style={{ color: 'var(--accent-gold)' }} /> 
            <span>Produk Kami</span>
          </button>

          <button
            className="nav-link-btn"
            onClick={onOpenLegalitas}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#4ade80'; e.currentTarget.style.background = 'rgba(74, 222, 128, 0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-main)'; e.currentTarget.style.background = 'transparent'; }}
          >
            <Award size={16} style={{ color: '#4ade80' }} /> 
            <span>Legalitas Kami</span>
          </button>

          <button
            className="nav-link-btn"
            onClick={onOpenTentang}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#60a5fa'; e.currentTarget.style.background = 'rgba(96, 165, 250, 0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-main)'; e.currentTarget.style.background = 'transparent'; }}
          >
            <Info size={16} style={{ color: '#60a5fa' }} /> 
            <span>Tentang Kami</span>
          </button>

          {/* Admin Action Button */}
          {activeRole === 'admin' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '4px 10px', borderRadius: '50px', border: '1px solid rgba(59, 130, 246, 0.3)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} /> Admin
              </span>
              <button
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: '50px', padding: '0.4rem 0.8rem' }}
                onClick={onLogout}
              >
                <LogOut size={14} /> Keluar
              </button>
            </div>
          ) : (
            <button
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: '50px', padding: '0.45rem 1rem', fontSize: '0.82rem' }}
              onClick={onOpenLogin}
            >
              <LogIn size={14} /> Login
            </button>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button 
          className="mobile-hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Drawer Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer animate-fade-in">
          <button
            className="mobile-drawer-btn"
            onClick={() => { setMobileMenuOpen(false); scrollToCatalog(); }}
          >
            <Package size={18} style={{ color: 'var(--accent-gold)' }} /> 
            <span>Produk Kami</span>
          </button>

          <button
            className="mobile-drawer-btn"
            onClick={() => { setMobileMenuOpen(false); onOpenLegalitas(); }}
          >
            <Award size={18} style={{ color: '#4ade80' }} /> 
            <span>Legalitas Kami</span>
          </button>

          <button
            className="mobile-drawer-btn"
            onClick={() => { setMobileMenuOpen(false); onOpenTentang(); }}
          >
            <Info size={18} style={{ color: '#60a5fa' }} /> 
            <span>Tentang Kami</span>
          </button>

          <div style={{ paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '0.25rem' }}>
            {activeRole === 'admin' ? (
              <button
                className="btn btn-danger btn-sm"
                style={{ width: '100%', justifyContent: 'center', borderRadius: 'var(--radius-sm)' }}
                onClick={() => { setMobileMenuOpen(false); onLogout(); }}
              >
                <LogOut size={16} /> Keluar Mode Admin
              </button>
            ) : (
              <button
                className="btn btn-primary btn-sm"
                style={{ width: '100%', justifyContent: 'center', borderRadius: 'var(--radius-sm)' }}
                onClick={() => { setMobileMenuOpen(false); onOpenLogin(); }}
              >
                <LogIn size={16} /> Login Admin
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
