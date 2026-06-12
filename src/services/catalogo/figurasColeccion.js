import { obtenerProductosCatalogo, obtenerSubcategoriasCatalogo } from './catalogoApi'

// Wrapper específico para la sección de figuras de colección.
export function obtenerProductosFigurasColeccion(slugSeccion, slugSubcategoria = '') {
  return obtenerProductosCatalogo({
    section: slugSeccion,
    subcategory: slugSubcategoria,
    limit: 200,
  })
}

// Carga las subcategorías visibles dentro de figuras de colección.
export function obtenerSubcategoriasFigurasColeccion(slugSeccion) {
  return obtenerSubcategoriasCatalogo({ section: slugSeccion })
}
