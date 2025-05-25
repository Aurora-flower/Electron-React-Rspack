import { TRIGGER_CHANNEL_NAME } from "@/common/macro"
import { dispatch } from "@/helpers/event/electron"
import { PRIME_REACT_OPTIONS } from "@/plugins/setupPrimeUI"
import AppRouter from "@/routers"
import store from "@/stores"
import StoreManager from "@/stores/manager"
import { appSliceActions } from "@/stores/reducers/app"
import { getRootElement } from "@/utils/dom"
import { PrimeReactProvider } from "primereact/api"
import * as React from "react"
import type { JSX } from "react"
import { createRoot } from "react-dom/client"
import { useDispatch } from "react-redux"
import { Provider } from "react-redux"

// import type { ReactNode } from "react"
// React.CSSProperties
// React.ReactNode | React.ReactElement

function App(): JSX.Element {
  // const information = useSelector((state: RootState) => state.app.information)
  const dispatchStore = useDispatch()
  // const [getAppInfo, setAppInfo] = React.useState<AppInfoModel | null>(null)
  const { setInformation } = appSliceActions

  dispatch(TRIGGER_CHANNEL_NAME.APP_INFO as TriggerChannelName).then(value => {
    StoreManager.setAppInfo(value as AppInfoModel)
    dispatchStore(setInformation(value))
  })

  React.useEffect(() => {
    return (): void => {
      StoreManager.setAppInfo(null)
    }
  }, [])

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
  createRoot(rootElement).render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}

AppRender()
