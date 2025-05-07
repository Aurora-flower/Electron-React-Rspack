import AppRouter from "@/routers"
import { getRootElement } from "@/utils/mod/dom"
import { type APIOptions, PrimeReactProvider } from "primereact/api"
import * as React from "react"
import { createRoot } from "react-dom/client"

// React.CSSProperties
// React.ReactNode | React.ReactElement
const PRIME_REACT_OPTIONS: Partial<APIOptions> = {
  ripple: true
}

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
