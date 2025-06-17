import "pixi.js/unsafe-eval"
import "./static/stylesheets/main.css"
import "@/App"

/* ***** ***** ***** ***** plugin hooks ***** ***** ***** ***** */
import setupPixiJS from "@/plugins/setupPixiJS"
import setupPrimeUI from "@/plugins/setupPrimeUI"
import setupThreeJS from "@/plugins/setupThreeJS"

/* ***** ***** ***** ***** primereact css ***** ***** ***** ***** */
import "primereact/resources/themes/viva-light/theme.css"
import "primereact/resources/themes/viva-dark/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"

void (async function AppInit(): Promise<void> {
  await setupPrimeUI()
  setupPixiJS()
  setupThreeJS()
  // enableWindowMessagesListener(messageListener)
})()
