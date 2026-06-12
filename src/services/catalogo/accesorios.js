import { obtenerProductosCatalogo, obtenerSubcategoriasCatalogo } from './catalogoApi'

// Wrapper específico para accesorios con el mismo patrón de consulta que el resto.
export function obtenerProductosAccesorios(slugSeccion, slugSubcategoria = '') {
  return obtenerProductosCatalogo({
    section: slugSeccion,
    subcategory: slugSubcategoria,
    limit: 200,
  })
}

// Obtiene las subcategorías de accesorios para filtros y menús.
export function obtenerSubcategoriasAccesorios(slugSeccion) {
  return obtenerSubcategoriasCatalogo({ section: slugSeccion })
}
