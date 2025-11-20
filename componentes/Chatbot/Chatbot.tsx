"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import "./Chatbot.css"

interface Mensaje {
  id: string
  texto: string
  remitente: "usuario" | "bot"
  timestamp: Date
  opciones?: string[]
}

export default function Chatbot() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      id: "1",
      texto:
        "Hola, soy el asistente de Agromercado. Puedo ayudarte a encontrar productos frescos, consultar precios, información de envíos, y agregar productos directamente a tu carrito. ¿En qué puedo ayudarte?",
      remitente: "bot",
      timestamp: new Date(),
      opciones: ["Ver productos", "Búscar producto", "Envíos", "Contacto", "Sobre nosotros"],
    },
  ])

  const [inputMensaje, setInputMensaje] = useState("")
  const [chatAbierto, setChatAbierto] = useState(false)
  const [cargando, setCargando] = useState(false)
  const contenedorMensajes = useRef<HTMLDivElement>(null)

  // Auto scroll al final de los mensajes
  useEffect(() => {
    if (contenedorMensajes.current) {
      contenedorMensajes.current.scrollTop = contenedorMensajes.current.scrollHeight
    }
  }, [mensajes])

  const obtenerRespuestaGPT = async (mensaje: string) => {
    try {
      // Convertir últimos 6 mensajes al formato correcto para OpenAI
      const historial = mensajes.slice(-6).map((m) => ({
        role: m.remitente === "usuario" ? "user" : "assistant",
        content: m.texto,
      }))

      console.log("[v0] Enviando al API:", { mensaje, historialLength: historial.length })

      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mensaje: mensaje,
          historialMensajes: historial,
        }),
      })

      if (!response.ok) {
        console.error("[v0] Error en respuesta:", response.status, response.statusText)
        const errorData = await response.json().catch(() => ({}))
        console.error("[v0] Error details:", errorData)
        return {
          respuesta:
            "Disculpa, estoy experimentando dificultades técnicas. Por favor intenta de nuevo. Verifica que tu OPENAI_API_KEY esté configurada.",
          accionCarrito: null,
        }
      }

      const data = await response.json()
      console.log("[v0] Respuesta del API recibida:", data)
      return {
        respuesta: data.respuesta || "No pude procesar tu solicitud",
        accionCarrito: data.accionCarrito,
      }
    } catch (error) {
      console.error("[v0] Error llamando API:", error)
      return {
        respuesta: "Ocurrió un error al procesar tu mensaje. Por favor intenta de nuevo.",
        accionCarrito: null,
      }
    }
  }

  const handleAgregarAlCarrito = (producto: any) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito") || "[]")
    const indice = carritoActual.findIndex(
      (item: any) => item.id === producto.id && item.categoria === producto.categoria,
    )

    if (indice >= 0) {
      carritoActual[indice].cantidad += producto.cantidad || 1
    } else {
      carritoActual.push({ ...producto, cantidad: producto.cantidad || 1 })
    }

    localStorage.setItem("carrito", JSON.stringify(carritoActual))
    window.dispatchEvent(new Event("carritoActualizado"))
    window.dispatchEvent(
      new CustomEvent("carritoNotificacion", {
        detail: { productoId: producto.id, categoria: producto.categoria },
      }),
    )
  }

  // Manejar envío de mensaje
  const handleEnviarMensaje = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputMensaje.trim()) return

    const nuevoMensajeUsuario: Mensaje = {
      id: Date.now().toString(),
      texto: inputMensaje,
      remitente: "usuario",
      timestamp: new Date(),
    }

    setMensajes((prev) => [...prev, nuevoMensajeUsuario])
    setInputMensaje("")
    setCargando(true)

    try {
      const { respuesta, accionCarrito } = await obtenerRespuestaGPT(inputMensaje)

      const nuevoMensajeBot: Mensaje = {
        id: (Date.now() + 1).toString(),
        texto: respuesta,
        remitente: "bot",
        timestamp: new Date(),
      }

      setMensajes((prev) => [...prev, nuevoMensajeBot])

      if (accionCarrito && accionCarrito.tipo === "agregar") {
        console.log("[v0] Agregando producto al carrito:", accionCarrito.producto)
        handleAgregarAlCarrito(accionCarrito.producto)
      }
    } catch (error) {
      console.error("[v0] Error en handleEnviarMensaje:", error)
      const mensajeError: Mensaje = {
        id: (Date.now() + 2).toString(),
        texto: "Lo siento, ocurrió un error. Intenta de nuevo.",
        remitente: "bot",
        timestamp: new Date(),
      }
      setMensajes((prev) => [...prev, mensajeError])
    } finally {
      setCargando(false)
    }
  }

  // Manejar clic en opciones sugeridas
  const handleOpcion = (opcion: string) => {
    setInputMensaje(opcion)
    setTimeout(() => {
      const form = document.querySelector(".formulario-chat") as HTMLFormElement
      if (form) form.dispatchEvent(new Event("submit", { bubbles: true }))
    }, 0)
  }

  return (
    <>
      {/* Botón flotante del chatbot */}
      <button
        className={`boton-chatbot ${chatAbierto ? "abierto" : ""}`}
        onClick={() => setChatAbierto(!chatAbierto)}
        title="Abrir chat de asistencia"
        aria-label="Chat asistente"
      >
        {chatAbierto ? "✕" : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        )}
      </button>

      {/* Ventana del chat */}
      {chatAbierto && (
        <div className="ventana-chat">
          <div className="encabezado-chat">
            <h3>Asistente Agromercado</h3>
            <button className="boton-cerrar" onClick={() => setChatAbierto(false)} aria-label="Cerrar chat">
              ✕
            </button>
          </div>

          <div className="contenedor-mensajes" ref={contenedorMensajes}>
            {mensajes.map((mensaje) => (
              <div key={mensaje.id}>
                <div className={`mensaje ${mensaje.remitente === "usuario" ? "usuario" : "bot"}`}>
                  <div className="burbuja-mensaje">
                    <p>{mensaje.texto}</p>
                  </div>
                </div>
                {mensaje.opciones && (
                  <div className="opciones-sugeridas">
                    {mensaje.opciones.map((opcion, idx) => (
                      <button key={idx} className="opcion-boton" onClick={() => handleOpcion(opcion)}>
                        {opcion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {cargando && (
              <div className="mensaje bot">
                <div className="burbuja-mensaje">
                  <div className="indicador-escritura">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form className="formulario-chat" onSubmit={handleEnviarMensaje}>
            <input
              type="text"
              className="input-chat"
              placeholder="Escribe tu pregunta..."
              value={inputMensaje}
              onChange={(e) => setInputMensaje(e.target.value)}
              disabled={cargando}
            />
            <button type="submit" className="boton-enviar" disabled={cargando}>
              Enviar
            </button>
          </form>
        </div>
      )}
    </>
  )
}
