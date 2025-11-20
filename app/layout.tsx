import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/componentes/Navegacion/Navbar"
import Footer from "@/componentes/Pie/Footer"
import Chatbot from "@/componentes/Chatbot/Chatbot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Agromercado - Productos Agrícolas de Calidad",
  description: "Plataforma de venta de productos acuícolas, pesqueros, ganaderos y vegetales",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        {/* Agregar chatbot a todas las páginas */}
        <Chatbot />
      </body>
    </html>
  )
}
