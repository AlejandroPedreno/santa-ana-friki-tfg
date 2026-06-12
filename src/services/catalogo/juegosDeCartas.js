import { obtenerProductosCatalogo, obtenerSubcategoriasCatalogo } from './catalogoApi'

// Wrapper específico de la sección de juegos de cartas para no repetir filtros en cada página.
export function obtenerProductosJuegosDeCartas(slugSeccion, slugSubcategoria = '') {
  return obtenerProductosCatalogo({
    section: slugSeccion,
    subcategory: slugSubcategoria,
    limit: 200,
  })
}

// Devuelve las subcategorías visibles en las páginas de cartas.
export function obtenerSubcategoriasJuegosDeCartas(slugSeccion) {
  return obtenerSubcategoriasCatalogo({ section: slugSeccion })
}
