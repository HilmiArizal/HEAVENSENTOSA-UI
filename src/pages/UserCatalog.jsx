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
