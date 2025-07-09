import { Card } from "primereact/card"
import type { JSX } from "react"
import * as React from "react"
import { NavLink } from "react-router-dom"
import useClassNames from "@/hooks/useClassNames"
import { useAppSelector } from "@/stores/hooks"
import { getRandomColor } from "@/utils/functions/color"
import { webLog } from "@/utils/log"

// import { Button, Toast } from "@douyinfe/semi-ui"

interface CardInfoModel {
  label: string
  route?: string
}

function CardItem<T extends CardInfoModel>(prop: T): JSX.Element {
  return (
    <Card title={prop.label} className="overflow-auto scrollbar-hide">
      <p className="m-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis illo
        porro distinctio quam vel quo, fuga reiciendis inventore labore quos eum
        eveniet enim eos nesciunt nobis sapiente ducimus quod delectus?
      </p>
      <div className="flex justify-end">
        <NavLink
          to={prop.route ?? "/"}
          className={({ isActive }) =>
            isActive ? "text-red-500" : "text-black"
          }
        >
          跳转
        </NavLink>
      </div>
    </Card>
  )
}

function CardList(): JSX.Element {
  const cardListInfo: Array<CardInfoModel> = [
    {
      label: "ThreeJS"
    },
    {
      label: "PixiJS",
      route: "/graphics"
    },
    {
      label: "Canvas(2D)"
    },
    {
      label: "Canvas(3D WebGL)"
    },
    {
      label: "WebAssembly"
    },
    {
      label: "React"
    },
    {
      label: "Vue"
    },
    {
      label: "Konva"
    },
    {
      label: "CSS"
    },
    {
      label: "CSS Animation"
    },
    {
      label: "Music"
    },
    {
      label: "TODO"
    },
    {
      label: "Voyage"
    },
    {
      label: "Get Job"
    },
    {
      label: "Python Speader"
    },
    {
      label: "Rust"
    },
    {
      label: "C++"
    },
    {
      label: "C#"
    }
  ]
  return (
    <div
      className={useClassNames([
        "card-list",
        "h-full overflow-y-auto",
        "flex flex-wrap",
        "justify-start"
      ])}
    >
      {cardListInfo.map(item => (
        <div
          className={[
            "card-wrap scrollbar-hide",
            "w-[calc(25%-2rem)] h-[calc(25%-2rem)]",
            "overflow-y-auto",
            "m-[1rem]"
          ].join(" ")}
          key={getRandomColor()}
        >
          <CardItem {...item} />
        </div>
      ))}
    </div>
  )
}

function Home(): JSX.Element {
  const information = useAppSelector(state => state.app.information)
  React.useEffect(() => {
    webLog("Home", "Information", information)
  }, [information])

  // TODO: 做个入口页面 - 进入 ThreeJS | PixiJS | Canvas | WebGL | WebAssembly | WebSocket | WebRTC | WebSocket 示例界面

  return (
    <div className="page-base">
      <CardList />
    </div>
  )
}

export default Home
