import useClassNames from "@/hooks/useClassNames"
import { useAppSelector } from "@/stores/hooks"
import { getRandomColor } from "@/utils/functions/color"
import { webLog } from "@/utils/log"
import { Card } from "primereact/card"
import * as React from "react"
import type { JSX } from "react"
import { NavLink } from "react-router-dom"
// import { Button, Toast } from "@douyinfe/semi-ui"

interface CardInfoModel {
  label: string
  route?: string
}

function CardItem<T extends CardInfoModel>(prop: T): JSX.Element {
  return (
    <Card title={prop.label}>
      <p className="m-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed
        consequuntur error repudiandae numquam deserunt quisquam repellat libero
        asperiores earum nam nobis, culpa ratione quam perferendis esse,
        cupiditate neque quas!
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
    }
  ]
  return (
    <div className={useClassNames(["card-list", "flex", "flex-wrap"])}>
      {cardListInfo.map(item => (
        <div
          className="card-wrap w-[calc(25%-2rem)] m-[1rem]"
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
    <div className="page-base overflow-y-auto">
      <CardList />
    </div>
  )
}

export default Home
