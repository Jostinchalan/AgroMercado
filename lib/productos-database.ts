import { productosAcuicolas, productosPesqueros, productosGanaderos, productosVegetales } from "@/lib/productos-data"

export interface ProductoDB {
  id: number
  nombre: string
  precio: number
  peso?: string
  cantidad?: string
  disponibles: number
  categoria: string
  descripcion: string
}

// Consolidar todos los productos en una sola base de datos
export const todosLosProductos: ProductoDB[] = [
  ...productosAcuicolas,
  ...productosPesqueros,
  ...productosGanaderos,
  ...productosVegetales,
]

// Función para buscar productos por nombre
export function buscarProductoPorNombre(nombre: string): ProductoDB | undefined {
  const nombreLower = nombre.toLowerCase()
  return todosLosProductos.find((p) => p.nombre.toLowerCase().includes(nombreLower))
}

// Función para obtener productos por categoría
export function obtenerProductosPorCategoria(categoria: string): ProductoDB[] {
  return todosLosProductos.filter((p) => p.categoria === categoria)
}

// Función para obtener información formateada de un producto
export function obtenerInfoProductoFormateada(producto: ProductoDB): string {
  let info = `**${producto.nombre}** ($${producto.precio.toFixed(2)})\n`
  info += `📦 ${producto.descripcion}\n`
  if (producto.peso) info += `⚖️ Peso: ${producto.peso}\n`
  if (producto.cantidad) info += `📊 Cantidad: ${producto.cantidad}\n`
  info += `✅ Disponibles: ${producto.disponibles} unidades`
  return info
}

// Función para obtener lista de productos de una categoría
export function listarProductosCategoria(categoria: string): string {
  const productos = obtenerProductosPorCategoria(categoria)
  if (productos.length === 0) return "No hay productos en esta categoría"

  return productos
    .map((p) => `• ${p.nombre} - $${p.precio.toFixed(2)} (${p.peso || p.cantidad || "Unidad"})`)
    .join("\n")
}

// Obtener estadísticas de la tienda
export function obtenerEstadisticas() {
  const totalProductos = todosLosProductos.length
  const precioMin = Math.min(...todosLosProductos.map((p) => p.precio))
  const precioMax = Math.max(...todosLosProductos.map((p) => p.precio))

  return {
    totalProductos,
    precioMin,
    precioMax,
    categorias: ["Acuícola", "Pesquero", "Ganadero", "Vegetal"],
  }
}
