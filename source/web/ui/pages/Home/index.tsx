import { useAppSelector } from "@/stores/hooks"
import { webLog } from "@/utils/log"
import * as React from "react"
import type { JSX } from "react"

function Home(): JSX.Element {
  const information = useAppSelector(state => state.app.information)
  React.useEffect(() => {
    webLog("Home", "Information", information)
  }, [information])
  return (
    <div>
      <div>主页</div>
      <div>ThreeJS</div>
      <div>PixiJS</div>
      <div>Canvas 2D</div>
      <div>Canvas 3D - WebGL</div>
    </div>
  )
}

export default Home
