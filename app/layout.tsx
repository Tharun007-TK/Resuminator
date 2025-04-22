import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

export const metadata = {
  title: "Resume Builder",
  description: "Build and customize your professional resume",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.6/purify.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
