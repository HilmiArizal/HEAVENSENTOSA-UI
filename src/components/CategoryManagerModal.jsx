import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2, Tag, Check, AlertCircle } from 'lucide-react';

export default function CategoryManagerModal({ categories, products, onClose, onCreateCategory, onUpdateCategory, onDeleteCategory }) {
  const [newCatName, setNewCatName] = useState('');
  const [editingCat, setEditingCat] = useState(null);
  const [editValue, setEditValue] = useState('');

  const availableCategories = categories.filter(c => c !== 'All');

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    if (categories.some(c => c.toLowerCase() === newCatName.trim().toLowerCase())) {
      alert('Kategori tersebut sudah ada!');
      return;
    }
    onCreateCategory(newCatName.trim());
    setNewCatName('');
  };

  const handleStartEdit = (cat) => {
    setEditingCat(cat);
    setEditValue(cat);
  };

  const handleSaveEdit = (oldCat) => {
    if (!editValue.trim() || editValue.trim() === oldCat) {
      setEditingCat(null);
      return;
    }
    if (categories.some(c => c.toLowerCase() === editValue.trim().toLowerCase() && c !== oldCat)) {
      alert('Nama kategori tersebut sudah digunakan!');
      return;
    }
    onUpdateCategory(oldCat, editValue.trim());
    setEditingCat(null);
  };

  const handleDelete = (catName) => {
    const productCount = products.filter(p => p.category === catName).length;
    let confirmMsg = `Hapus kategori "${catName}"?`;
    if (productCount > 0) {
      confirmMsg = `Kategori "${catName}" memiliki ${productCount} produk sosis terdaftar. Mengahapus kategori ini akan memindahkan produk tersebut ke kategori 'Sosis Bakar'. Lanjutkan?`;
    }

    if (window.confirm(confirmMsg)) {
      onDeleteCategory(catName);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
          <Tag color="var(--accent-gold)" size={24} />
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#fff' }}>
              Kelola Kategori Produk
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Tambah, ubah nama, atau hapus kategori sosis.
            </p>
          </div>
        </div>

        {/* Add New Category Form */}
        <form onSubmit={handleAddSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <input 
            type="text"
            className="form-input"
            placeholder="Tambah nama kategori baru..."
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            style={{ fontSize: '0.9rem' }}
          />
          <button type="submit" className="btn btn-primary" style={{ flexShrink: 0 }}>
            <Plus size={18} /> Tambah
          </button>
        </form>

        {/* Category List */}
        <div style={{ background: 'rgba(15, 18, 28, 0.6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)', overflow: 'hidden' }}>
          <div style={{ padding: '0.75rem 1rem', background: 'rgba(0,0,0,0.3)', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>
            Daftar Kategori Terdaftar ({availableCategories.length})
          </div>

          <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
            {availableCategories.length === 0 ? (
              <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Belum ada kategori kustom.
              </div>
            ) : (
              availableCategories.map((cat) => {
                const count = products.filter(p => p.category === cat).length;
                const isEditing = editingCat === cat;

                return (
                  <div 
                    key={cat}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      gap: '0.75rem'
                    }}
                  >
                    {isEditing ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexGrow: 1 }}>
                        <input 
                          type="text"
                          className="form-input"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          autoFocus
                          style={{ padding: '0.4rem 0.75rem', fontSize: '0.88rem' }}
                        />
                        <button className="btn btn-primary btn-sm" onClick={() => handleSaveEdit(cat)}>
                          <Check size={16} />
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setEditingCat(null)}>
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontWeight: '600', color: '#fff', fontSize: '0.95rem' }}>{cat}</span>
                          <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>
                            {count} Produk
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleStartEdit(cat)}
                            title="Ubah Nama Kategori"
                          >
                            <Edit2 size={14} color="#60a5fa" />
                          </button>
                          <button 
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(cat)}
                            title="Hapus Kategori"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}
