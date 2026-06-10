import { obtenerProductosCatalogo, obtenerSubcategoriasCatalogo } from './catalogoApi'

export function obtenerProductosMaquetas(slugSeccion, slugSubcategoria = '') {
  return obtenerProductosCatalogo({
    section: slugSeccion,
    subcategory: slugSubcategoria,
    limit: 200,
  })
}

export function obtenerSubcategoriasMaquetas(slugSeccion) {
  return obtenerSubcategoriasCatalogo({ section: slugSeccion })
}
