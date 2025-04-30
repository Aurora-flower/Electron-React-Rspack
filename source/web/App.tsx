import { getRootElement } from "@/helpers/function/dom"
import * as React from "react"
// import AppRouter from '@/router';
import { createRoot } from "react-dom/client"

// React.CSSProperties
// React.ReactNode | React.ReactElement

function App() {
  // <AppRouter></AppRouter>
  return (
    <React.StrictMode>
      <div className="root-wrapper">
        <div id="pixi-container" />
      </div>
    </React.StrictMode>
  )
}

function AppRender() {
  const root = "#root"
  const rootElement = getRootElement(root)
  console.log("rootElement", rootElement)
  if (!rootElement) {
    return
  }
  createRoot(rootElement).render(<App />)
}

AppRender()
