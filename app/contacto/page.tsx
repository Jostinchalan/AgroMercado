"use client"

import type React from "react"

import { useState } from "react"
import "./contacto.css"

export default function ContactoPage() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    mensaje: "",
  })

  const [estadoEnvio, setEstadoEnvio] = useState({
    cargando: false,
    exito: false,
    error: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEstadoEnvio({ cargando: true, exito: false, error: "" })

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formulario),
      })

      const data = await response.json()

      if (response.ok) {
        setEstadoEnvio({
          cargando: false,
          exito: true,
          error: "",
        })
        // Limpiar formulario
        setFormulario({
          nombre: "",
          apellido: "",
          email: "",
          telefono: "",
          mensaje: "",
        })
        // Limpiar mensaje de éxito después de 5 segundos
        setTimeout(() => {
          setEstadoEnvio({ cargando: false, exito: false, error: "" })
        }, 5000)
      } else {
        setEstadoEnvio({
          cargando: false,
          exito: false,
          error: data.error || "Error al enviar el formulario",
        })
      }
    } catch (error) {
      setEstadoEnvio({
        cargando: false,
        exito: false,
        error: "Error al conectar con el servidor",
      })
    }
  }

  return (
    <div className="contacto-page">
      {/* Hero Section with image background */}
      <div className="contacto-hero">
        <h1 className="contacto-titulo">CONTÁCTENOS</h1>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb-contacto">
        <a href="/">INICIO</a>
        <span> &gt; </span>
        <span>CONTÁCTENOS</span>
      </div>

      {/* Main Content */}
      <div className="contacto-contenido">
        <div className="contacto-grid">
          {/* Contact Form */}
          <div className="formulario-seccion">
            <h2 className="formulario-titulo">FORMULARIO DE CONTACTO</h2>
            <p className="formulario-descripcion">
              Si desea contactarse con nosotros, llene los campos correspondientes del formulario y envíelo, le
              responderemos lo más pronto posible.
            </p>

            <form className="formulario-contacto" onSubmit={handleSubmit}>
              <div className="formulario-fila">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  className="input-campo"
                  value={formulario.nombre}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  className="input-campo"
                  value={formulario.apellido}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="formulario-fila">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input-campo"
                  value={formulario.email}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  className="input-campo"
                  value={formulario.telefono}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="formulario-fila-completa">
                <textarea
                  name="mensaje"
                  placeholder="Mensaje"
                  className="input-campo textarea-campo"
                  rows={6}
                  value={formulario.mensaje}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              {estadoEnvio.exito && (
                <div className="mensaje-exito">✓ ¡Correo enviado exitosamente! Revisar tu bandeja de entrada.</div>
              )}
              {estadoEnvio.error && <div className="mensaje-error">✗ {estadoEnvio.error}</div>}

              <button type="submit" className="boton-enviar" disabled={estadoEnvio.cargando}>
                {estadoEnvio.cargando ? "ENVIANDO..." : "ENVIAR"}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="informacion-seccion">
            <div className="info-box">
              <h3 className="info-titulo">INFORMACIÓN DE CONTACTO</h3>

              <div className="info-item">
                <div className="info-icono">📍</div>
                <div className="info-texto">
                  <p>Cdla. Los Vergeles Calle 23A Dr.</p>
                  <p>Carlos Julio Arosemena, No 1-6-7</p>
                  <p>Intersección Av. 38C Mz 263.</p>
                  <p>Guayaquil - Ecuador</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icono">📞</div>
                <div className="info-texto">
                  <p> +593 980601562</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icono">✉️</div>
                <div className="info-texto">
                  <p>info@agromercado.ec</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
