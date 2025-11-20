"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect } from "react"
import "./Navbar.css"

// Componente Navbar profesional y minimalista
export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [carritoCount, setCarritoCount] = useState(0)

  useEffect(() => {
    const actualizarCarrito = () => {
      const carrito = JSON.parse(localStorage.getItem("carrito") || "[]")
      const total = carrito.reduce((sum: number, item: any) => sum + item.cantidad, 0)
      setCarritoCount(total)
    }
    actualizarCarrito()
    window.addEventListener("storage", actualizarCarrito)
    window.addEventListener("carritoActualizado", actualizarCarrito)
    return () => {
      window.removeEventListener("storage", actualizarCarrito)
      window.removeEventListener("carritoActualizado", actualizarCarrito)
    }
  }, [])

  const handleClientesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setMenuAbierto(false)

    // Check if we're on the home page
    if (window.location.pathname === "/") {
      // Scroll to testimonials section
      const testimoniosSection = document.getElementById("testimonios")
      if (testimoniosSection) {
        testimoniosSection.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // Navigate to home page with hash
      window.location.href = "/#testimonios"
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-contenedor">
        {/* Logo profesional */}
        <Link href="/" className="navbar-logo">
          <img src="/logo.png" alt="Logo de Agromercado" className="logo-imagen" />
          <span className="logo-texto">Agromercado</span>
        </Link>

        {/* Botón menú hamburguesa para móvil */}
        <div
          className={`hamburguesa ${menuAbierto ? "activo" : ""}`}
          onClick={() => setMenuAbierto(!menuAbierto)}
          role="button"
          aria-label="Menú de navegación"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Menú de navegación simplificado - similar a primera imagen */}
        <ul className={`menu ${menuAbierto ? "activo" : ""}`}>
          <li>
            <Link href="/" onClick={() => setMenuAbierto(false)}>
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/productos" onClick={() => setMenuAbierto(false)}>
              Tienda online
            </Link>
          </li>
          <li>
            <Link href="/quienes-somos" onClick={() => setMenuAbierto(false)}>
              Quiénes Somos
            </Link>
          </li>
          <li>
            <a href="/#testimonios" onClick={handleClientesClick}>
              Clientes
            </a>
          </li>
          <li>
            <Link href="/contacto" onClick={() => setMenuAbierto(false)}>
              Contáctenos
            </Link>
          </li>
        </ul>

        {/* Botón carrito alineado a la derecha */}
        <Link href="/carrito" className="boton-carrito">
          Carrito {carritoCount > 0 && <span className="badge-carrito">{carritoCount}</span>}
        </Link>
      </div>
    </nav>
  )
}
