import { PRIME_REACT_OPTIONS } from "@/plugins/setupPrimeUI"
import AppRouter from "@/routers"
import { getRootElement } from "@/utils/mod/dom"
import { PrimeReactProvider } from "primereact/api"
import * as React from "react"
import { createRoot } from "react-dom/client"

// import type { ReactNode } from "react"
// React.CSSProperties
// React.ReactNode | React.ReactElement

function App() {
  return (
    <PrimeReactProvider value={PRIME_REACT_OPTIONS}>
      <React.StrictMode>
        <AppRouter />
      </React.StrictMode>
    </PrimeReactProvider>
  )
}

function AppRender() {
  const root = "#root"
  const rootElement = getRootElement(root)
  if (!rootElement) {
    return
  }
  createRoot(rootElement).render(<App />)
}

AppRender()
