import React, { useState } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { Search, Filter, Sparkles, CheckCircle2 } from 'lucide-react';

export default function UserCatalog({ products, categories, activeCategory, setActiveCategory, searchTerm, setSearchTerm, isLoading }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div>
      <Hero />

      <div id="catalog-section" className="container" style={{ paddingBottom: '4rem' }}>

        {/* Search & Category Filtering Controls */}
        <div className="glass-panel" style={{
          padding: '1.25rem 1.5rem',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Category Filter Pills (1 Baris Scrollable) */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            maxWidth: '100%',
            paddingBottom: '4px',
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none'  /* IE 10+ */
          }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', marginRight: '0.25rem', display: 'inline-flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
              <Filter size={14} /> Kategori:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`btn btn-sm ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  borderRadius: '50px',
                  fontSize: '0.85rem',
                  padding: '0.4rem 1rem',
                  flexShrink: 0
                }}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>


          {/* Instant Search Bar */}
          <div style={{ position: 'relative', flexGrow: 1, maxWidth: '320px', minWidth: '220px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.5rem', borderRadius: '50px', fontSize: '0.9rem' }}
              placeholder="Cari sosis bakar, keju, bratwurst..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff' }}>
              Katalog Varian Sosis ({products.length})
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Menampilkan {activeCategory === 'All' ? 'semua varian' : `kategori ${activeCategory}`}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌭</div>
            <p>Memuat produk Sosis Heaven Sentosa...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem', borderRadius: 'var(--radius-lg)' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Tidak ada produk yang sesuai dengan kriteria pencarian "{searchTerm}".
            </p>
            <button className="btn btn-secondary" onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}>
              Reset Filter
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}>
            {products.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                onSelect={(prod) => setSelectedProduct(prod)}
              />
            ))}
          </div>
        )}

        {/* Konsumen Kami / Our Clients & Partners Showcase Section */}
        <div id="konsumen-section" style={{ marginTop: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{
              background: 'rgba(234, 88, 12, 0.15)',
              color: '#f97316',
              padding: '0.35rem 1rem',
              borderRadius: '50px',
              fontSize: '0.85rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Sparkles size={14} /> Kepercayaan Mitra Bisnis
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
              Konsumen & Mitra Kami
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto' }}>
              Produk sosis premium CV. Heaven Sentosa (SAREN ONE) telah dipercaya oleh berbagai outlet ritel, wisata ternama, hotel, restoran, dan cafe.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1.25rem'
          }}>
            {[
              { name: 'Rajawali Sosis & Baso', type: 'Distributor & Store' },
              { name: 'Rumah Beku', type: 'Frozen Food Market' },
              { name: 'Tasik Sosis & Baso', type: 'Distributor Sosis' },
              { name: 'Keysha Frozen Mart', type: 'Modern Frozen Retail' },
              { name: 'Mine Sosis', type: 'Frozen Food Market' },
              { name: 'Borma', type: 'Supermarket Ritel' },
              { name: 'Hotel Savoy Homan', type: 'Hotel' },
              { name: 'Orchid Forest', type: 'Destinasi Wisata & Resto' },
              { name: 'Astro Highland', type: 'Wisata & Kuliner' },
              { name: 'Grafika Cikole', type: 'Wisata & Outbound' },
              { name: 'Greenforest', type: 'Resort & Restaurant' },
              { name: 'The Lodge Maribaya', type: 'Destinasi Wisata Premiere' },
              { name: 'D\'castello', type: 'Wisata & Kuliner' },
              { name: 'Hutanika Cafe & Resto', type: 'Modern Cafe & Resto' },
              { name: 'Siloka Cafe & Resto', type: 'Modern Cafe & Resto' },
              { name: 'Dan Masih Banyak Lagi...', type: 'Hotel, Resto, Cafe & Ritel', isMore: true },
            ].map((client, idx) => (
              <div 
                key={idx} 
                className="glass-panel"
                style={{
                  padding: '1.25rem 1.5rem',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  border: client.isMore ? '1px dashed rgba(249, 115, 22, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                  background: client.isMore 
                    ? 'linear-gradient(135deg, rgba(234, 88, 12, 0.15) 0%, rgba(180, 83, 9, 0.1) 100%)' 
                    : 'linear-gradient(135deg, rgba(30,25,20,0.6) 0%, rgba(15,12,10,0.8) 100%)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
              >
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: client.isMore 
                    ? 'linear-gradient(135deg, #f97316 0%, #b45309 100%)' 
                    : 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: '800',
                  fontSize: client.isMore ? '1.3rem' : '1.1rem',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(234, 88, 12, 0.3)'
                }}>
                  {client.isMore ? '+' : client.name.charAt(0)}
                </div>
                <div>
                  <h4 style={{ color: client.isMore ? '#f97316' : '#fff', fontSize: '0.95rem', fontWeight: '700', marginBottom: '2px', lineHeight: '1.2' }}>
                    {client.name}
                  </h4>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={12} style={{ color: '#10b981' }} /> {client.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Detail View */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
