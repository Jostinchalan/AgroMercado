"use client"

import { useState } from "react"
import ProductoCard from "@/componentes/Productos/ProductoCard"
import "../productos.css"

const productosAcuicolas = [
  {
    id: 1,
    nombre: "Tilapia Fresca (kg)",
    precio: 8.5,
    imagen: "/tilapia.png",
    descripcion: "Tilapia de agua dulce, fresca y de excelente calidad. Perfecta para a la plancha",
  },
  {
    id: 2,
    nombre: "Trucha Arcoíris (kg)",
    precio: 12.0,
    imagen: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80",
    descripcion: "Trucha fresca cultivada en estanques de la sierra ecuatoriana",
  },
  {
    id: 3,
    nombre: "Camarones Grandes (kg)",
    precio: 18.5,
    imagen: "/tilapia.png",
    descripcion: "Camarones frescos de calidad premium, ideales para ceviches",
  },
  {
    id: 4,
    nombre: "Bagre Fresco (kg)",
    precio: 9.0,
    imagen: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
    descripcion: "Bagre cultivado en agua dulce, muy sabroso y económico",
  },
  {
    id: 5,
    nombre: "Tilapia Fileteada (kg)",
    precio: 14.0,
    imagen: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80",
    descripcion: "Filetes de tilapia listos para cocinar, sin espinas",
  },
  {
    id: 6,
    nombre: "Mojarra Fresca (kg)",
    precio: 7.5,
    imagen: "https://images.unsplash.com/photo-1580959375944-abd7e991e971?w=400&q=80",
    descripcion: "Mojarra de agua dulce, económica y deliciosa para freír",
  },
  {
    id: 7,
    nombre: "Camarones Medianos (kg)",
    precio: 15.0,
    imagen: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
    descripcion: "Camarones de tamaño mediano, muy frescos y de buena calidad",
  },
  {
    id: 8,
    nombre: "Ostras Frescas (docena)",
    precio: 22.0,
    imagen: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80",
    descripcion: "Ostras frescas del día, perfectas para ceviche y mariscos",
  },
  {
    id: 9,
    nombre: "Calamares Frescos (kg)",
    precio: 16.0,
    imagen: "https://images.unsplash.com/photo-1580959375944-abd7e991e971?w=400&q=80",
    descripcion: "Calamares frescos, ideales para a la plancha o guisados",
  },
  {
    id: 10,
    nombre: "Pez Gato (kg)",
    precio: 8.0,
    imagen: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
    descripcion: "Pez gato fresco de acuicultura, económico y nutritivo",
  },
  {
    id: 11,
    nombre: "Langostinos (kg)",
    precio: 25.0,
    imagen: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80",
    descripcion: "Langostinos frescos de agua dulce, de tamaño generoso",
  },
  {
    id: 12,
    nombre: "Cangrejo de Río (kg)",
    precio: 19.5,
    imagen: "https://images.unsplash.com/photo-1580959375944-abd7e991e971?w=400&q=80",
    descripcion: "Cangrejos frescos de río, muy sabrosos y típicos de la cocina ecuatoriana",
  },
  {
    id: 13,
    nombre: "Trucha Fileteada (kg)",
    precio: 18.0,
    imagen: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
    descripcion: "Filetes de trucha listos para cocinar, sin espinas ni piel",
  },
  {
    id: 14,
    nombre: "Camarones Premium (kg)",
    precio: 20.0,
    imagen: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80",
    descripcion: "Camarones de máxima calidad y tamaño, súper frescos",
  },
  {
    id: 15,
    nombre: "Mejillones Frescos (kg)",
    precio: 12.5,
    imagen: "https://images.unsplash.com/photo-1580959375944-abd7e991e971?w=400&q=80",
    descripcion: "Mejillones frescos para mariscos variados y preparaciones",
  },
  {
    id: 16,
    nombre: "Pez Espada (kg)",
    precio: 13.0,
    imagen: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
    descripcion: "Pez espada fresco de acuicultura, carne blanca y deliciosa",
  },
  {
    id: 17,
    nombre: "Camarones Jumbo (kg)",
    precio: 28.0,
    imagen: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80",
    descripcion: "Camarones jumbo, los más grandes y frescos que encontrarás",
  },
  {
    id: 18,
    nombre: "Almejas Frescas (kg)",
    precio: 14.5,
    imagen: "https://images.unsplash.com/photo-1580959375944-abd7e991e971?w=400&q=80",
    descripcion: "Almejas frescas, perfectas para ceviche y mariscos variados",
  },
]

// Página de productos acuícolas
export default function ProductosAcuicolas() {
  const [notificacion, setNotificacion] = useState("")

  // Manejar agregar al carrito
  const handleAgregarCarrito = (producto: any) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito") || "[]")
    const indice = carritoActual.findIndex((item: any) => item.id === producto.id && item.categoria === "acuicolas")

    if (indice >= 0) {
      carritoActual[indice].cantidad += 1
    } else {
      carritoActual.push({ ...producto, categoria: "acuicolas", cantidad: 1 })
    }

    localStorage.setItem("carrito", JSON.stringify(carritoActual))
    setNotificacion(`${producto.nombre} agregado al carrito`)
    setTimeout(() => setNotificacion(""), 3000)
  }

  return (
    <div className="pagina-productos">
      <div className="contenedor-principal">
        <h1 className="titulo-seccion">Productos Acuícolas</h1>
        <p className="subtitulo-productos">Pescado y mariscos frescos cultivados en Ecuador</p>

        {notificacion && <div className="notificacion-carrito">✓ {notificacion}</div>}

        <div className="grid-productos">
          {productosAcuicolas.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} onAgregar={handleAgregarCarrito} />
          ))}
        </div>
      </div>
    </div>
  )
}
