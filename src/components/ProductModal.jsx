import React, { useState, useEffect } from 'react';
import { X, Flame, MessageCircle, Check, Package, Image as ImageIcon } from 'lucide-react';

const API_BASE = 'https://heavensentosa-api-production.up.railway.app';

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
  
  // Default variant uses main product image and main price/unit
  const defaultOption = {
    unit: product.unit || '500g',
    price: product.price,
    image: product.image,
    stock: product.stock || 'In Stock',
    isDefault: true
  };

  const [selectedVariant, setSelectedVariant] = useState(defaultOption);

  useEffect(() => {
    if (product) {
      setSelectedVariant({
        unit: product.unit || '500g',
        price: product.price,
        image: product.image,
        stock: product.stock || 'In Stock',
        isDefault: true
      });
    }
  }, [product]);

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

  const handleWhatsAppOrder = () => {
    const phone = "6287861764814";
    const text = encodeURIComponent(`Hallo, ada yang ingin saya tanyakan mengenai produk:\n*${product.name}*\nVarian Kemasan: *${selectedVariant.unit}*`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };



  // Build selectable options: Main option + any additional variants
  const selectableOptions = hasVariants ? product.variants : [defaultOption];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px' }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#fff',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
          {/* Main Image preview (using objectFit: contain so photo is NEVER cropped!) */}
          <div style={{ 
            borderRadius: 'var(--radius-md)', 
            overflow: 'hidden', 
            height: '100%', 
            minHeight: '320px', 
            background: '#ffffff', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px',
            position: 'relative',
            border: '1px solid var(--border-glass)'
          }}>
            <img 
              key={selectedVariant.image || selectedVariant.unit}
              src={getFullImageUrl(selectedVariant.image || product.image)} 
              alt={product.name}
              style={{ maxWidth: '100%', maxHeight: '340px', objectFit: 'contain', transition: 'all 0.3s ease' }} 
            />
            
            {/* Active Variant Badge on Image */}
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              background: 'rgba(22, 18, 14, 0.88)',
              backdropFilter: 'blur(8px)',
              padding: '4px 14px',
              borderRadius: '50px',
              border: '1px solid var(--border-glass)',
              color: 'var(--accent-gold)',
              fontSize: '0.82rem',
              fontWeight: '700'
            }}>
              Kemasan: {selectedVariant.unit}
            </div>
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="badge badge-gold">{product.category}</span>
                {product.badge && <span className="badge badge-red">{product.badge}</span>}
              </div>

              <h2 style={{ fontSize: '1.55rem', fontWeight: '800', color: '#fff', marginBottom: '0.5rem', lineHeight: '1.25' }}>
                {product.name}
              </h2>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.2rem', lineHeight: '1.5' }}>
                {product.description}
              </p>

              {/* Variant Grammage Selector Pills */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#e2d7cb', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Package size={16} color="var(--accent-gold)" /> Pilih Opsi Gramasi Kemasan:
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {selectableOptions.map((variant, idx) => {
                    const isSelected = selectedVariant.unit === variant.unit;
                    return (
                      <button
                        key={idx}
                        className="btn btn-sm"
                        style={{
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.55rem 1.1rem',
                          background: isSelected ? 'linear-gradient(135deg, var(--accent-amber), var(--accent-warm-orange))' : 'rgba(255,255,255,0.06)',
                          color: isSelected ? '#16120e' : '#fff',
                          fontWeight: isSelected ? '800' : '600',
                          border: isSelected ? 'none' : '1px solid var(--border-glass)',
                          boxShadow: isSelected ? '0 4px 15px rgba(245, 158, 11, 0.35)' : 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                        onClick={() => setSelectedVariant(variant)}
                      >
                        {isSelected && <Check size={14} />}
                        <span>{variant.unit}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Spec sheet */}
              <div style={{
                background: 'rgba(15, 18, 28, 0.6)',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-glass)',
                marginBottom: '1.25rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.4rem', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.88rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Kemasan Terpilih:</span>
                  <span style={{ fontWeight: '700', color: 'var(--accent-gold)' }}>{selectedVariant.unit}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.4rem', fontSize: '0.88rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Status Stok:</span>
                  <span style={{ fontWeight: '700', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Check size={14} /> {selectedVariant.stock || product.stock || 'Tersedia'}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div>
              <button 
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.9rem' }}
                onClick={handleWhatsAppOrder}
              >
                <MessageCircle size={20} /> Pesan Kemasan {selectedVariant.unit} via WhatsApp
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
