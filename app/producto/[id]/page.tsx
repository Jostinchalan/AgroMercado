"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from 'next/navigation'
import Link from "next/link"
import { productosAcuicolas, productosPesqueros, productosGanaderos, productosVegetales } from "@/lib/productos-data"
import "./producto-detalle.css"

export default function ProductoDetalle() {
  const params = useParams()
  const searchParams = useSearchParams()
  const id = Number(params.id)
  const categoria = searchParams.get("categoria") || "acuicolas"

  const [producto, setProducto] = useState<any>(null)
  const [cantidad, setCantidad] = useState(1)
  const [imagenSeleccionada, setImagenSeleccionada] = useState(0)
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false)

  useEffect(() => {
    let todosProductos: any[] = []

    switch (categoria) {
      case "acuicolas":
        todosProductos = productosAcuicolas
        break
      case "pesqueros":
        todosProductos = productosPesqueros
        break
      case "ganaderos":
        todosProductos = productosGanaderos
        break
      case "vegetales":
        todosProductos = productosVegetales
        break
    }

    const productoEncontrado = todosProductos.find((p) => p.id === id)
    setProducto(productoEncontrado)
  }, [id, categoria])

  const handleAgregarCarrito = () => {
    if (!producto) return

    const carritoActual = JSON.parse(localStorage.getItem("carrito") || "[]")
    const indice = carritoActual.findIndex(
      (item: any) => item.id === producto.id && item.categoria === producto.categoria,
    )

    if (indice >= 0) {
      carritoActual[indice].cantidad += cantidad
    } else {
      carritoActual.push({ ...producto, cantidad })
    }

    localStorage.setItem("carrito", JSON.stringify(carritoActual))
    window.dispatchEvent(new Event("carritoActualizado"))

    setMostrarNotificacion(true)
    setTimeout(() => setMostrarNotificacion(false), 3000)
  }

  if (!producto) {
    return (
      <div className="pagina-producto-detalle">
        <div className="contenedor-principal">
          <p>Cargando producto...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pagina-producto-detalle">
      {/* Breadcrumb */}
      <div className="breadcrumb-container">
        <div className="contenedor-principal">
          <nav className="breadcrumb">
            <Link href="/">Inicio</Link>
            <span className="separador">›</span>
            <Link href="/productos">Productos</Link>
            <span className="separador">›</span>
            <span className="categoria-nombre">{categoria}</span>
            <span className="separador">›</span>
            <span className="actual">{producto.nombre}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="contenedor-principal">
        <div className="producto-detalle-grid">
          {/* Product Image */}
          <div className="producto-imagen-seccion">
            <div className="imagen-principal-container">
              <img
                src={producto.imagen || "/placeholder.svg"}
                alt={producto.nombre}
                className="imagen-principal-detalle"
              />
            </div>
            <div className="imagenes-miniaturas">
              <img
                src={producto.imagen || "/placeholder.svg"}
                alt={producto.nombre}
                className="miniatura-imagen activa"
                onClick={() => setImagenSeleccionada(0)}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="producto-info-seccion">
            <h1 className="producto-titulo">{producto.nombre}</h1>

            <div className="producto-meta">
              <span className="producto-codigo">
                <strong>Código:</strong> PROD-{producto.categoria?.toUpperCase()}-{producto.id}
              </span>
              <span className="producto-categoria-badge">
                <strong>Categoría:</strong> {categoria}
              </span>
            </div>

            {producto.disponibles && (
              <div className="disponibilidad-info">
                <span className="icono-check">✓</span>
                <span>
                  <strong>{producto.disponibles} unidades disponibles</strong>
                </span>
              </div>
            )}

            {/* Price */}
            <div className="precio-container">
              <span className="precio-principal">${producto.precio.toFixed(2)}</span>
              {producto.peso && <span className="precio-unidad">por {producto.peso}</span>}
            </div>

            {/* Ingredient Active / Specs */}
            <div className="ingrediente-activo">
              <h3>Especificaciones:</h3>
              <ul>
                {producto.peso && <li>Peso: {producto.peso}</li>}
                {producto.cantidad && <li>Cantidad: {producto.cantidad}</li>}
                <li>Producto fresco de alta calidad</li>
                <li>Origen: Ecuador</li>
              </ul>
            </div>

            {/* Quantity Selector */}
            <div className="cantidad-selector">
              <label htmlFor="cantidad">Cantidad:</label>
              <div className="cantidad-controls">
                <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="btn-cantidad">
                  −
                </button>
                <input
                  type="number"
                  id="cantidad"
                  value={cantidad}
                  onChange={(e) => setCantidad(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  min="1"
                  className="input-cantidad"
                />
                <button onClick={() => setCantidad(cantidad + 1)} className="btn-cantidad">
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="boton-anadir-carrito-grande" onClick={handleAgregarCarrito}>
              Añadir al carrito
            </button>

            {/* Description */}
            <div className="descripcion-detalle">
              <h3>DESCRIPCIÓN:</h3>
              <p>{producto.descripcion}</p>
              <p className="descripcion-extra">
                Producto fresco de la más alta calidad, proveniente de productores locales ecuatorianos certificados.
                Garantizamos frescura y trazabilidad completa desde el origen hasta tu mesa.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {mostrarNotificacion && <div className="notificacion-flotante">✓ Producto agregado al carrito correctamente</div>}
    </div>
  )
}
