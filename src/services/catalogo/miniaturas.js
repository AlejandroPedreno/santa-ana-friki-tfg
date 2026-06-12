import { obtenerProductosCatalogo, obtenerSubcategoriasCatalogo } from './catalogoApi'

// Wrapper específico para miniaturas con el mismo contrato que el resto de secciones.
export function obtenerProductosMiniaturas(slugSeccion, slugSubcategoria = '') {
  return obtenerProductosCatalogo({
    section: slugSeccion,
    subcategory: slugSubcategoria,
    limit: 200,
  })
}

// Pide al backend las subcategorías de miniaturas de la sección indicada.
export function obtenerSubcategoriasMiniaturas(slugSeccion) {
  return obtenerSubcategoriasCatalogo({ section: slugSeccion })
}
