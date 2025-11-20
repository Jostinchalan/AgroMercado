"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import "./carrito.css"

// Interfaz para item del carrito
interface ItemCarrito {
  id: number
  nombre: string
  precio: number
  cantidad: number
  imagen: string
  categoria: string
}

// Página del carrito de compras
export default function Carrito() {
  const [items, setItems] = useState<ItemCarrito[]>([])
  const [total, setTotal] = useState(0)
  const [metodoPago, setMetodoPago] = useState("tarjeta")
  const [banco, setBanco] = useState("pichincha")
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [mostrarCargaComprobante, setMostrarCargaComprobante] = useState(false)
  const [verificandoTransferencia, setVerificandoTransferencia] = useState(false)
  const [transferenciaVerificada, setTransferenciaVerificada] = useState(false)
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null)

  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
  })

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito") || "[]")
    setItems(carritoGuardado)
    calcularTotal(carritoGuardado)
  }, [])

  const calcularTotal = (itemsList: ItemCarrito[]) => {
    const totalCalculado = itemsList.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
    setTotal(totalCalculado)
  }

  const actualizarCantidad = (id: number, categoria: string, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      eliminarProducto(id, categoria)
      return
    }

    const itemsActualizados = items.map((item) =>
      item.id === id && item.categoria === categoria ? { ...item, cantidad: nuevaCantidad } : item,
    )
    setItems(itemsActualizados)
    localStorage.setItem("carrito", JSON.stringify(itemsActualizados))
    calcularTotal(itemsActualizados)
    window.dispatchEvent(new Event("carritoActualizado"))
  }

  const eliminarProducto = (id: number, categoria: string) => {
    const itemsFiltrados = items.filter((item) => !(item.id === id && item.categoria === categoria))
    setItems(itemsFiltrados)
    localStorage.setItem("carrito", JSON.stringify(itemsFiltrados))
    calcularTotal(itemsFiltrados)
    window.dispatchEvent(new Event("carritoActualizado"))
  }

  const handleFormularioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const verificarTransferencia = () => {
    setVerificandoTransferencia(true)
    setMostrarCargaComprobante(true)

    setTimeout(() => {
      setVerificandoTransferencia(false)
      setTransferenciaVerificada(true)
    }, 5000)
  }

  const handleArchivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setArchivoSeleccionado(e.target.files[0])
    }
  }

  const procesarCompra = () => {
    if (
      !formulario.nombre ||
      !formulario.email ||
      !formulario.telefono ||
      !formulario.direccion ||
      !formulario.ciudad
    ) {
      alert("Por favor completa todos los campos del formulario")
      return
    }

    alert(
      `✓ Compra realizada exitosamente!\n\nMétodo de pago: ${
        metodoPago === "transferencia"
          ? `Transferencia - ${banco === "pichincha" ? "Banco Pichincha" : "Banco Guayaquil"}`
          : metodoPago === "efectivo"
            ? "Pago en efectivo"
            : "Tarjeta de crédito/débito"
      }\n\nTotal: $${total.toFixed(2)}\n\nGracias por tu compra, ${formulario.nombre}! nos contactaremos por su numero de celular para realizar la entrega`,
    )

    localStorage.removeItem("carrito")
    setItems([])
    setTotal(0)
    setFormulario({
      nombre: "",
      email: "",
      telefono: "",
      direccion: "",
      ciudad: "",
    })
    setMostrarFormulario(false)
    setMostrarCargaComprobante(false)
    setVerificandoTransferencia(false)
    setTransferenciaVerificada(false)
    setArchivoSeleccionado(null)
    window.dispatchEvent(new Event("carritoActualizado"))
  }

  if (items.length === 0 && !mostrarFormulario) {
    return (
      <div className="carrito-vacio">
        <div className="contenedor-vacio">
          <h2>🛒 Tu carrito está vacío</h2>
          <p>Aún no has agregado productos a tu carrito</p>
          <Link href="/productos" className="boton-primario">
            Continuar Comprando
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pagina-carrito">
      <div className="contenedor-principal-carrito">
        {!mostrarFormulario ? (
          <>
            <h1 className="titulo-carrito">Mi Carrito de Compras</h1>

            <div className="carrito-tabla-wrapper">
              <table className="tabla-carrito-mejorada">
                <thead>
                  <tr>
                    <th>PRODUCTO</th>
                    <th>PRECIO</th>
                    <th>CANTIDAD</th>
                    <th>PRECIO DESCUENTO</th>
                    <th>TOTAL</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={`${item.id}-${item.categoria}`}>
                      <td className="producto-info-td">
                        <div className="producto-info-flex">
                          <img
                            src={item.imagen || "/placeholder.svg"}
                            alt={item.nombre}
                            className="producto-imagen-mini"
                          />
                          <span className="producto-nombre-td">{item.nombre}</span>
                        </div>
                      </td>
                      <td className="precio-td">${item.precio.toFixed(2)}</td>
                      <td className="cantidad-td">
                        <div className="cantidad-controlador">
                          <button
                            className="btn-cantidad-mini"
                            onClick={() => actualizarCantidad(item.id, item.categoria, item.cantidad - 1)}
                          >
                            −
                          </button>
                          <span className="cantidad-valor">{item.cantidad}</span>
                          <button
                            className="btn-cantidad-mini"
                            onClick={() => actualizarCantidad(item.id, item.categoria, item.cantidad + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="descuento-td">-</td>
                      <td className="total-td">${(item.precio * item.cantidad).toFixed(2)}</td>
                      <td className="eliminar-td">
                        <button
                          className="btn-eliminar-icono"
                          onClick={() => eliminarProducto(item.id, item.categoria)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="resumen-compra-box">
              <h2 className="titulo-resumen">TOTAL</h2>

              <div className="linea-resumen">
                <span>Subtotal:</span>
                <span className="valor-resumen">${total.toFixed(2)}</span>
              </div>

              <div className="linea-resumen">
                <span>IVA 0%:</span>
                <span className="valor-resumen">$ 0.00</span>
              </div>

              <div className="separador-resumen"></div>

              <div className="linea-resumen total-line">
                <span>Total:</span>
                <span className="valor-total">${total.toFixed(2)}</span>
              </div>

              <button className="boton-proceso-compra" onClick={() => setMostrarFormulario(true)}>
                PROCESO DE COMPRA
              </button>

              <div className="nota-resumen">
                <p>* Productos exentos de IVA.</p>
                <p>* Costo del envío: $2.99</p>
                <p>* Envíos gratuitos por compras superiores a $30.00</p>
                <p>* Puedes pagar con las siguientes tarjetas:</p>
                <div className="tarjetas-iconos">
                  <span>💳 VISA</span>
                  <span>💳 Mastercard</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Formulario de pago */
          <div className="formulario-pago">
            <div className="contenedor-formulario">
              <h2>Información de Facturación</h2>

              <form className="form-datos" onSubmit={(e) => e.preventDefault()}>
                <div className="grupo-formulario">
                  <label htmlFor="nombre">Nombre Completo *</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formulario.nombre}
                    onChange={handleFormularioChange}
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>

                <div className="grupo-formulario">
                  <label htmlFor="email">Correo Electrónico *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formulario.email}
                    onChange={handleFormularioChange}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div className="grupo-formulario">
                  <label htmlFor="telefono">Teléfono *</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formulario.telefono}
                    onChange={handleFormularioChange}
                    placeholder="+593 9 12345678"
                    required
                  />
                </div>

                <div className="grupo-formulario">
                  <label htmlFor="direccion">Dirección *</label>
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={formulario.direccion}
                    onChange={handleFormularioChange}
                    placeholder="Calle, número y referencias"
                    required
                  />
                </div>

                <div className="grupo-formulario">
                  <label htmlFor="ciudad">Ciudad *</label>
                  <input
                    type="text"
                    id="ciudad"
                    name="ciudad"
                    value={formulario.ciudad}
                    onChange={handleFormularioChange}
                    placeholder="Tu ciudad"
                    required
                  />
                </div>
              </form>

              <div className="seccion-pago">
                <h3>Método de Pago</h3>

                <div className="opciones-pago">
                  <label className="opcion-pago">
                    <input
                      type="radio"
                      name="metodo"
                      value="tarjeta"
                      checked={metodoPago === "tarjeta"}
                      onChange={(e) => setMetodoPago(e.target.value)}
                    />
                    <span className="icono-pago"></span>
                    <span className="texto-pago">Tarjeta de Crédito/Débito</span>
                  </label>

                  <label className="opcion-pago">
                    <input
                      type="radio"
                      name="metodo"
                      value="efectivo"
                      checked={metodoPago === "efectivo"}
                      onChange={(e) => setMetodoPago(e.target.value)}
                    />
                    <span className="icono-pago"></span>
                    <span className="texto-pago">Pago en Efectivo</span>
                  </label>

                  <label className="opcion-pago">
                    <input
                      type="radio"
                      name="metodo"
                      value="transferencia"
                      checked={metodoPago === "transferencia"}
                      onChange={(e) => setMetodoPago(e.target.value)}
                    />
                    <span className="icono-pago"></span>
                    <span className="texto-pago">Transferencia Bancaria</span>
                  </label>
                </div>

                {metodoPago === "transferencia" && (
                  <div className="seccion-transferencia">
                    <h4>Datos de Transferencia Bancaria</h4>

                    <div className="contenedor-bancos">
                      <label className="opcion-banco-mejorada">
                        <input
                          type="radio"
                          name="banco"
                          value="pichincha"
                          checked={banco === "pichincha"}
                          onChange={(e) => setBanco(e.target.value)}
                        />
                        <div className="contenido-banco">
                          <span className="nombre-banco">Banco Pichincha</span>
                          <div className="datos-banco">
                            <p>
                              <strong>Titular:</strong> Agromercado S.A.
                            </p>
                            <p>
                              <strong>Cuenta Corriente:</strong> 2101-1234567890
                            </p>
                            <p>
                              <strong>RUC:</strong> 1792345678001
                            </p>
                          </div>
                        </div>
                      </label>

                      <label className="opcion-banco-mejorada">
                        <input
                          type="radio"
                          name="banco"
                          value="guayaquil"
                          checked={banco === "guayaquil"}
                          onChange={(e) => setBanco(e.target.value)}
                        />
                        <div className="contenido-banco">
                          <span className="nombre-banco">Banco de Guayaquil</span>
                          <div className="datos-banco">
                            <p>
                              <strong>Titular:</strong> Agromercado S.A.
                            </p>
                            <p>
                              <strong>Cuenta Corriente:</strong> 0123-456789012
                            </p>
                            <p>
                              <strong>RUC:</strong> 1792345678001
                            </p>
                          </div>
                        </div>
                      </label>
                    </div>

                    {!transferenciaVerificada && (
                      <div className="seccion-comprobante">
                        <h5>Subir Comprobante de Transferencia</h5>
                        <label className="input-archivo">
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={handleArchivoChange}
                            disabled={verificandoTransferencia}
                          />
                          <span className="texto-archivo">
                            {archivoSeleccionado ? archivoSeleccionado.name : "Selecciona un archivo (imagen o PDF)"}
                          </span>
                        </label>

                        {verificandoTransferencia && (
                          <div className="estado-verificacion verificando">
                            <div className="spinner"></div>
                            <p>Verificando transferencia... Por favor espera</p>
                          </div>
                        )}

                        {transferenciaVerificada && (
                          <div className="estado-verificacion verificado">
                            <span className="checkmark">✓</span>
                            <p>Su transferencia bancaria ha sido verificada</p>
                          </div>
                        )}

                        <button
                          className="boton-verificar"
                          onClick={verificarTransferencia}
                          disabled={!archivoSeleccionado || verificandoTransferencia || transferenciaVerificada}
                        >
                          {verificandoTransferencia ? "Verificando..." : "Verificar Transferencia"}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {metodoPago === "tarjeta" && (
                  <div className="formulario-tarjeta">
                    <div className="grupo-formulario">
                      <label>Número de Tarjeta (Simulación)</label>
                      <input type="text" placeholder="1234 5678 9012 3456" maxLength={19} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                      <div className="grupo-formulario">
                        <label>Vencimiento</label>
                        <input type="text" placeholder="MM/AA" maxLength={5} />
                      </div>
                      <div className="grupo-formulario">
                        <label>CVV</label>
                        <input type="text" placeholder="123" maxLength={3} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="resumen-final">
                <h3>Resumen de tu Compra</h3>
                <div className="detalles-final">
                  <p>
                    <strong>Subtotal:</strong> ${total.toFixed(2)}
                  </p>
                  <p>
                    <strong>Impuesto (12%):</strong> ${(total * 0.12).toFixed(2)}
                  </p>
                  <p>
                    <strong>Envío:</strong> $2.00
                  </p>
                  <p className="total-final">
                    <strong>Total a Pagar:</strong> <span>${(total * 1.12 + 2).toFixed(2)}</span>
                  </p>
                </div>
              </div>

              <div className="botones-finales">
                <button className="boton-procesar" onClick={procesarCompra}>
                  ✓ Completar Compra
                </button>
                <button className="boton-atras" onClick={() => setMostrarFormulario(false)}>
                  ← Volver al Carrito
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
