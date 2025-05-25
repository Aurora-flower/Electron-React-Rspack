import { TRIGGER_CHANNEL_NAME } from "@/common/macro"
import { dispatch } from "@/helpers/event/electron"
import { PRIME_REACT_OPTIONS } from "@/plugins/setupPrimeUI"
import AppRouter from "@/routers"
import { getRootElement } from "@/utils/dom"
import { webLog } from "@/utils/log"
import { PrimeReactProvider } from "primereact/api"
import * as React from "react"
import type { JSX } from "react"
import { createRoot } from "react-dom/client"

// import type { ReactNode } from "react"
// React.CSSProperties
// React.ReactNode | React.ReactElement

function App(): JSX.Element {
  const [getAppInfo, setAppInfo] = React.useState<AppInfoModel | null>(null)

  React.useEffect(() => {
    dispatch(TRIGGER_CHANNEL_NAME.APP_INFO as TriggerChannelName).then(
      value => {
        setAppInfo(value as AppInfoModel)
      }
    )
    return (): void => {
      setAppInfo(null)
    }
  }, [])

  webLog("App", "info", "App is running...", getAppInfo)

  return (
    <PrimeReactProvider value={PRIME_REACT_OPTIONS}>
      <React.StrictMode>
        <AppRouter />
      </React.StrictMode>
    </PrimeReactProvider>
  )
}

function AppRender(): void {
  const root = "#root"
  const rootElement = getRootElement(root)
  if (!rootElement) {
    return
  }
  createRoot(rootElement).render(<App />)
}

AppRender()
