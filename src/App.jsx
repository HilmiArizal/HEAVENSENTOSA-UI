import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import UserCatalog from './pages/UserCatalog';
import AdminDashboard from './pages/AdminDashboard';
import AdminLoginModal from './components/AdminLoginModal';
import LegalitasModal from './components/LegalitasModal';
import TentangKamiModal from './components/TentangKamiModal';
import { Flame, Database, Server, AlertCircle } from 'lucide-react';

const API_BASE = 'http://localhost:5005/api';

const INITIAL_CATEGORIES = [];

const INITIAL_PRODUCTS = [];

export default function App() {
  const [activeRole, setActiveRole] = useState('user');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All', ...INITIAL_CATEGORIES]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState('Connecting to MongoDB...');
  const [notification, setNotification] = useState(null);

  // Modal States
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLegalitasOpen, setIsLegalitasOpen] = useState(false);
  const [isTentangOpen, setIsTentangOpen] = useState(false);


  // Toast notification
  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Fetch Products from Express Backend Connected to MongoDB
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      let url = `${API_BASE}/products`;
      const params = new URLSearchParams();
      if (activeCategory !== 'All') params.append('category', activeCategory);
      if (searchTerm) params.append('search', searchTerm);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      const json = await res.json();
      if (json.success) {
        setProducts(json.data);
        setDataSource(json.source === 'MongoDB' ? 'MongoDB Atlas Cloud' : 'JSON Server Local');
      }
    } catch (err) {
      console.warn('Backend Express API not reached. Using LocalStorage fallback:', err.message);
      loadLocalStorageFallback();
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Categories from Express Backend / MongoDB
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (!res.ok) return;
      const json = await res.json();
      if (json.success && json.data) {
        setCategories(json.data);
      }
    } catch (err) {}
  };

  // LocalStorage Fallback if backend offline
  const loadLocalStorageFallback = () => {
    setDataSource('LocalStorage (Backend Disconnected)');
    const saved = localStorage.getItem('sosis_heaven_products');
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      localStorage.setItem('sosis_heaven_products', JSON.stringify(INITIAL_PRODUCTS));
      setProducts(INITIAL_PRODUCTS);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [activeCategory, searchTerm]);

  // Product CRUD
  const handleCreateProduct = async (newProductData) => {
    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProductData)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          showToast('Produk sosis baru tersimpan ke MongoDB Cloud!');
          await fetchProducts();
          await fetchCategories();
          return;
        }
      }
    } catch (err) {
      console.error('Create product error:', err);
    }

    // Fallback Local
    const newProduct = { ...newProductData, id: Date.now().toString(), price: Number(newProductData.price) };
    const updated = [newProduct, ...products];
    setProducts(updated);
    localStorage.setItem('sosis_heaven_products', JSON.stringify(updated));
    showToast('Backend offline. Produk tersimpan di lokal.');
  };

  const handleUpdateProduct = async (id, updatedData) => {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          showToast('Data produk diperbarui di MongoDB Cloud!');
          await fetchProducts();
          await fetchCategories();
          return;
        }
      }
    } catch (err) {
      console.error('Update product error:', err);
    }

    // Fallback Local
    const updated = products.map(p => p.id === id ? { ...p, ...updatedData } : p);
    setProducts(updated);
    localStorage.setItem('sosis_heaven_products', JSON.stringify(updated));
    showToast('Data diperbarui di lokal.');
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          showToast('Produk sosis dihapus dari MongoDB Cloud!');
          await fetchProducts();
          await fetchCategories();
          return;
        }
      }
    } catch (err) {
      console.error('Delete product error:', err);
    }

    // Fallback Local
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('sosis_heaven_products', JSON.stringify(updated));
    showToast('Produk dihapus dari lokal.');
  };

  // Category CRUD
  const handleCreateCategory = async (newCatName) => {
    setCategories(prev => [...new Set([...prev, newCatName])]);

    try {
      const res = await fetch(`${API_BASE}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCatName })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          showToast(`Kategori "${newCatName}" tersimpan di MongoDB Cloud!`);
          await fetchCategories();
          await fetchProducts();
          return;
        }
      }
    } catch (err) {
      console.error('Category create error:', err);
    }
    showToast(`Kategori "${newCatName}" ditambahkan!`);
  };

  const handleUpdateCategory = async (oldCatName, newCatName) => {
    setCategories(prev => prev.map(c => c === oldCatName ? newCatName : c));
    setProducts(prev => prev.map(p => p.category === oldCatName ? { ...p, category: newCatName } : p));

    try {
      const res = await fetch(`${API_BASE}/categories/${encodeURIComponent(oldCatName)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newName: newCatName })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          showToast(`Kategori diubah menjadi "${newCatName}" di MongoDB Cloud!`);
          await fetchCategories();
          await fetchProducts();
          return;
        }
      }
    } catch (err) {
      console.error('Category update error:', err);
    }
    showToast(`Kategori "${oldCatName}" diubah menjadi "${newCatName}"!`);
  };

  const handleDeleteCategory = async (catToDelete) => {
    setCategories(prev => prev.filter(c => c !== catToDelete));
    setProducts(prev => prev.map(p => p.category === catToDelete ? { ...p, category: 'Sosis Bakar' } : p));

    try {
      const res = await fetch(`${API_BASE}/categories/${encodeURIComponent(catToDelete)}`, { method: 'DELETE' });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          showToast(`Kategori "${catToDelete}" dihapus dari MongoDB Cloud!`);
          await fetchCategories();
          await fetchProducts();
          return;
        }
      }
    } catch (err) {
      console.error('Category delete error:', err);
    }
    showToast(`Kategori "${catToDelete}" dihapus`);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toast Notification Alert */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          zIndex: 1000,
          background: notification.type === 'error' ? 'var(--accent-crimson)' : '#16a34a',
          color: '#fff',
          padding: '0.75rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          fontWeight: '600',
          fontSize: '0.9rem',
          animation: 'fadeIn 0.3s forwards'
        }}>
          {notification.message}
        </div>
      )}

      {/* Main Navbar */}
      <Navbar 
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onOpenLegalitas={() => setIsLegalitasOpen(true)}
        onOpenTentang={() => setIsTentangOpen(true)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={() => {
          setActiveRole('user');
          showToast('Anda telah keluar dari mode admin');
        }}
      />

      {/* Modals */}
      <AdminLoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => {
          setActiveRole('admin');
          showToast('Login berhasil! Selamat datang Admin');
        }}
      />

      <LegalitasModal 
        isOpen={isLegalitasOpen}
        onClose={() => setIsLegalitasOpen(false)}
      />

      <TentangKamiModal 
        isOpen={isTentangOpen}
        onClose={() => setIsTentangOpen(false)}
      />

      {/* Main Content Body */}

      <main style={{ flexGrow: 1 }}>
        {activeRole === 'user' ? (
          <UserCatalog 
            products={products}
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isLoading={isLoading}
          />
        ) : (
          <AdminDashboard 
            products={products}
            categories={categories}
            onRefresh={() => { fetchProducts(); fetchCategories(); }}
            onCreateProduct={handleCreateProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onCreateCategory={handleCreateCategory}
            onUpdateCategory={handleUpdateCategory}
            onDeleteCategory={handleDeleteCategory}
            isLoading={isLoading}
          />
        )}
      </main>

      {/* Footer Status Bar */}
      <footer style={{
        background: '#07080b',
        borderTop: '1px solid var(--border-glass)',
        padding: '2rem 0',
        marginTop: 'auto',
        fontSize: '0.9rem',
        color: 'var(--text-muted)'
      }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div>
            <span style={{ color: '#fff', fontWeight: '700' }}>Sosis Heaven Sentosa</span> &copy; 2026.
            <span style={{ marginLeft: '0.75rem', fontSize: '0.85rem', color: dataSource.includes('MongoDB') ? '#4ade80' : '#f87171', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Server size={15} /> Database: {dataSource}
            </span>
          </div>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => { fetchProducts(); fetchCategories(); }}
            style={{ fontSize: '0.78rem' }}
          >
            Refresh Database Link
          </button>
        </div>
      </footer>
    </div>
  );
}
