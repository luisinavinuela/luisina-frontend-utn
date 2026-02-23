import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import '../styles/Home.css';
import { generatePopup } from '../utils/popup';
import { useNavigate } from "react-router-dom"
import { createProduct, deleteProduct, getProducts, updateProduct } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

const Home = () => {
  const [maxPriceFilter, setMaxPriceFilter] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
    category: ''
  })

  const { user, token } = useAuth()
  const navigate = useNavigate()

  const fetchingProducts = async () => {
    try {
      const filters = {
        maxPrice: maxPriceFilter,
        name: nameFilter,
        category: categoryFilter
      }; 
      const res = await getProducts(token, filters);
      const json = await res.json();
      setProducts(json.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleToggleForm = () => {
    setShowForm((prev) => !prev)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name } = formData

    if (!name) {
      alert("🚧 El nombre del producto debe ser obligatorio")
      return
    }

    if (!editingProduct) {
      const res = await createProduct(formData, token)
      const json = await res.json()

      if (!json.success) {
        alert(json.error)
      }

      fetchingProducts()
      setShowForm(false)
      await generatePopup({
        textTitle: "Producto agregado 🎉",
        textContent: `ID: ${json.data._id} ✅`,
        icon: "success",
        showCancelButton: false,
        btnConfirm: "OK",
      })
      setFormData({ name: '', price: '', stock: '', description: '', category: '' })
    } else {
      const res = await updateProduct(editingProduct, formData, token)
      const json = await res.json()

      fetchingProducts()
      setFormData({ name: '', price: '', stock: '', description: '', category: '' })
      setEditingProduct(null)
      setShowForm(false)
      await generatePopup({
        textTitle: "Producto actualizado 🎉",
        textContent: `ID: ${json.data._id} ✅`,
        icon: "success",
        showCancelButton: false,
        btnConfirm: "Cerrar",
      })
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleDelete = async (id) => {
    const validateDelete = await generatePopup({
      textTitle: "Borrar producto",
      textContent: "Está seguro que quieres borrar el producto",
      icon: "warning",
      showCancelButton: true,
      btnConfirm: "Borrar"
    })

    if (validateDelete.isConfirmed) {
      await deleteProduct(id, token)
      fetchingProducts()
    }
  }

  const handleEdit = (product) => {
    setShowForm(true)
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
      category: product.category
    })
    setEditingProduct(product)
  }

  useEffect(() => {
    if (token) {
      fetchingProducts()
    }
  }, [token])

  return (
    <div className="home-container" style={{ backgroundColor: '#fcfaf8', minHeight: '100vh' }}>
      <Header />

      <section className="home-banner" style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#f5f1ed' }}>
        <h2 style={{ color: '#4a5d4e', fontSize: '2.5rem', marginBottom: '10px' }}>Discover Our Exclusive Products</h2>
        <p style={{ color: '#8c7a6b', fontSize: '1.2rem' }}>High quality, affordable prices, and fast delivery.</p>
        <h3 style={{ color: '#a68966', marginTop: '20px' }}>Bienvenido, {user}</h3>
      </section>

      <main id="catalog" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <div className="catalog-header" style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginBottom: '40px' }}>
          <h1 style={{ color: '#2c2c2c', margin: 0 }}>Catálogo de Productos</h1>

          <div className="filter-bar" style={{ 
            display: 'flex', flexWrap: 'wrap', gap: '15px', backgroundColor: '#fff', 
            padding: '25px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e2ddd9' 
          }}>
            <input 
              type="text" placeholder="Buscar por nombre..." value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1cdc7', flex: '2', minWidth: '200px' }}
            />
            <input 
              type="text" placeholder="Categoría..." value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1cdc7', flex: '1', minWidth: '150px' }}
            />
            <input 
              type="number" placeholder="Precio máx..." value={maxPriceFilter}
              onChange={(e) => setMaxPriceFilter(e.target.value)}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1cdc7', width: '130px' }}
            />
            <button onClick={fetchingProducts} style={{ backgroundColor: '#4a5d4e', color: 'white', padding: '12px 25px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
              🔍 Filtrar
            </button>
            <button onClick={() => { setNameFilter(''); setCategoryFilter(''); setMaxPriceFilter(''); fetchingProducts(); }} style={{ backgroundColor: '#b07d62', color: 'white', padding: '12px 25px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
              🔄 Limpiar
            </button>
          </div>

          <button className="btn-add-product" onClick={handleToggleForm} style={{ alignSelf: 'flex-start', backgroundColor: '#4a5d4e', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
            + Agregar Nuevo Producto
          </button>
        </div>

        {showForm && (
          <div className="form-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
            <div className="product-form" style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', width: '90%', maxWidth: '500px' }}>
              <h2 style={{ color: '#4a5d4e', textAlign: 'center', marginBottom: '20px' }}>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Price</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                </div>
                <div className="form-actions" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  <button type="submit" style={{ flex: 1, backgroundColor: '#4a5d4e', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Save</button>
                  <button type="button" onClick={handleToggleForm} style={{ flex: 1, backgroundColor: '#eee', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="product-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
          {products.map((product, index) => (
            <div key={index} className="product-card" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2ddd9', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h2 style={{ fontSize: '1.25rem', margin: 0 }}>{product.name}</h2>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4a5d4e', margin: 0 }}>${product.price}</p>
              <p style={{ margin: 0, color: '#a68966', fontSize: '0.8rem', fontWeight: 'bold' }}>{product.category}</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={() => handleEdit(product)} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #4a5d4e', backgroundColor: 'transparent', cursor: 'pointer' }}>✏️ Edit</button>
                <button onClick={() => handleDelete(product._id)} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', backgroundColor: '#fdecea', color: '#d93025', cursor: 'pointer' }}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>

        <section style={{ padding: '80px 20px', textAlign: 'center', backgroundColor: '#f5f1ed', borderRadius: '20px', marginTop: '60px' }}>
          <h2 style={{ fontSize: '2.2rem', color: '#2c2c2c', marginBottom: '15px' }}>¿Listo para encontrar tu producto perfecto?</h2>
          <p style={{ color: '#666', marginBottom: '30px' }}>Únete a miles de clientes satisfechos y descubre la diferencia</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <button style={{ backgroundColor: '#4a5d4e', color: 'white', padding: '15px 30px', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer' }}>Explorar Catálogo</button>
            <button style={{ backgroundColor: 'white', color: '#4a5d4e', padding: '15px 30px', borderRadius: '8px', border: '2px solid #4a5d4e', fontWeight: '600', cursor: 'pointer' }}>Contáctanos</button>
          </div>
        </section>
      </main>

      <footer className="home-footer" style={{ marginTop: '50px', padding: '40px', textAlign: 'center', borderTop: '1px solid #e2ddd9', color: '#a68966' }}>
        <p>&copy; 2026 DecoStore. All rights reserved.</p>
      </footer>
    </div>
  );
};

export { Home };