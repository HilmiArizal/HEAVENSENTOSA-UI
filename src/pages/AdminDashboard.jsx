import React, { useState } from 'react';
import ProductFormModal from '../components/ProductFormModal';
import CategoryManagerModal from '../components/CategoryManagerModal';
import { Plus, Edit2, Trash2, Star, ShieldCheck, RefreshCw, Package, Tag } from 'lucide-react';

const API_BASE = 'https://heavensentosa-api-production.up.railway.app';

export default function AdminDashboard({ 
  products, 
  categories, 
  onRefresh, 
  onCreateProduct, 
  onUpdateProduct, 
  onDeleteProduct,
  onCreateCategory,
  onUpdateCategory,
  onDeleteCategory,
  isLoading 
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

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

  const handleCreateNew = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus sosis "${name}" dari katalog?`)) {
      onDeleteProduct(id);
    }
  };

  const handleToggleFeatured = (product) => {
    onUpdateProduct(product.id, {
      ...product,
      isFeatured: !product.isFeatured
    });
  };

  const handleFormSave = (formData) => {
    if (editingProduct) {
      onUpdateProduct(editingProduct.id, formData);
    } else {
      onCreateProduct(formData);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 4rem 1.5rem' }}>
      {/* Header Admin Banner */}
      <div className="glass-panel" style={{
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        marginBottom: '2rem',
        borderLeft: '4px solid #3b82f6',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
            <ShieldCheck size={18} /> Admin Management Console
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff' }}>
            Kelola Katalog Produk Heaven Sentosa
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Tambah varian baru, kelola kategori, perbarui harga, ubah detail, atau hapus produk dari tampilan publik secara real-time.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" onClick={() => setIsCategoryModalOpen(true)} style={{ borderColor: 'var(--accent-gold)', color: 'var(--accent-gold)' }}>
            <Tag size={18} /> Kelola Kategori ({categories.filter(c => c !== 'All').length})
          </button>
          <button className="btn btn-primary" onClick={handleCreateNew} style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}>
            <Plus size={18} /> Tambah Produk Baru
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Total Produk</span>
          <span style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff' }}>{products.length} Varian</span>
        </div>
        <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Produk Unggulan</span>
          <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-gold)' }}>
            {products.filter(p => p.isFeatured).length} Item
          </span>
        </div>
        <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Kategori Terdaftar</span>
          <span style={{ fontSize: '1.8rem', fontWeight: '800', color: '#60a5fa' }}>
            {categories.filter(c => c !== 'All').length} Kategori
          </span>
        </div>
      </div>

      {/* CRUD Product Table */}
      <div className="glass-panel" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Package size={20} color="#60a5fa" /> Daftar Produk dalam Katalog
          </h3>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <RefreshCw size={24} className="animate-spin" /> Memuat data...
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Belum ada produk. Klik "Tambah Produk Baru" untuk menambahkan sosis pertama Anda.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: 'rgba(0, 0, 0, 0.4)', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-glass)' }}>
                  <th style={{ padding: '1rem 1.5rem' }}>Produk</th>
                  <th style={{ padding: '1rem' }}>Kategori</th>
                  <th style={{ padding: '1rem' }}>Harga & Unit</th>
                  <th style={{ padding: '1rem' }}>Status Stok</th>
                  <th style={{ padding: '1rem' }}>Unggulan</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Aksi CRUD</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}>
                    {/* Item photo & name */}
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img 
                          src={getFullImageUrl(product.image)} 
                          alt={product.name} 
                          style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover', background: '#1e293b' }}
                        />
                        <div>
                          <div style={{ fontWeight: '700', color: '#fff' }}>{product.name}</div>
                          {product.badge && <span className="badge badge-gold" style={{ fontSize: '0.65rem', marginTop: '2px' }}>{product.badge}</span>}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td style={{ padding: '1rem' }}>
                      <span className="badge badge-red">{product.category}</span>
                    </td>

                    {/* Price & Unit */}
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: '700', color: 'var(--accent-gold)' }}>{formatPrice(product.price)}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{product.unit}</div>
                    </td>

                    {/* Stock Status */}
                    <td style={{ padding: '1rem' }}>
                      <span className={`badge ${product.stock === 'In Stock' ? 'badge-green' : 'badge-gold'}`}>
                        {product.stock || 'In Stock'}
                      </span>
                    </td>

                    {/* Featured toggle */}
                    <td style={{ padding: '1rem' }}>
                      <button 
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: product.isFeatured ? 'var(--accent-gold)' : 'var(--text-muted)'
                        }}
                        onClick={() => handleToggleFeatured(product)}
                        title="Klik untuk ubah status unggulan"
                      >
                        <Star size={18} fill={product.isFeatured ? 'var(--accent-gold)' : 'none'} />
                        <span style={{ fontSize: '0.8rem' }}>{product.isFeatured ? 'Ya' : 'Tidak'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleEdit(product)}
                          title="Edit Produk"
                        >
                          <Edit2 size={16} color="#60a5fa" /> Edit
                        </button>
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(product.id, product.name)}
                          title="Hapus Produk"
                        >
                          <Trash2 size={16} /> Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CRUD Product Form Modal */}
      {isFormOpen && (
        <ProductFormModal 
          product={editingProduct}
          categories={categories}
          onClose={() => setIsFormOpen(false)}
          onSave={handleFormSave}
        />
      )}

      {/* CRUD Category Manager Modal */}
      {isCategoryModalOpen && (
        <CategoryManagerModal 
          categories={categories}
          products={products}
          onClose={() => setIsCategoryModalOpen(false)}
          onCreateCategory={onCreateCategory}
          onUpdateCategory={onUpdateCategory}
          onDeleteCategory={onDeleteCategory}
        />
      )}
    </div>
  );
}
