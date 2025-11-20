"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import "./page.css"

// Página de inicio mejorada
export default function Inicio() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const testimonios = [
    {
      id: 1,
      nombre: "María González",
      ciudad: "Quito",
      texto:
        "Excelente calidad de productos. Los camarones llegaron frescos y en perfectas condiciones. Totalmente recomendado.",
      calificacion: 5,
    },
    {
      id: 2,
      nombre: "Carlos Rodríguez",
      ciudad: "Guayaquil",
      texto:
        "La tilapia fresca es de excelente sabor. Entrega rápida y atención al cliente de primera. Volveré a comprar.",
      calificacion: 5,
    },
    {
      id: 3,
      nombre: "Ana López",
      ciudad: "Cuenca",
      texto:
        "Los vegetales son orgánicos y muy frescos. Me encanta saber que vienen directamente de productores locales.",
      calificacion: 5,
    },
    {
      id: 4,
      nombre: "Juan Pérez",
      ciudad: "Ambato",
      texto: "La carne de res tiene excelente presentación y sabor. Precios justos para la calidad que ofrecen.",
      calificacion: 5,
    },
    {
      id: 5,
      nombre: "Patricia Sánchez",
      ciudad: "Manta",
      texto:
        "Servicio impecable. Los productos llegan exactamente como se muestran. Definitivamente mi mejor opción de compra.",
      calificacion: 5,
    },
    {
      id: 6,
      nombre: "Roberto Andrade",
      ciudad: "Riobamba",
      texto:
        "Excelentes precios y productos de primera calidad. Recomiendo ampliamente a Agromercado a todos mis amigos.",
      calificacion: 5,
    },
  ]

  return (
    <div className="inicio">
      {/* Sección Hero mejorada - Verde oscuro profesional */}
      <section className="seccion-hero">
        <div className="contenido-hero">
          <h1 className="titulo-principal">Productos Agrícolas Frescos en Agromercado</h1>
          <p className="subtitulo">
            Conectamos productores locales certificados con tu mesa. Calidad garantizada, precios justos, entrega
            rápida.
          </p>

          <div className="botones-hero">
            <Link href="/productos" className="boton-primario">
              Explorar Productos
            </Link>
          </div>

          {/* Estadísticas */}
          <div className="estadisticas">
            <div className="stat">
              <span className="numero">100%</span>
              <span className="etiqueta">Productos Frescos</span>
            </div>
            <div className="stat">
              <span className="numero">5K+</span>
              <span className="etiqueta">Clientes Satisfechos</span>
            </div>
            <div className="stat">
              <span className="numero">24/7</span>
              <span className="etiqueta">Atención en Línea</span>
            </div>
          </div>
        </div>

        <div className="imagen-hero">
          <img
            src="/imagen_inicio.png"
            className="imagen-hero-img"
          />
        </div>
      </section>

      {/* Sección de Características - Sin Nuestras Categorías */}
      <section className="seccion-caracteristicas">
        <h2 className="titulo-seccion">Por Qué Elegir Agromercado</h2>

        <div className="grid-caracteristicas">
          <div className="tarjeta-caracteristica">
            <span className="icono-caracteristica">✓</span>
            <h4>Productos Frescos</h4>
            <p>Directamente de nuestros productores certificados en Ecuador</p>
          </div>

          <div className="tarjeta-caracteristica">
            <span className="icono-caracteristica">✓</span>
            <h4>Precios Competitivos</h4>
            <p>Los mejores precios del mercado ecuatoriano</p>
          </div>

          <div className="tarjeta-caracteristica">
            <span className="icono-caracteristica">✓</span>
            <h4>Entrega Rápida</h4>
            <p>Envíos en menos de 24 horas en área metropolitana</p>
          </div>

          <div className="tarjeta-caracteristica">
            <span className="icono-caracteristica">✓</span>
            <h4>Garantía Total</h4>
            <p>Si no estás satisfecho, devolvemos tu dinero</p>
          </div>

          <div className="tarjeta-caracteristica">
            <span className="icono-caracteristica">✓</span>
            <h4>Soporte 24/7</h4>
            <p>Nuestro equipo siempre disponible para ayudarte</p>
          </div>

          <div className="tarjeta-caracteristica">
            <span className="icono-caracteristica">✓</span>
            <h4>Sostenibilidad</h4>
            <p>Comprometidos con prácticas agrícolas responsables</p>
          </div>
        </div>
      </section>

      <section className="seccion-testimonios" id="testimonios">
        <h2 className="titulo-seccion">Lo Que Dicen Nuestros Clientes</h2>
        <p className="subtitulo-testimonios">Miles de clientes satisfechos en todo Ecuador confían en Agromercado</p>

        <div className="grid-testimonios">
          {testimonios.map((testimonio) => (
            <div key={testimonio.id} className="tarjeta-testimonio">
              <div className="calificacion">
                {[...Array(testimonio.calificacion)].map((_, i) => (
                  <span key={i} className="estrella">
                    ★
                  </span>
                ))}
              </div>
              <p className="texto-testimonio">"{testimonio.texto}"</p>
              <div className="autor-testimonio">
                <strong>{testimonio.nombre}</strong>
                <span className="ciudad">{testimonio.ciudad}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección CTA Final - ELIMINADA */}
    </div>
  )
}
