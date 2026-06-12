import { useContext, useEffect, useState } from 'react'
import Header from '../../../components/Header/Header.jsx'
import Footer from '../../../components/Footer/Footer.jsx'
import { AuthContext } from '../../../context/AuthContext.jsx'
import { obtenerProductosCatalogo, obtenerSeccionesCatalogo, obtenerSubcategoriasCatalogo } from '../../../services/catalogo/catalogoApi.js'
import { actualizarProductoAdmin, crearProductoAdmin, eliminarProductoAdmin, obtenerProductosAdmin } from '../../../services/admin/adminProductsApi.js'
import './ProductsAdmin.css'

const emptyForm = {
  id: '',
  section_id: '',
  subcategory_id: '',
  legacy_id: '',
  name: '',
  slug: '',
  image_path: '',
  image_file: null,
  price: '',
  in_stock: true,
  stock: 0,
  active: true,
  source_file: '',
}

function ProductsAdmin() {
  const { token, user, isAuthenticated } = useContext(AuthContext)
  const [sections, setSections] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [products, setProducts] = useState([])
  const [formData, setFormData] = useState(emptyForm)
  const [errorMessage, setErrorMessage] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const isAdmin = user?.role === 'admin'

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.assign('/login')
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (!isAdmin) {
      return
    }

    Promise.all([
      obtenerSeccionesCatalogo(),
      obtenerProductosAdmin(token),
    ])
      .then(([sectionsResponse, productsResponse]) => {
        setSections(sectionsResponse)
        setProducts(productsResponse.data || [])

      })
      .catch((error) => {
        setErrorMessage(error instanceof Error ? error.message : 'No se han podido cargar los datos de administración.')
      })
  }, [isAdmin, token])

  useEffect(() => {
    if (!formData.section_id) {
      setSubcategories([])
      return
    }

    obtenerSubcategoriasCatalogo({ section: sections.find((section) => String(section.id) === String(formData.section_id))?.slug })
      .then(setSubcategories)
      .catch(() => setSubcategories([]))
  }, [formData.section_id, sections])

  const handleSelectProduct = (product) => {
    setFormData({
      id: product.id,
      section_id: product.section_id,
      subcategory_id: product.subcategory_id ?? '',
      legacy_id: product.legacy_id,
      name: product.name,
      slug: product.slug ?? '',
      image_path: product.image_path ?? '',
      image_file: null,
      price: product.price,
      in_stock: Boolean(product.in_stock),
      stock: product.stock ?? 0,
      active: Boolean(product.active),
      source_file: product.source_file ?? '',
    })
  }

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target
    const nextValue = type === 'checkbox' ? checked : (type === 'file' ? files?.[0] ?? null : value)

    setFormData((previous) => ({
      ...previous,
      [name]: nextValue,
    }))
  }

  const refreshProducts = async () => {
    const response = await obtenerProductosAdmin(token)
    setProducts(response.data || [])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setStatusMessage('')
    setIsSaving(true)

    try {
      const isEditing = Boolean(formData.id)
      const payload = new FormData()

      payload.append('id', String(formData.id))
      payload.append('section_id', String(Number(formData.section_id)))
      payload.append('subcategory_id', formData.subcategory_id ? String(Number(formData.subcategory_id)) : '')
      payload.append('legacy_id', String(Number(formData.legacy_id)))
      payload.append('name', String(formData.name))
      payload.append('slug', String(formData.slug ?? ''))
      payload.append('price', String(Number(formData.price)))
      payload.append('stock', String(Number(formData.stock)))
      payload.append('in_stock', formData.in_stock ? '1' : '0')
      payload.append('active', formData.active ? '1' : '0')
      payload.append('source_file', String(formData.source_file ?? ''))
      payload.append('image_path', String(formData.image_path ?? ''))

      if (formData.image_file) {
        payload.append('image_file', formData.image_file)
      }

      if (isEditing) {
        await actualizarProductoAdmin(token, payload)
        setStatusMessage('Producto actualizado correctamente.')
      } else {
        await crearProductoAdmin(token, payload)
        setStatusMessage('Producto creado correctamente.')
      }

      setFormData(emptyForm)
      await refreshProducts()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'No se ha podido guardar el producto.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (productId) => {
    if (!window.confirm('¿Seguro que quieres eliminar este producto?')) {
      return
    }

    setErrorMessage('')
    setStatusMessage('')

    try {
      await eliminarProductoAdmin(token, productId)
      await refreshProducts()
      setStatusMessage('Producto eliminado correctamente.')
      if (Number(formData.id) === Number(productId)) {
        setFormData(emptyForm)
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'No se ha podido eliminar el producto.')
    }
  }

  if (!isAdmin) {
    return null
  }

  return (
    <>
      <Header />
      <main className="admin-products-page">
        <section className="admin-products-page__hero">
          <div>
            <p className="admin-products-page__eyebrow">Panel de administración</p>
            <h1>Gestionar artículos</h1>
            <p>Crear, editar y eliminar productos del catálogo desde una única pantalla.</p>
          </div>
        </section>

        <section className="admin-products-page__content">
          <form className="admin-products-form" onSubmit={handleSubmit}>
            <div className="admin-products-form__grid">
              <label>
                Sección
                <select name="section_id" value={formData.section_id} onChange={handleChange} required>
                  <option value="">Selecciona una sección</option>
                  {sections.map((section) => (
                    <option key={section.id} value={section.id}>{section.name}</option>
                  ))}
                </select>
              </label>
              <label>
                Subcategoría
                <select name="subcategory_id" value={formData.subcategory_id} onChange={handleChange}>
                  <option value="">Sin subcategoría</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                  ))}
                </select>
              </label>
              <label>
                Nombre
                <input name="name" type="text" value={formData.name} onChange={handleChange} required />
              </label>
              <label>
                Imagen
                <input name="image_file" type="file" accept="image/*" onChange={handleChange} />
              </label>
              <label>
                Precio
                <input name="price" type="number" min="0" step="0.01" value={formData.price} onChange={handleChange} required />
              </label>
              <label>
                Stock
                <input name="stock" type="number" min="0" value={formData.stock} onChange={handleChange} />
              </label>
            </div>

            {errorMessage && <p className="admin-products-form__error">{errorMessage}</p>}
            {statusMessage && <p className="admin-products-form__success">{statusMessage}</p>}

            <div className="admin-products-form__actions">
              <button type="submit" disabled={isSaving}>
                {isSaving ? 'Guardando...' : (formData.id ? 'Actualizar producto' : 'Crear producto')}
              </button>
              <button type="button" onClick={() => setFormData(emptyForm)}>
                Limpiar formulario
              </button>
            </div>
          </form>

          <section className="admin-products-list">
            <h2>Productos existentes</h2>
            <div className="admin-products-list__items">
              {products.map((product) => (
                <article key={product.id} className="admin-products-list__item">
                  <div>
                    <strong>{product.name}</strong>
                    <p>{product.section_name}{product.subcategory_name ? ` · ${product.subcategory_name}` : ''}</p>
                    <small>ID {product.id} · Legacy {product.legacy_id} · {product.price} {product.currency}</small>
                  </div>
                  <div className="admin-products-list__buttons">
                    <button type="button" onClick={() => handleSelectProduct(product)}>Editar</button>
                    <button type="button" onClick={() => handleDelete(product.id)}>Eliminar</button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default ProductsAdmin