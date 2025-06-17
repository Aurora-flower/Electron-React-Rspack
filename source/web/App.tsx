import { TRIGGER_CHANNEL_NAME } from "@/common/macro"
import { getRootElement } from "@/features/document"
import { dispatch } from "@/helpers/event/electron"
import { PRIME_REACT_OPTIONS } from "@/plugins/setupPrimeUI"
import AppRouter from "@/routers"
import store from "@/stores"
import StoreManager from "@/stores/manager"
import { appSliceActions } from "@/stores/reducers/app"
import { PrimeReactProvider } from "primereact/api"
import * as React from "react"
import type { JSX } from "react"
import { createRoot } from "react-dom/client"
import { useDispatch } from "react-redux"
import { Provider } from "react-redux"

// import type { ReactNode, ReactElement } from "react"
// React.CSSProperties
// React 思想：每个组件都是独立的，一个完整的应用是由一个个组件组成的，并让数据流在组件之间进行传递、运行起来。

function App(): JSX.Element {
  const dispatchStore = useDispatch()

  React.useEffect(() => {
    dispatch(TRIGGER_CHANNEL_NAME.APP_INFO as TriggerChannelName).then(
      value => {
        StoreManager.setAppInfo(value as AppInfoModel)
        dispatchStore(appSliceActions.setInformation(value))
      }
    )
    return (): void => {
      StoreManager.setAppInfo(null)
    }
  }, [dispatchStore])

  return (
    <PrimeReactProvider value={PRIME_REACT_OPTIONS}>
      <React.StrictMode>
        <AppRouter />
      </React.StrictMode>
    </PrimeReactProvider>
  )
}

void (function AppRender(): void {
  const root = "#root"
  const rootElement = getRootElement(root)
  if (!rootElement) {
    return
  }
  createRoot(rootElement).render(
    <Provider store={store}>
      <App />
    </Provider>
  )
})()
