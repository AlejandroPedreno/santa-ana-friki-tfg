import { obtenerProductosCatalogo, obtenerSubcategoriasCatalogo } from './catalogoApi'

export function obtenerProductosMiniaturas(slugSeccion, slugSubcategoria = '') {
  return obtenerProductosCatalogo({
    section: slugSeccion,
    subcategory: slugSubcategoria,
    limit: 200,
  })
}

export function obtenerSubcategoriasMiniaturas(slugSeccion) {
  return obtenerSubcategoriasCatalogo({ section: slugSeccion })
}
