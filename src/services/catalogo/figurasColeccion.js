import { obtenerProductosCatalogo, obtenerSubcategoriasCatalogo } from './catalogoApi'

export function obtenerProductosFigurasColeccion(slugSeccion, slugSubcategoria = '') {
  return obtenerProductosCatalogo({
    section: slugSeccion,
    subcategory: slugSubcategoria,
    limit: 200,
  })
}

export function obtenerSubcategoriasFigurasColeccion(slugSeccion) {
  return obtenerSubcategoriasCatalogo({ section: slugSeccion })
}
