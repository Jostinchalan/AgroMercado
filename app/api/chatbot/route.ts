import { type NextRequest, NextResponse } from "next/server"
import { todosLosProductos } from "@/lib/productos-database"

export async function POST(request: NextRequest) {
  try {
    const { mensaje, historialMensajes } = await request.json()

    if (!mensaje || typeof mensaje !== "string" || mensaje.trim().length === 0) {
      return NextResponse.json({ error: "Mensaje inválido" }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey || apiKey.trim().length === 0) {
      console.error("[v0] ❌ OPENAI_API_KEY no configurada o está vacía")
      console.error("[v0] Valores de env:", {
        hasKey: !!process.env.OPENAI_API_KEY,
        keyLength: process.env.OPENAI_API_KEY?.length || 0,
        keyPrefix: process.env.OPENAI_API_KEY?.substring(0, 5) || "MISSING",
      })
      return NextResponse.json(
        {
          error: "API Key no configurada",
          details: "OPENAI_API_KEY falta en .env.local",
        },
        { status: 500 }
      )
    }

    const productosLista = todosLosProductos
      .map((p) => `${p.nombre}: $${p.precio} (${p.peso || p.cantidad || "unidad"})`)
      .join(", ")

    const systemPrompt = `Eres un asistente de Agromercado, tienda ecuatoriana de productos agrícolas frescos.
Ubicación: Guayaquil, Ecuador
Teléfono: 1800-farmagro (+593 980601562)
Email: info@agromercado.com
Horario: 24/7
Sitio Web: www.agromercado.com

TODOS LOS PRODUCTOS DISPONIBLES: ${productosLista}

INSTRUCCIONES CRÍTICAS:
1. Tienes acceso a TODOS los productos de las siguientes secciones:
   - ACUÍCOLAS: Tilapia, Trucha, Camarones, Ostras, Calamares, Mojarra, etc.
   - PESQUEROS: Atún, Salmón, Lenguado, Pez Espada, Anchova, Sardinas, Mero, etc.
   - GANADEROS: Carnes (res, pollo, cerdo), Leche, Queso, Huevos, Jamón, Yogur, etc.
   - VEGETALES: Frutas y verduras frescas como tomate, lechuga, brócoli, manzana, plátano, etc.

2. BÚSQUEDA DE PRODUCTOS: Cuando pregunten por un producto específico, busca en TODAS las categorías, no solo acuícolas.

3. Sé amable, profesional y conciso (máx 150 palabras)

4. Si el usuario pide agregar un producto al carrito, responde:
   "Perfecto, agregué [nombre exacto del producto] a tu carrito ✓"
   En nueva línea: CARRITO:[nombre_producto_exacto]

5. Responde honestamente si un producto no existe en el inventario

6. Siempre responde en español`

    const messages: Array<{ role: "user" | "assistant"; content: string }> = []

    if (Array.isArray(historialMensajes) && historialMensajes.length > 0) {
      const ultimosMensajes = historialMensajes.slice(-4)
      for (const msg of ultimosMensajes) {
        if (msg.role && msg.content) {
          messages.push({
            role: msg.role === "assistant" ? "assistant" : "user",
            content: msg.content,
          })
        }
      }
    }

    messages.push({
      role: "user",
      content: mensaje,
    })

    console.log("[v0] ✅ Enviando a OpenAI con", messages.length, "mensajes")

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey.trim()}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          ...messages,
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    })

    console.log("[v0] Respuesta OpenAI status:", openaiResponse.status)

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json().catch(() => ({ error: "Error desconocido" }))
      console.error("[v0] ❌ Error OpenAI:", openaiResponse.status, errorData)
      return NextResponse.json(
        {
          error: `Error con OpenAI: ${openaiResponse.status}`,
          details: errorData.error?.message || "Verifica tu API key",
        },
        { status: 500 }
      )
    }

    const data = await openaiResponse.json()

    if (!data.choices?.[0]?.message?.content) {
      console.error("[v0] ❌ Estructura inválida de OpenAI:", data)
      return NextResponse.json({ error: "Respuesta inválida de OpenAI" }, { status: 500 })
    }

    const respuesta = data.choices[0].message.content.trim()
    let accionCarrito = null

    const lineas = respuesta.split("\n")
    let respuestaFinal = respuesta

    for (const linea of lineas) {
      if (linea.includes("CARRITO:")) {
        const nombreProducto = linea.replace("CARRITO:", "").trim()
        console.log("[v0] Buscando producto:", nombreProducto)

        const productoEncontrado = todosLosProductos.find(
          (p) =>
            p.nombre.toLowerCase().includes(nombreProducto.toLowerCase()) ||
            nombreProducto.toLowerCase().includes(p.nombre.toLowerCase()),
        )

        if (productoEncontrado) {
          console.log("[v0] ✅ Producto encontrado:", productoEncontrado.nombre)
          accionCarrito = {
            tipo: "agregar",
            producto: {
              id: productoEncontrado.id,
              nombre: productoEncontrado.nombre,
              precio: productoEncontrado.precio,
              categoria: productoEncontrado.categoria,
              peso: productoEncontrado.peso,
              cantidad: 1,
            },
          }
          respuestaFinal = respuestaFinal.replace(linea, "").trim()
        }
      }
    }

    return NextResponse.json({
      respuesta: respuestaFinal || "No pude procesar tu mensaje",
      success: true,
      accionCarrito: accionCarrito,
    })
  } catch (error) {
    console.error("[v0] ❌ Error en chatbot:", error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      { error: "Error interno del servidor", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
