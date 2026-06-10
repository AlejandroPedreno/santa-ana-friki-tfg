import { obtenerProductosCatalogo, obtenerSubcategoriasCatalogo } from './catalogoApi'

export function obtenerProductosJuegosDeCartas(slugSeccion, slugSubcategoria = '') {
  return obtenerProductosCatalogo({
    section: slugSeccion,
    subcategory: slugSubcategoria,
    limit: 200,
  })
}

export function obtenerSubcategoriasJuegosDeCartas(slugSeccion) {
  return obtenerSubcategoriasCatalogo({ section: slugSeccion })
}
