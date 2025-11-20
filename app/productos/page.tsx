"use client"

import { useState } from "react"
import ProductoCard from "@/componentes/Productos/ProductoCard"
import "./productos-principal.css"
import { productosAcuicolas, productosPesqueros, productosGanaderos, productosVegetales } from "@/lib/productos-data"

export default function Productos() {
  const [categoriaActual, setCategoriaActual] = useState<string | null>(null)

  const obtenerProductos = () => {
    switch (categoriaActual) {
      case "acuicolas":
        return productosAcuicolas.slice(0, 15)
      case "pesqueros":
        return productosPesqueros.slice(0, 15)
      case "ganaderos":
        return productosGanaderos.slice(0, 15)
      case "vegetales":
        return productosVegetales.slice(0, 15)
      default:
        return []
    }
  }

  const handleAgregarCarrito = (producto: any) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito") || "[]")
    const indice = carritoActual.findIndex(
      (item: any) => item.id === producto.id && item.categoria === producto.categoria,
    )

    if (indice >= 0) {
      carritoActual[indice].cantidad += 1
    } else {
      carritoActual.push({ ...producto, cantidad: 1 })
    }

    localStorage.setItem("carrito", JSON.stringify(carritoActual))
    window.dispatchEvent(new Event("carritoActualizado"))
    window.dispatchEvent(
      new CustomEvent("carritoNotificacion", {
        detail: { productoId: producto.id, categoria: producto.categoria },
      }),
    )
  }

  const productos = obtenerProductos()

  if (!categoriaActual) {
    return (
      <div className="pagina-productos-principal">
        <div className="contenedor-principal">
          <h1 className="titulo-seccion">Tienda Online</h1>
          <p className="subtitulo-productos">Selecciona la categoría que te interesa</p>

          <div className="grid-categorias">
            <div className="tarjeta-categoria" onClick={() => setCategoriaActual("acuicolas")}>
              <div className="imagen-categoria">
                <img src="/categorias/acuicola.jpg" alt="Productos Acuícolas" />
              </div>
              <h3>Acuícola</h3>
              <p>Productos frescos de acuicultura</p>
            </div>

            <div className="tarjeta-categoria" onClick={() => setCategoriaActual("pesqueros")}>
              <div className="imagen-categoria">
                <img src="/categorias/pesquero.jpg" alt="Productos Pesqueros" />
              </div>
              <h3>Pesquero</h3>
              <p>Pescados y mariscos del océano</p>
            </div>

            <div className="tarjeta-categoria" onClick={() => setCategoriaActual("ganaderos")}>
              <div className="imagen-categoria">
                <img src="/categorias/ganadero.jpg" alt="Productos Ganaderos" />
              </div>
              <h3>Ganadero</h3>
              <p>Carnes frescas y de calidad</p>
            </div>

            <div className="tarjeta-categoria" onClick={() => setCategoriaActual("vegetales")}>
              <div className="imagen-categoria">
                <img src="/categorias/vegetal.jpg" alt="Productos Vegetales" />
              </div>
              <h3>Vegetal</h3>
              <p>Vegetales frescos y orgánicos</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pagina-productos-principal">
      <div className="contenedor-principal">
        <div className="breadcrumb">
          <button onClick={() => setCategoriaActual(null)} className="breadcrumb-link">
            Categorías
          </button>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-actual">
            {categoriaActual === "acuicolas"
              ? "Acuícola"
              : categoriaActual === "pesqueros"
                ? "Pesquero"
                : categoriaActual === "ganaderos"
                  ? "Ganadero"
                  : "Vegetal"}
          </span>
        </div>

        <h1 className="titulo-seccion">
          Productos{" "}
          {categoriaActual === "acuicolas"
            ? "Acuícolas"
            : categoriaActual === "pesqueros"
              ? "Pesqueros"
              : categoriaActual === "ganaderos"
                ? "Ganadero"
                : "Vegetales"}
        </h1>

        <div className="grid-productos">
          {productos.map((producto) => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              onAgregar={handleAgregarCarrito}
              categoria={categoriaActual}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
