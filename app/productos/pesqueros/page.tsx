"use client"

import { useState } from "react"
import ProductoCard from "@/componentes/Productos/ProductoCard"
import "../productos.css"

// Datos de productos pesqueros del Ecuador con precios reales
const productosPesqueros = [
  {
    id: 101,
    nombre: "Atún Fresco (kg)",
    precio: 11.0,
    imagen: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80",
    descripcion: "Atún rojo fresco del Pacífico ecuatoriano",
  },
  {
    id: 102,
    nombre: "Jurel Fresco (kg)",
    precio: 6.5,
    imagen: "https://images.unsplash.com/photo-1580959375944-abd7e991e971?w=400&q=80",
    descripcion: "Jurel económico y sabroso, perfecto para ceviches",
  },
  {
    id: 103,
    nombre: "Mero Fresco (kg)",
    precio: 15.0,
    imagen: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80",
    descripcion: "Mero de alta calidad, carne blanca y firme",
  },
  {
    id: 104,
    nombre: "Caballa Fresca (kg)",
    precio: 8.0,
    imagen: "https://images.unsplash.com/photo-1580959375944-abd7e991e971?w=400&q=80",
    descripcion: "Caballa fresca, rica en omega 3",
  },
  {
    id: 105,
    nombre: "Pez Espada Fresco (kg)",
    precio: 13.5,
    imagen: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80",
    descripcion: "Pez espada de excelente calidad",
  },
  {
    id: 106,
    nombre: "Robalo Fresco (kg)",
    precio: 14.0,
    imagen: "https://images.unsplash.com/photo-1580959375944-abd7e991e971?w=400&q=80",
    descripcion: "Robalo fresco, carne blanca exquisita",
  },
  {
    id: 107,
    nombre: "Corvina Fresca (kg)",
    precio: 12.5,
    imagen: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80",
    descripcion: "Corvina de agua salada, deliciosa",
  },
  {
    id: 108,
    nombre: "Sardinas Frescas (kg)",
    precio: 5.0,
    imagen: "https://images.unsplash.com/photo-1580959375944-abd7e991e971?w=400&q=80",
    descripcion: "Sardinas frescas, ideales para a la plancha",
  },
  
  {
    id: 110,
    nombre: "Pámpano Fresco (kg)",
    precio: 13.0,
    imagen: "https://images.unsplash.com/photo-1580959375944-abd7e991e971?w=400&q=80",
    descripcion: "Pámpano fresco con carne sabrosa",
  },
  {
    id: 111,
    nombre: "Congrio Fresco (kg)",
    precio: 10.5,
    imagen: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80",
    descripcion: "Congrio fresco, ideal para guisos",
  },
  {
    id: 112,
    nombre: "Pargo Rojo (kg)",
    precio: 17.0,
    imagen: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80",
    descripcion: "Pargo rojo de máxima calidad",
  },
  {
    id: 113,
    nombre: "Bonito Fresco (kg)",
    precio: 9.5,
    imagen: "https://images.unsplash.com/photo-1580959375944-abd7e991e971?w=400&q=80",
    descripcion: "Bonito fresco del Pacífico",
  },
  {
    id: 114,
    nombre: "Trucha de Mar (kg)",
    precio: 14.5,
    imagen: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80",
    descripcion: "Trucha de agua salada, exquisita",
  },
  {
    id: 115,
    nombre: "Dorado Fresco (kg)",
    precio: 15.5,
    imagen: "https://images.unsplash.com/photo-1580959375944-abd7e991e971?w=400&q=80",
    descripcion: "Dorado fresco, carne amarilla y sabrosa",
  },
  {
    id: 116,
    nombre: "Viejito Fresco (kg)",
    precio: 11.5,
    imagen: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80",
    descripcion: "Viejito fresco, delicioso para ceviche",
  },
  {
    id: 117,
    nombre: "Chita Fresca (kg)",
    precio: 12.0,
    imagen: "https://images.unsplash.com/photo-1580959375944-abd7e991e971?w=400&q=80",
    descripcion: "Chita fresca de agua salada",
  },
  {
    id: 118,
    nombre: "Huach Fresco (kg)",
    precio: 7.5,
    imagen: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80",
    descripcion: "Huach fresco, económico y nutritivo",
  },
]

// Página de productos pesqueros
export default function ProductosPesqueros() {
  const [notificacion, setNotificacion] = useState("")

  // Manejar agregar al carrito
  const handleAgregarCarrito = (producto: any) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito") || "[]")
    const indice = carritoActual.findIndex((item: any) => item.id === producto.id && item.categoria === "pesqueros")

    if (indice >= 0) {
      carritoActual[indice].cantidad += 1
    } else {
      carritoActual.push({ ...producto, categoria: "pesqueros", cantidad: 1 })
    }

    localStorage.setItem("carrito", JSON.stringify(carritoActual))
    setNotificacion(`${producto.nombre} agregado al carrito`)
    setTimeout(() => setNotificacion(""), 3000)
  }

  return (
    <div className="pagina-productos">
      <div className="contenedor-principal">
        <h1 className="titulo-seccion">Productos Pesqueros</h1>
        <p className="subtitulo-productos">Pescado fresco del Pacífico ecuatoriano</p>

        {notificacion && <div className="notificacion-carrito">✓ {notificacion}</div>}
      </div>
    </div>
  )
}
