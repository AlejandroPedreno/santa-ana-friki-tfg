# Migración del catálogo a base de datos

## Objetivo

El catálogo del proyecto pasó de estar definido con arrays estáticos en cada vista de React a cargarse desde MySQL a través de una API PHP. El objetivo de este cambio fue eliminar la duplicidad de datos, facilitar el mantenimiento del contenido y preparar la aplicación para crecer hacia funcionalidades como usuarios, carrito, pedidos y eventos.

## Situación anterior

Antes de la migración, cada vista contenía sus propios productos escritos a mano dentro del componente. Eso provocaba varios problemas:

- Cada sección tenía su propio array local de productos.
- Los cambios de precio, imagen o nombre había que hacerlos manualmente en el frontend.
- La lógica de presentación y la lógica de datos estaban mezcladas.
- Si se quería añadir autenticación, carrito u órdenes, no existía una base preparada para ello.

## Situación actual

Ahora el flujo está dividido en tres capas:

1. **Base de datos MySQL**
   - Guarda la información del catálogo en tablas normalizadas.
   - Las tablas principales son `catalog_sections`, `catalog_subcategories` y `products`.

2. **API PHP**
   - Expone los datos mediante endpoints como `products`, `sections` y `subcategories`.
   - React no se conecta directamente a MySQL, sino a esta API.

3. **Frontend React**
   - Consume la API desde una capa de servicios.
   - Los componentes visuales solo se encargan de renderizar los datos.

## Flujo de datos

El flujo completo es el siguiente:

1. El usuario entra en una vista, por ejemplo `OnePieceTCG`, `Warhammer` o `FigurasDeColeccion`.
2. La vista pasa la información necesaria a `CardGamePage`.
3. `CardGamePage` resuelve qué sección del catálogo debe cargar.
4. El componente llama al service `obtenerProductosCatalogo(...)`.
5. Ese service construye la petición HTTP a la API PHP.
6. La API consulta MySQL y devuelve los productos en formato JSON.
7. `CardGamePage` normaliza la respuesta para que el componente `Product` la pueda pintar.
8. El resultado final se muestra en pantalla sin depender de arrays locales escritos a mano.

## Capa de services

La capa de services se creó para separar responsabilidades y organizar mejor el acceso a datos.

### `catalogoApi.js`

Este archivo es el service base.

Su función es:

- Construir la URL de la API.
- Añadir los parámetros necesarios.
- Ejecutar la petición HTTP.
- Devolver la respuesta JSON.

Desde aquí se exponen funciones genéricas:

- `obtenerProductosCatalogo(...)`
- `obtenerSeccionesCatalogo()`
- `obtenerSubcategoriasCatalogo(...)`

### Wrappers por dominio

Después se añadieron archivos más específicos para organizar el acceso por tipo de sección:

- `juegosDeCartas.js`
- `miniaturas.js`
- `maquetas.js`
- `accesorios.js`
- `figurasColeccion.js`

Estos archivos no duplican lógica. Solo llaman al service base, pero lo hacen con nombres más claros para el contexto del proyecto.

Por ejemplo:

- `obtenerProductosMiniaturas(...)`
- `obtenerSubcategoriasMiniaturas(...)`
- `obtenerProductosJuegosDeCartas(...)`

Esto permite que el código sea más legible y semántico.

## Papel de `CardGamePage`

`CardGamePage` se convirtió en el componente reutilizable central para el catálogo.

Sus funciones principales son:

- Renderizar la cabecera, el banner y la rejilla de productos.
- Ordenar los productos por precio o lanzamiento.
- Cargar productos desde la API cuando la vista lo necesita.
- Normalizar los datos recibidos para que `Product` los pueda mostrar.

Además, este componente resuelve automáticamente la sección del catálogo a partir del título de la vista, por lo que muchas páginas no necesitan lógica propia de carga.

## Casos especiales

### Warhammer

Warhammer tiene un filtro por subcategorías reales de BBDD.

En esta vista:

- Se cargan las subcategorías desde la API.
- El select de categorías se construye a partir de datos reales.
- Al seleccionar una categoría, `CardGamePage` vuelve a pedir los productos filtrados por `subcategorySlug`.

### Figuras de colección

Esta vista también carga las categorías desde la base de datos.

Si la tabla de subcategorías no contiene datos para esa sección, el filtro solo mostrará la opción “Todas”. En ese caso, el código está preparado, pero faltan datos en la base para alimentar el selector.

## Por qué se ha hecho así

La separación por capas aporta varias ventajas:

- **Mantenimiento más simple**: los datos cambian en la base de datos, no en varios componentes React.
- **Menos duplicidad**: la misma lógica de petición se reutiliza en toda la aplicación.
- **Escalabilidad**: se pueden añadir usuarios, pedidos y eventos sin rediseñar todo el frontend.
- **Claridad estructural**: cada capa hace una sola cosa y es más fácil de entender.
- **Defensa técnica**: demuestra una arquitectura real de aplicación web, no solo una interfaz estática.

## Idea clave para defender el proyecto

La evolución del proyecto fue pasar de una web con contenido estático a una aplicación desacoplada:

- **MySQL** guarda los datos.
- **PHP** actúa como backend de acceso.
- **React** consume esos datos a través de services.
- **CardGamePage** concentra la lógica común de visualización.

Esto hace que el catálogo sea más profesional, mantenible y preparado para crecer.

## Resumen corto para exposición

> Se sustituyeron los arrays estáticos del frontend por una arquitectura basada en base de datos, API PHP y capa de services en React. El componente común `CardGamePage` consume los productos desde la API y normaliza la información para todas las vistas del catálogo. Esto reduce mantenimiento, elimina duplicidad y deja el proyecto preparado para módulos futuros como usuarios, carrito, pedidos y eventos.
