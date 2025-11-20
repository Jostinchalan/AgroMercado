"use client"

import { useState } from "react"
import ProductoCard from "@/componentes/Productos/ProductoCard"
import "../productos.css"

// Datos de productos vegetales del Ecuador con precios reales
const productosVegetales = [
  {
    id: 301,
    nombre: "Tomate Fresco (kg)",
    precio: 2.0,
    imagen: "https://images.unsplash.com/photo-1592841494869-46c7ee671040?w=400&q=80",
    descripcion: "Tomates frescos de la región",
  },
  {
    id: 302,
    nombre: "Lechuga Crespa (unidad)",
    precio: 1.0,
    imagen: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
    descripcion: "Lechuga fresca y crujiente",
  },
  {
    id: 303,
    nombre: "Brócoli Fresco (unidad)",
    precio: 3.0,
    imagen: "https://images.unsplash.com/photo-1628840042765-356cda07f04a?w=400&q=80",
    descripcion: "Brócoli fresco de alta calidad",
  },
  {
    id: 304,
    nombre: "Zanahoria (kg)",
    precio: 1.5,
    imagen: "https://images.unsplash.com/photo-1575260049383-30f5e8e68c96?w=400&q=80",
    descripcion: "Zanahorias frescas y dulces",
  },
  {
    id: 305,
    nombre: "Papa (kg)",
    precio: 1.2,
    imagen: "https://images.unsplash.com/photo-1596363860892-0b1a5f5767f2?w=400&q=80",
    descripcion: "Papas frescas de calidad culinaria",
  },
  {
    id: 306,
    nombre: "Cebolla Blanca (kg)",
    precio: 1.0,
    imagen: "https://images.unsplash.com/photo-1599599810694-b5ac4dd64e63?w=400&q=80",
    descripcion: "Cebollas blancas frescas",
  },
  {
    id: 307,
    nombre: "Ajo Fresco (kg)",
    precio: 8.0,
    imagen: "https://images.unsplash.com/photo-1599599810694-b5ac4dd64e63?w=400&q=80",
    descripcion: "Ajo fresco de excelente calidad",
  },
  {
    id: 308,
    nombre: "Pepino (kg)",
    precio: 2.5,
    imagen: "https://images.unsplash.com/photo-1588294689033-d6461f0d3a4b?w=400&q=80",
    descripcion: "Pepinos frescos y tiernos",
  },
  {
    id: 309,
    nombre: "Pimiento Rojo (kg)",
    precio: 4.0,
    imagen: "https://images.unsplash.com/photo-1599599810694-b5ac4dd64e63?w=400&q=80",
    descripcion: "Pimientos rojos frescos",
  },
  {
    id: 310,
    nombre: "Espinaca (kg)",
    codigo: 3.5,
    imagen: "https://images.unsplash.com/photo-1599599810694-b5ac4dd64e63?w=400&q=80",
    descripcion: "Espinaca fresca y orgánica",
  },
  {
    id: 311,
    nombre: "Maíz Fresco (kg)",
    precio: 2.0,
    imagen: "https://images.unsplash.com/photo-1599599810694-b5ac4dd64e63?w=400&q=80",
    descripcion: "Maíz fresco de choclo",
  },
  {
    id: 312,
    nombre: "Plátano (kg)",
    precio: 0.8,
    imagen: "https://images.unsplash.com/photo-1587138188873-ce47b15c9d0f?w=400&q=80",
    descripcion: "Plátanos frescos y amarillos",
  },
  {
    id: 313,
    nombre: "Manzana Roja (kg)",
    precio: 3.5,
    imagen: "https://images.unsplash.com/photo-1560806e614ce0db7c51f2b9994e2b604b766b86?w=400&q=80",
    descripcion: "Manzanas rojas frescas",
  },
  {
    id: 314,
    nombre: "Naranja Dulce (kg)",
    precio: 2.5,
    imagen: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80",
    descripcion: "Naranjas dulces y jugosas",
  },
  {
    id: 315,
    nombre: "Limón (kg)",
    precio: 2.0,
    imagen: "https://images.unsplash.com/photo-1599599810694-b5ac4dd64e63?w=400&q=80",
    descripcion: "Limones frescos y ácidos",
  },
  {
    id: 316,
    nombre: "Aguacate (unidad)",
    precio: 1.5,
    imagen: "https://images.unsplash.com/photo-1523049673857-eb18f531a909?w=400&q=80",
    descripcion: "Aguacates frescos y maduros",
  },
  {
    id: 317,
    nombre: "Fresa (kg)",
    precio: 6.0,
    imagen: "https://images.unsplash.com/photo-1582046157375-bf67f32c4c4f?w=400&q=80",
    descripcion: "Fresas frescas y dulces",
  },
  {
    id: 318,
    nombre: "Mora (kg)",
    precio: 8.0,
    imagen: "https://images.unsplash.com/photo-1599599810694-b5ac4dd64e63?w=400&q=80",
    descripcion: "Moras frescas de buena calidad",
  },
]

// Página de productos vegetales
export default function ProductosVegetales() {
  const [notificacion, setNotificacion] = useState("")

  // Manejar agregar al carrito
  const handleAgregarCarrito = (producto: any) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito") || "[]")
    const indice = carritoActual.findIndex((item: any) => item.id === producto.id && item.categoria === "vegetales")

    if (indice >= 0) {
      carritoActual[indice].cantidad += 1
    } else {
      carritoActual.push({ ...producto, categoria: "vegetales", cantidad: 1 })
    }

    localStorage.setItem("carrito", JSON.stringify(carritoActual))
    setNotificacion(`${producto.nombre} agregado al carrito`)
    setTimeout(() => setNotificacion(""), 3000)
  }

  return (
    <div className="pagina-productos">
      <div className="contenedor-principal">
        <h1 className="titulo-seccion">Productos Vegetales</h1>
        <p className="subtitulo-productos">Frutas y verduras frescas cultivadas en Ecuador</p>

        {notificacion && <div className="notificacion-carrito">✓ {notificacion}</div>}

        <div className="grid-productos">
          {productosVegetales.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} onAgregar={handleAgregarCarrito} />
          ))}
        </div>
      </div>
    </div>
  )
}
