"use client"

import "./quienes-somos.css"

export default function QuienesSomos() {
  return (
    <div className="pagina-quienes-somos">
      {/* Hero section with solid green background */}
      <section className="hero-quienes-somos">
        <div className="hero-contenido">
          <h1 className="titulo-hero">QUIÉNES SOMOS</h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="breadcrumb-container">
        <div className="contenedor-principal">
          <nav className="breadcrumb">
            <a href="/">INICIO</a>
            <span className="separador">›</span>
            <span className="actual">QUIÉNES SOMOS</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="contenedor-principal">
        <div className="contenido-quienes-somos">
          {/* Images section */}
          <div className="imagenes-empresa">
            <div className="imagen-principal">
              <img src="/empresa-equipo.jpg" alt="Equipo Agromercado" />
            </div>
            <div className="imagenes-secundarias">
              <div className="imagen-sec">
                <img src="/empresa-evento.jpg" alt="Evento Agromercado" />
              </div>
              <div className="imagen-sec">
                <img src="/empresa-campo.jpg" alt="Campo de cultivo" />
              </div>
              <div className="imagen-sec">
                <img src="/empresa-principal.jpg" alt="Agromercado operaciones" />
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="texto-empresa">
            <section className="seccion-info">
              <h2 className="titulo-seccion-verde">PRINCIPIOS Y VALORES</h2>
              <p className="texto-descripcion">
                Nos basamos en principios éticos, morales y responsabilidad ante la sociedad y el medio ambiente,
                mediante la aplicación y mejoramiento continuo de las mejores prácticas agrícolas. Trabajamos
                directamente con productores locales ecuatorianos, garantizando productos frescos de la más alta calidad
                mientras apoyamos el desarrollo de las comunidades rurales del país.
              </p>
            </section>

            <section className="seccion-info">
              <h2 className="titulo-seccion-verde">POLÍTICA DE CALIDAD</h2>
              <p className="texto-descripcion">
                Somos una organización dedicada a la comercialización y distribución de productos agrícolas frescos,
                acuícolas, pesqueros, ganaderos y vegetales de alta calidad para el mercado ecuatoriano. Mejoramos
                continuamente nuestros procesos, para lograr la satisfacción de nuestros clientes, y cumplimos con la
                legislación ecuatoriana vigente y otras aplicables. Garantizamos trazabilidad completa desde el
                productor hasta tu mesa.
              </p>
            </section>

            <section className="seccion-info">
              <h2 className="titulo-seccion-verde">OBJETIVOS DE CALIDAD</h2>
              <ul className="lista-objetivos">
                <li>Garantizar productos 100% frescos con certificación de origen</li>
                <li>Mantener la cadena de frío en productos que lo requieren</li>
                <li>Entregas en menos de 24 horas en zonas metropolitanas</li>
                <li>Trazabilidad completa de todos nuestros productos</li>
                <li>Apoyo directo a más de 500 productores locales ecuatorianos</li>
                <li>Compromiso con prácticas agrícolas sostenibles y responsables</li>
                <li>Satisfacción del cliente superior al 95%</li>
              </ul>
            </section>

            <section className="seccion-info">
              <h2 className="titulo-seccion-verde">NUESTRA HISTORIA</h2>
              <p className="texto-descripcion">
                Fundada en Ecuador con la visión de conectar el campo con la ciudad, Agromercado nació del deseo de
                hacer accesibles productos agrícolas de primera calidad a todas las familias ecuatorianas. Hoy somos una
                plataforma digital líder que conecta a cientos de productores locales con miles de clientes satisfechos
                en todo el país.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
