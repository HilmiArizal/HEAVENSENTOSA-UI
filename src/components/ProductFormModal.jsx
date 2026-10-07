import React, { useState, useEffect } from 'react';
import { X, Save, PlusCircle, Edit3, Upload, Image as ImageIcon, CheckCircle, Loader2, Plus, Trash2, Package } from 'lucide-react';

const API_BASE = 'https://heavensentosa-api-production.up.railway.app';

export default function ProductFormModal({ product, categories = [], onClose, onSave }) {
  // Available non-All category list
  const validCategories = categories.filter(c => c !== 'All');
  const defaultCategory = validCategories.length > 0 ? validCategories[0] : 'Sosis Premium';

  const [formData, setFormData] = useState({
    name: '',
    category: defaultCategory,
    price: '',
    unit: '500g',
    description: '',
    image: '',
    badge: '',
    isFeatured: false,
    stock: 'In Stock',
    spicyLevel: 0,
    meatContent: '85% Daging Sapi',
    variants: []
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [variantUploadingIndex, setVariantUploadingIndex] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || defaultCategory,
        price: product.price || '',
        unit: product.unit || '500g',
        description: product.description || '',
        image: product.image || '',
        badge: product.badge || '',
        isFeatured: Boolean(product.isFeatured),
        stock: product.stock || 'In Stock',
        spicyLevel: product.spicyLevel || 0,
        meatContent: product.meatContent || '85% Daging Sapi',
        variants: Array.isArray(product.variants) ? product.variants : []
      });
    } else {
      setFormData(prev => ({
        ...prev,
        category: defaultCategory
      }));
    }
  }, [product, categories]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const getFullImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('/uploads/')) {
      return `${API_BASE}${url}`;
    }
    return url;
  };

  // Upload main image
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Silakan pilih file gambar (JPG, PNG, WEBP, JPEG)');
      return;
    }

    setIsUploading(true);
    setUploadSuccess(false);

    try {
      const bodyData = new FormData();
      bodyData.append('image', file);

      const res = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        body: bodyData
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.imageUrl) {
          setFormData(prev => ({ ...prev, image: json.imageUrl }));
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 3000);
          return;
        }
      }
      
      const base64Data = await readFileAsBase64(file);
      setFormData(prev => ({ ...prev, image: base64Data }));
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);

    } catch (err) {
      console.warn('Backend upload server not responding. Falling back to Base64:', err);
      try {
        const base64Data = await readFileAsBase64(file);
        setFormData(prev => ({ ...prev, image: base64Data }));
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      } catch (readErr) {
        alert('Gagal membaca file gambar');
      }
    } finally {
      setIsUploading(false);
    }
  };

  // Upload variant specific image
  const handleVariantFileUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    setVariantUploadingIndex(index);

    try {
      const bodyData = new FormData();
      bodyData.append('image', file);

      const res = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        body: bodyData
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.imageUrl) {
          updateVariant(index, 'image', json.imageUrl);
          setVariantUploadingIndex(null);
          return;
        }
      }

      const base64Data = await readFileAsBase64(file);
      updateVariant(index, 'image', base64Data);

    } catch (err) {
      try {
        const base64Data = await readFileAsBase64(file);
        updateVariant(index, 'image', base64Data);
      } catch (rErr) {}
    } finally {
      setVariantUploadingIndex(null);
    }
  };

  // Variant helper functions
  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [
        ...prev.variants,
        { unit: '250g', price: 20000, image: '', stock: 'In Stock' }
      ]
    }));
  };

  const removeVariant = (index) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const updateVariant = (index, field, value) => {
    setFormData(prev => {
      const updatedVars = [...prev.variants];
      updatedVars[index] = {
        ...updatedVars[index],
        [field]: field === 'price' ? Number(value) : value
      };
      return { ...prev, variants: updatedVars };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Nama produk dan harga wajib diisi!');
      return;
    }

    const finalData = {
      ...formData,
      price: Number(formData.price),
      image: formData.image.trim() ? formData.image : 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
    };

    onSave(finalData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px' }}>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
          {product ? <Edit3 color="var(--accent-gold)" size={24} /> : <PlusCircle color="var(--accent-orange)" size={24} />}
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff' }}>
            {product ? 'Edit Produk Sosis' : 'Tambah Produk Sosis Baru'}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* FOTO UTAMA PRODUK (COVER DISPLAY) */}
          <div className="form-group" style={{ background: 'rgba(15, 18, 28, 0.7)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-glass)', marginBottom: '1.5rem' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--accent-gold)' }}>
              <ImageIcon size={18} color="var(--accent-gold)" /> Foto Utama Produk (Cover Tampilan Awal Katalog)
            </label>

            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                background: '#090a0f',
                border: '1px solid var(--border-glass)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {formData.image ? (
                  <img src={getFullImageUrl(formData.image)} alt="Preview Utama" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <ImageIcon size={32} color="var(--text-muted)" />
                )}
              </div>

              <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', alignItems: 'center' }}>
                  <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', border: 'none', color: '#fff' }}>
                    {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                    {isUploading ? 'Mengunggah...' : 'Upload Foto Utama'}
                    <input 
                      type="file" 
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                  </label>

                  {uploadSuccess && (
                    <span style={{ fontSize: '0.85rem', color: '#4ade80', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                      <CheckCircle size={16} /> Berhasil diunggah!
                    </span>
                  )}
                </div>

                <input 
                  type="text"
                  name="image"
                  className="form-input"
                  style={{ fontSize: '0.85rem' }}
                  placeholder="URL Foto utama (tampilan awal)"
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Nama Produk *</label>
              <input 
                type="text"
                name="name"
                className="form-input"
                placeholder="Contoh: SAREN ONE - Red Cocktail Sausage"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Kategori</label>
              <select 
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Harga Utama (Rp) *</label>
              <input 
                type="number"
                name="price"
                className="form-input"
                placeholder="40000"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Kemasan Utama</label>
              <input 
                type="text"
                name="unit"
                className="form-input"
                placeholder="500g"
                value={formData.unit}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Kandungan Daging</label>
              <input 
                type="text"
                name="meatContent"
                className="form-input"
                placeholder="85% Daging Sapi"
                value={formData.meatContent}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* DYNAMIC GRAMMAGE VARIANTS SECTION */}
          <div className="form-group" style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', color: 'var(--accent-gold)' }}>
                  <Package size={18} /> Opsi Varian Gramasi (500g, 250g, 100g, 1kg)
                </label>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Tambahkan opsi kemasan gramasi dengan foto & harga khusus masing-masing.
                </p>
              </div>

              <button type="button" className="btn btn-secondary btn-sm" onClick={addVariant} style={{ borderColor: 'var(--accent-gold)', color: 'var(--accent-gold)' }}>
                <Plus size={16} /> Tambah Varian Gramasi
              </button>
            </div>

            {formData.variants.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '1.25rem', color: 'var(--text-muted)', fontSize: '0.88rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-sm)' }}>
                Belum ada opsi gramasi tersimpan. Klik <strong>"+ Tambah Varian Gramasi"</strong> di atas jika ingin menambahkan opsi ukuran (500g, 250g, 900g) lengkap dengan foto masing-masing!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {formData.variants.map((v, idx) => (
                  <div key={idx} style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Package size={14} /> Varian Gramasi #{idx + 1} ({v.unit})
                      </span>
                      <button type="button" className="btn btn-danger btn-sm" onClick={() => removeVariant(idx)} title="Hapus Varian">
                        <Trash2 size={14} /> Hapus
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div>
                        <label className="form-label" style={{ fontSize: '0.8rem' }}>Gramasi / Ukuran Kemasan</label>
                        <input 
                          type="text"
                          className="form-input"
                          style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
                          placeholder="Contoh: 500g atau 250g"
                          value={v.unit}
                          onChange={(e) => updateVariant(idx, 'unit', e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="form-label" style={{ fontSize: '0.8rem' }}>Harga Varian (Rp)</label>
                        <input 
                          type="number"
                          className="form-input"
                          style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
                          placeholder="40000"
                          value={v.price}
                          onChange={(e) => updateVariant(idx, 'price', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Variant Specific Foto Upload */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '56px', height: '56px', borderRadius: '8px', overflow: 'hidden', background: '#111', flexShrink: 0, border: '1px solid var(--border-glass)' }}>
                        {v.image ? (
                          <img src={getFullImageUrl(v.image)} alt="Foto Varian" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <ImageIcon size={22} color="var(--text-muted)" style={{ margin: '16px auto', display: 'block' }} />
                        )}
                      </div>

                      <div style={{ flexGrow: 1, display: 'flex', gap: '0.5rem' }}>
                        <input 
                          type="text"
                          className="form-input"
                          style={{ fontSize: '0.8rem', padding: '0.45rem 0.65rem' }}
                          placeholder={`Upload foto khusus kemasan ${v.unit || ''}...`}
                          value={v.image || ''}
                          onChange={(e) => updateVariant(idx, 'image', e.target.value)}
                        />

                        <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', flexShrink: 0, background: 'linear-gradient(135deg, #3b82f6, #6366f1)', border: 'none', color: '#fff' }}>
                          {variantUploadingIndex === idx ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                          <input 
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => handleVariantFileUpload(e, idx)}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Label Badge</label>
              <input 
                type="text"
                name="badge"
                className="form-input"
                placeholder="Best Seller / Promo / Pedas"
                value={formData.badge}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Level Pedas (0 - 3)</label>
              <select 
                name="spicyLevel"
                className="form-select"
                value={formData.spicyLevel}
                onChange={handleChange}
              >
                <option value={0}>0 - Tidak Pedas</option>
                <option value={1}>1 - Pedas Sedang 🔥</option>
                <option value={2}>2 - Pedas 🔥🔥</option>
                <option value={3}>3 - Extra Pedas 🔥🔥🔥</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Status Stok</label>
              <select 
                name="stock"
                className="form-select"
                value={formData.stock}
                onChange={handleChange}
              >
                <option value="In Stock">Tersedia (In Stock)</option>
                <option value="Limited">Stok Terbatas</option>
                <option value="Out of Stock">Habis (Out of Stock)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Deskripsi Lengkap Produk</label>
            <textarea 
              name="description"
              className="form-textarea"
              rows={3}
              placeholder="Jelaskan keunikan rasa, cara memasak, dan keunggulan sosis..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input 
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <label htmlFor="isFeatured" style={{ color: '#fff', cursor: 'pointer', fontSize: '0.95rem' }}>
              Tampilkan sebagai Produk Unggulan (Featured Product)
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary" disabled={isUploading}>
              <Save size={18} /> Simpan Produk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
