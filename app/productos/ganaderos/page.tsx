"use client"

import { useState } from "react"
import ProductoCard from "@/componentes/Productos/ProductoCard"
import "../productos.css"

// Datos de productos ganaderos del Ecuador con precios reales
const productosGanaderos = [
  {
    id: 201,
    nombre: "Carne de Res (kg)",
    precio: 9.5,
    imagen: "https://images.unsplash.com/photo-1555939594-58d7cb561404?w=400&q=80",
    descripcion: "Carne de res fresca, corte especial",
  },
  {
    id: 202,
    nombre: "Pechuga de Pollo (kg)",
    precio: 5.0,
    imagen: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&q=80",
    descripcion: "Pechuga de pollo fresca sin hueso",
  },
  {
    id: 203,
    nombre: "Carne de Cerdo (kg)",
    precio: 7.5,
    imagen: "https://images.unsplash.com/photo-1612528443702-f6741f271a6f?w=400&q=80",
    descripcion: "Carne de cerdo fresca de calidad",
  },
  {
    id: 204,
    nombre: "Leche de Vaca (litro)",
    precio: 0.6,
    imagen: "https://images.unsplash.com/photo-1600788148184-403f7691d8a4?w=400&q=80",
    descripcion: "Leche fresca pasteurizada",
  },
  {
    id: 205,
    nombre: "Queso Fresco (kg)",
    precio: 12.0,
    imagen: "https://images.unsplash.com/photo-1589985643862-e70376cda9cb?w=400&q=80",
    descripcion: "Queso fresco de la región",
  },
  {
    id: 206,
    nombre: "Costillas de Res (kg)",
    precio: 11.0,
    imagen: "https://images.unsplash.com/photo-1555939594-58d7cb561404?w=400&q=80",
    descripcion: "Costillas de res tiernas y jugosas",
  },
  {
    id: 207,
    nombre: "Muslos de Pollo (kg)",
    precio: 4.5,
    imagen: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&q=80",
    descripcion: "Muslos de pollo frescos con piel",
  },
  {
    id: 208,
    nombre: "Chuletas de Cerdo (kg)",
    precio: 8.5,
    imagen: "https://images.unsplash.com/photo-1612528443702-f6741f271a6f?w=400&q=80",
    descripcion: "Chuletas de cerdo tiernas",
  },
  {
    id: 209,
    nombre: "Mantequilla (kg)",
    precio: 9.0,
    imagen: "https://images.unsplash.com/photo-1589985643862-e70376cda9cb?w=400&q=80",
    descripcion: "Mantequilla fresca de buena calidad",
  },
  {
    id: 210,
    nombre: "Huevos Frescos (docena)",
    precio: 2.5,
    imagen: "https://images.unsplash.com/photo-1582722872981-82a072782d1d?w=400&q=80",
    descripcion: "Huevos frescos de granja",
  },
  {
    id: 211,
    nombre: "Lomo de Res (kg)",
    precio: 16.0,
    imagen: "https://images.unsplash.com/photo-1555939594-58d7cb561404?w=400&q=80",
    descripcion: "Lomo de res de máxima calidad",
  },
  {
    id: 212,
    nombre: "Pollo Completo (kg)",
    precio: 4.0,
    imagen: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&q=80",
    descripcion: "Pollo entero fresco",
  },
  {
    id: 213,
    nombre: "Tocino (kg)",
    precio: 10.0,
    imagen: "https://images.unsplash.com/photo-1612528443702-f6741f271a6f?w=400&q=80",
    descripcion: "Tocino fresco ahumado",
  },
  {
    id: 214,
    nombre: "Queso de Cabra (kg)",
    precio: 14.0,
    imagen: "https://images.unsplash.com/photo-1589985643862-e70376cda9cb?w=400&q=80",
    descripcion: "Queso artesanal de cabra",
  },
  {
    id: 215,
    nombre: "Yogur Natural (litro)",
    precio: 3.0,
    imagen: "https://images.unsplash.com/photo-1488477181946-6428a0291840?w=400&q=80",
    descripcion: "Yogur natural sin azúcar",
  },
  {
    id: 216,
    nombre: "Alitas de Pollo (kg)",
    precio: 4.5,
    imagen: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&q=80",
    descripcion: "Alitas de pollo frescas",
  },
  {
    id: 217,
    nombre: "Jamón Serrano (kg)",
    precio: 13.0,
    imagen: "https://images.unsplash.com/photo-1612528443702-f6741f271a6f?w=400&q=80",
    descripcion: "Jamón serrano de calidad",
  },
  {
    id: 218,
    nombre: "Crema de Leche (litro)",
    precio: 4.5,
    imagen: "https://images.unsplash.com/photo-1488477181946-6428a0291840?w=400&q=80",
    descripcion: "Crema de leche fresca",
  },
]

// Página de productos ganaderos
export default function ProductosGanaderos() {
  const [notificacion, setNotificacion] = useState("")

  // Manejar agregar al carrito
  const handleAgregarCarrito = (producto: any) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito") || "[]")
    const indice = carritoActual.findIndex((item: any) => item.id === producto.id && item.categoria === "ganaderos")

    if (indice >= 0) {
      carritoActual[indice].cantidad += 1
    } else {
      carritoActual.push({ ...producto, categoria: "ganaderos", cantidad: 1 })
    }

    localStorage.setItem("carrito", JSON.stringify(carritoActual))
    setNotificacion(`${producto.nombre} agregado al carrito`)
    setTimeout(() => setNotificacion(""), 3000)
  }

  return (
    <div className="pagina-productos">
      <div className="contenedor-principal">
        <h1 className="titulo-seccion">Productos Ganaderos</h1>
        <p className="subtitulo-productos">Carnes y lácteos frescos del Ecuador</p>

        {notificacion && <div className="notificacion-carrito">✓ {notificacion}</div>}

        <div className="grid-productos">
          {productosGanaderos.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} onAgregar={handleAgregarCarrito} />
          ))}
        </div>
      </div>
    </div>
  )
}
