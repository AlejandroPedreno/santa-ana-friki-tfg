import { obtenerProductosCatalogo, obtenerSubcategoriasCatalogo } from './catalogoApi'

export function obtenerProductosAccesorios(slugSeccion, slugSubcategoria = '') {
  return obtenerProductosCatalogo({
    section: slugSeccion,
    subcategory: slugSubcategoria,
    limit: 200,
  })
}

export function obtenerSubcategoriasAccesorios(slugSeccion) {
  return obtenerSubcategoriasCatalogo({ section: slugSeccion })
}
