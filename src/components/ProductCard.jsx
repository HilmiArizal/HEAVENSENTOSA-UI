import React from 'react';
import { Flame, Eye, MessageCircle, Layers } from 'lucide-react';

const API_BASE = 'http://localhost:5005';

export default function ProductCard({ product, onSelect }) {
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  const getFullImageUrl = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80';
    if (url.startsWith('/uploads/')) {
      return `${API_BASE}${url}`;
    }
    return url;
  };

  const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
  const allPrices = [product.price, ...(hasVariants ? product.variants.map(v => v.price) : [])];
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);

  const handleWhatsAppOrder = (e) => {
    e.stopPropagation();
    const phone = "6287861764814";
    const text = encodeURIComponent(`Hallo, ada yang ingin saya tanyakan mengenai produk:\n*${product.name}*\nKemasan: ${product.unit}`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };



  return (
    <div 
      className="glass-panel animate-fade-in" 
      onClick={() => onSelect(product)}
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)';
        e.currentTarget.style.boxShadow = '0 14px 35px rgba(0,0,0,0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border-glass)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Product Image (Full Cover style for bold, rich card presentation) */}
      <div style={{ position: 'relative', height: '210px', overflow: 'hidden', backgroundColor: '#11131f' }}>
        <img 
          src={getFullImageUrl(product.image)} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />

        {/* Badge Overlay */}
        {product.badge && (
          <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
            <span className="badge badge-gold">{product.badge}</span>
          </div>
        )}

        {/* Variant Indicator Badge */}
        {hasVariants && (
          <div style={{ position: 'absolute', bottom: '10px', left: '12px' }}>
            <span className="badge" style={{ background: 'rgba(22, 18, 14, 0.88)', color: 'var(--accent-gold)', border: '1px solid var(--border-glass)', fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              <Layers size={12} /> {product.variants.length} Opsi Gramasi
            </span>
          </div>
        )}

        {/* Spicy Indicator */}
        {product.spicyLevel > 0 && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
            padding: '4px 8px',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}>
            {Array.from({ length: product.spicyLevel }).map((_, i) => (
              <Flame key={i} size={14} color="#f97316" fill="#f97316" />
            ))}
          </div>
        )}
      </div>

      {/* Product Content */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: '600' }}>
              {product.category}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {product.unit}
            </span>
          </div>

          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem', lineHeight: '1.3' }}>
            {product.name}
          </h3>

          <p style={{
            fontSize: '0.88rem',
            color: 'var(--text-muted)',
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {product.description}
          </p>
        </div>

        {/* Actions */}
        <div style={{ paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>
              Pilihan Gramasi
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--accent-gold)' }}>
              {hasVariants ? `${product.variants.length} Varian Kemasan` : product.unit}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className="btn btn-secondary btn-sm"
              title="Lihat Detail Produk"
              onClick={(e) => { e.stopPropagation(); onSelect(product); }}
            >
              <Eye size={16} /> Detail
            </button>
            <button 
              className="btn btn-primary btn-sm"
              title="Pesan via WhatsApp"
              onClick={handleWhatsAppOrder}
            >
              <MessageCircle size={16} /> Order
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
