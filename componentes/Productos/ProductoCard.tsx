"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import "./ProductoCard.css"

// Interfaz para el producto
interface Producto {
  id: number
  nombre: string
  precio: number
  imagen: string
  descripcion: string
  peso?: string
  cantidad?: string
  disponibles?: number
  categoria?: string
}

// Interfaz para las props del componente
interface ProductoCardProps {
  producto: Producto
  onAgregar: (producto: Producto) => void
  categoria: string
}

export default function ProductoCard({ producto, onAgregar, categoria }: ProductoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false)

  useEffect(() => {
    const handleNotificacionGlobal = (event: Event) => {
      const customEvent = event as CustomEvent
      if (customEvent.detail?.productoId === producto.id && customEvent.detail?.categoria === categoria) {
        setMostrarNotificacion(true)
        setTimeout(() => setMostrarNotificacion(false), 3000)
      }
    }

    window.addEventListener("carritoNotificacion", handleNotificacionGlobal)
    return () => window.removeEventListener("carritoNotificacion", handleNotificacionGlobal)
  }, [producto.id, categoria])

  const handleAgregar = () => {
    onAgregar(producto)
    window.dispatchEvent(
      new CustomEvent("carritoNotificacion", {
        detail: { productoId: producto.id, categoria: categoria },
      }),
    )
  }

  return (
    <div className="tarjeta-producto">
      {/* Contenedor de imagen */}
      <div className="imagen-contenedor">
        <img
          src={producto.imagen || "/placeholder.svg"}
          alt={producto.nombre}
          className={`imagen-producto ${imageLoaded ? "cargada" : ""}`}
          onLoad={() => setImageLoaded(true)}
        />
        {producto.disponibles && <div className="badge-disponibilidad">{producto.disponibles} disponibles</div>}
      </div>

      {/* Contenedor de información */}
      <div className="info-producto">
        <h3 className="nombre-producto">{producto.nombre}</h3>
        <p className="descripcion-producto">{producto.descripcion}</p>

        {(producto.peso || producto.cantidad) && (
          <div className="especificaciones-producto">
            {producto.peso && <span className="especificacion-item">Peso: {producto.peso}</span>}
            {producto.cantidad && <span className="especificacion-item">Cantidad: {producto.cantidad}</span>}
          </div>
        )}

        {/* Precio */}
        <div className="precio-seccion">
          <span className="precio">${producto.precio.toFixed(2)}</span>
        </div>

        <div className="botones-producto">
          <button className="boton-agregar" onClick={handleAgregar}>
            Añadir al carrito
          </button>
          <Link href={`/producto/${producto.id}?categoria=${categoria}`} className="boton-ver">
            Ver producto
          </Link>
        </div>

        {mostrarNotificacion && <div className="notificacion-producto-agregado">✓ Producto agregado al carrito</div>}
      </div>
    </div>
  )
}
