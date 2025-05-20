import PixiManager from "@/helpers/render/gremlin/manager"
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import * as React from "react"
import type { JSX } from "react"

function Graphics(): JSX.Element {
  PixiManager.getApp()
  return (
    <div className="grphics page-base">
      <div id="graphics" />
    </div>
  )
}

export default Graphics
