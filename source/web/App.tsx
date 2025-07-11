import { PrimeReactProvider } from "primereact/api"
import type { JSX } from "react"
import * as React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { TRIGGER_CHANNEL_NAME } from "@/common/macro"
import { queryElement } from "@/features/document/dom-utils/query"
import { dispatch } from "@/helpers/event/electron"
import { PRIME_REACT_OPTIONS } from "@/plugins/setupPrimeUI"
import AppRouter from "@/routers"
import store from "@/stores"
import { useAppDispatch } from "@/stores/hooks"
import { setInformation } from "@/stores/reducers/app"

/**
 * React.CSSProperties React.ReactNode React.ReactElement
 * @remarks React 思想：每个组件都是独立的，一个完整的应用是由一个个组件组成的，并让数据流在组件之间进行传递、运行起来。
 */
function App(): JSX.Element {
  const dispatchStore = useAppDispatch()

  React.useEffect(() => {
    dispatch(TRIGGER_CHANNEL_NAME.APP_INFO as TriggerChannelName).then(
      value => {
        dispatchStore(setInformation(value))
      }
    )
    return (): void => {}
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
  const rootElement = queryElement("#root", "selector")
  if (rootElement) {
    createRoot(rootElement).render(
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
})()
