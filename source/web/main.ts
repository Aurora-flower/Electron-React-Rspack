import "pixi.js/unsafe-eval"
import "./assets/stylesheets/main.css"
import "@/App"
import debug from "@/debug"
import { messageListener } from "@/helpers/event/listener"

/* ***** ***** plugin hooks ***** ***** */
import setupPixi from "@/plugins/setupPixi"
import setupPrimeUI from "@/plugins/setupPrimeUI"

/* ***** ***** primereact css ***** ***** */
import "primereact/resources/themes/viva-light/theme.css"
import "primereact/resources/themes/viva-dark/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"

/* ***** ***** primereact css ***** ***** */
import * as THREE from "three"

new THREE.MeshBasicMaterial({
  color: 0xff0000 //0xff0000设置材质颜色为红色
})

messageListener()

async function AppInit() {
  await setupPrimeUI()
  setupPixi()
}
AppInit().then(() => {
  setTimeout(() => debug(), 1000)
})
