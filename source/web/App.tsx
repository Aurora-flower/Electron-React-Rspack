import { getRootElement } from "@/helpers/function/dom"
import { type APIOptions, PrimeReactProvider } from "primereact/api"
import { Button } from "primereact/button"
import * as React from "react"
// import AppRouter from '@/router';
import { createRoot } from "react-dom/client"

// React.CSSProperties
// React.ReactNode | React.ReactElement
const PRIME_REACT_OPTIONS: Partial<APIOptions> = {
  ripple: true
}

function App() {
  // <AppRouter></AppRouter>
  return (
    <PrimeReactProvider value={PRIME_REACT_OPTIONS}>
      <React.StrictMode>
        <div className="root-wrapper">
          <div id="pixi-container" />
          {/* <div className="animate__animated text-green-200 animate__bounce">
          HELLO WORLD
        </div> */}
          <Button label="Check" icon="pi pi-check" />
        </div>
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
