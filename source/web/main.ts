import "pixi.js/unsafe-eval"
import "./assets/stylesheets/main.css"
import "@/App"
import { messageListener } from "@/helpers/event/listener/message"

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

/* ***** ***** ***** ***** primereact css ***** ***** ***** ***** */
import * as THREE from "three"

new THREE.MeshBasicMaterial({
  color: 0xff0000 //0xff0000设置材质颜色为红色
})

messageListener()

void (async function AppInit(): Promise<void> {
  await setupPrimeUI()
  setupPixiJS()
  setupThreeJS()
})()
