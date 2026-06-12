import { obtenerProductosCatalogo, obtenerSubcategoriasCatalogo } from './catalogoApi'

// Wrapper específico de maquetas para mantener iguales las páginas de catálogo.
export function obtenerProductosMaquetas(slugSeccion, slugSubcategoria = '') {
  return obtenerProductosCatalogo({
    section: slugSeccion,
    subcategory: slugSubcategoria,
    limit: 200,
  })
}

// Devuelve las subcategorías asociadas a maquetas.
export function obtenerSubcategoriasMaquetas(slugSeccion) {
  return obtenerSubcategoriasCatalogo({ section: slugSeccion })
}
