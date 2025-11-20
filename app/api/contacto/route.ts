import nodemailer from "nodemailer"

// Configuración del transportador de correo SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function POST(request: Request) {
  try {
    const { nombre, apellido, email, telefono, mensaje } = await request.json()

    // Validar campos requeridos
    if (!nombre || !apellido || !email || !telefono || !mensaje) {
      return Response.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    const contenidoCorreo = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Agromercado - Confirmación de Contacto</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f0f0f0; font-family: 'Arial', sans-serif;">
      <div style="max-width: 600px; margin: 20px auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
        
        <!-- ENCABEZADO CON LOGO Y GRADIENTE -->
        <div style="background: linear-gradient(135deg, #2d5016 0%, #3d6b1f 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold; letter-spacing: 0.5px;">Agromercado</h1>
          <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0 0; font-size: 13px; letter-spacing: 0.3px;">Tu aliado en productos agrícolas de calidad</p>
        </div>

        <!-- CONTENIDO PRINCIPAL -->
        <div style="padding: 45px 35px; background-color: #fafafa;">
          
          <!-- SALUDO PERSONALIZADO -->
          <h2 style="color: #2d5016; margin: 0 0 10px 0; font-size: 24px; font-weight: bold;">¡Hola ${nombre}!</h2>
          <p style="color: #666; margin: 0 0 25px 0; font-size: 13px;">Nos alegra mucho tu contacto</p>
          
          <!-- MENSAJE PRINCIPAL -->
          <p style="color: #444; margin: 0 0 20px 0; line-height: 1.8; font-size: 14px;">
            Agradecemos sinceramente tu interés en <strong style="color: #2d5016;">Agromercado</strong>. Hemos recibido tu mensaje de contacto y nos complace informarte que tu consulta ha sido registrada exitosamente en nuestro sistema.
          </p>

          <!-- CUADRO CON EL MENSAJE DEL CLIENTE -->
          <div style="background: white; border-left: 5px solid #2d5016; padding: 20px; margin: 30px 0; border-radius: 6px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
            <p style="margin: 0 0 12px 0; color: #999; font-size: 11px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;">📝 Tu Mensaje</p>
            <p style="margin: 0; color: #333; font-style: italic; line-height: 1.7; font-size: 14px;">
              "${mensaje}"
            </p>
          </div>

          <!-- INFORMACIÓN SOBRE AGROMERCADO -->
          <div style="background: #e8f5e9; padding: 22px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #2d5016;">
            <p style="margin: 0 0 12px 0; color: #2d5016; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 0.3px;">Sobre Agromercado</p>
            <p style="color: #555; margin: 0; line-height: 1.7; font-size: 13px;">
              Somos tu proveedor de confianza en productos agrícolas, acuícolas, ganaderos y pesqueros de la más alta calidad. Contamos con una amplia variedad de productos frescos y de excelencia para satisfacer todas tus necesidades.
            </p>
          </div>

          <!-- PRÓXIMOS PASOS -->
          <div style="background: #fff3cd; padding: 22px; border-radius: 8px; margin: 30px 0;">
            <p style="margin: 0 0 15px 0; color: #856404; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 0.3px;">⏭️ ¿Qué sucede ahora?</p>
            <ul style="margin: 0; padding-left: 20px; color: #666; font-size: 13px; line-height: 1.8;">
              <li style="margin: 8px 0;">Nuestro equipo revisará tu consulta con atención</li>
              <li style="margin: 8px 0;">Nos comunicaremos contigo pronto al número o correo proporcionado</li>
              <li style="margin: 8px 0;">Responderemos todas tus preguntas sobre nuestros productos</li>
            </ul>
          </div>

          <!-- DATOS DE CONTACTO RÁPIDO -->
          <div style="background: white; padding: 25px; border-radius: 8px; border: 1px solid #e0e0e0; margin: 30px 0;">
            <p style="margin: 0 0 20px 0; color: #2d5016; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 0.3px;">📍 Puedes contactarnos directamente:</p>
            
            <div style="margin: 18px 0; padding-bottom: 18px; border-bottom: 1px solid #f0f0f0;">
              <p style="margin: 0 0 8px 0; color: #2d5016; font-weight: bold; font-size: 12px;">Ubicación</p>
              <p style="margin: 0; color: #555; font-size: 12px; line-height: 1.6;">
                Cdla. Los Vergeles Calle 23A Dr.<br/>
                Carlos Julio Arosemena, No 1-6-7<br/>
                Intersección Av. 38C Mz 263<br/>
                Guayaquil, Ecuador
              </p>
            </div>

            <div style="margin: 18px 0; padding-bottom: 18px; border-bottom: 1px solid #f0f0f0;">
              <p style="margin: 0 0 8px 0; color: #2d5016; font-weight: bold; font-size: 12px;">Teléfono</p>
              <p style="margin: 0; color: #333; font-size: 13px; font-weight: bold;">+593 980601562</p>
            </div>

            <div style="margin: 18px 0;">
              <p style="margin: 0 0 8px 0; color: #2d5016; font-weight: bold; font-size: 12px;">Correo</p>
              <p style="margin: 0; color: #333; font-size: 13px; font-weight: bold;">info@agromercado.com</p>
            </div>
          </div>

          <!-- INFORMACIÓN DEL CLIENTE (para referencia) -->
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <p style="margin: 0 0 15px 0; color: #666; font-size: 12px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.3px;">Información que nos proporcionaste:</p>
            <ul style="margin: 0; padding-left: 20px; color: #555; font-size: 12px; line-height: 1.8;">
              <li><strong>Nombre:</strong> ${nombre} ${apellido}</li>
              <li><strong>Correo:</strong> ${email}</li>
              <li><strong>Teléfono:</strong> ${telefono}</li>
            </ul>
          </div>

          <!-- DESPEDIDA -->
          <div style="margin-top: 35px; padding-top: 25px; border-top: 2px solid #e0e0e0;">
            <p style="color: #555; margin: 0 0 15px 0; line-height: 1.6; font-size: 14px;">
              Saludos cordiales,
            </p>
            <p style="color: #2d5016; margin: 0 0 5px 0; font-weight: bold; font-size: 15px;">
              Equipo de Agromercado
            </p>
            <p style="color: #999; margin: 0; font-style: italic; font-size: 12px;">
              "Tu aliado en productos agrícolas de calidad"
            </p>
          </div>
        </div>

        <!-- FOOTER -->
        <div style="background-color: #f5f5f5; padding: 25px; text-align: center; border-top: 1px solid #e0e0e0;">
          <p style="color: #999; margin: 0 0 8px 0; font-size: 11px; line-height: 1.6;">
            Este es un correo automático de confirmación enviado por nuestro sistema de contacto.<br/>
            Por favor, no respondas a este correo. Usa los datos de contacto anteriores.
          </p>
          <p style="color: #bbb; margin: 12px 0 0 0; font-size: 10px;">
            © 2025 Agromercado. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </body>
    </html>
    `

    // Enviar correo al cliente
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `¡Hola ${nombre}! Agromercado ha recibido tu mensaje`,
      html: contenidoCorreo,
    })

    if (process.env.EMAIL_ADMIN) {
      const contenidoAdministracion = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Nuevo Contacto - Agromercado</title>
      </head>
      <body style="margin: 0; padding: 20px; background-color: #f0f0f0; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #2d5016 0%, #3d6b1f 100%); padding: 25px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 20px;">📧 Nuevo Contacto Recibido</h1>
          </div>
          
          <div style="padding: 30px;">
            <p style="color: #333; margin: 0 0 20px 0;"><strong>Cliente:</strong> ${nombre} ${apellido}</p>
            <p style="color: #333; margin: 0 0 20px 0;"><strong>Correo:</strong> ${email}</p>
            <p style="color: #333; margin: 0 0 20px 0;"><strong>Teléfono:</strong> ${telefono}</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #2d5016; margin: 25px 0;">
              <p style="margin: 0 0 10px 0; color: #666; font-weight: bold;">Mensaje del cliente:</p>
              <p style="margin: 0; color: #333; line-height: 1.6;">${mensaje}</p>
            </div>
            
            <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
              Este es un correo automático del formulario de contacto de Agromercado
            </p>
          </div>
        </div>
      </body>
      </html>
      `

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_ADMIN,
        subject: `Nuevo contacto: ${nombre} ${apellido}`,
        html: contenidoAdministracion,
      })
    }

    return Response.json({ success: true, message: "Correo enviado exitosamente" }, { status: 200 })
  } catch (error) {
    console.error("Error enviando correo:", error)
    return Response.json({ error: "Error al enviar el correo" }, { status: 500 })
  }
}
