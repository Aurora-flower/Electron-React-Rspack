// biome-ignore lint/correctness/noUnusedImports: <explanation>
import * as React from "react"
import type { JSX } from "react"

// const { useState, useEffect } = React

const DASHBOARD_MAP: Array<{
  name?: string
  label: string
}> = [
  {
    label: "2D|3D 渲染"
  },
  {
    label: "数据可视化"
  },
  {
    label: "数据处理"
  },
  {
    label: "设计模式"
  },
  {
    label: "算法"
  },
  {
    label: "计算机语言"
  },
  {
    label: "扩展学习"
  },
  {
    label: "工具箱",
    name: "Tool"
  },
  {
    label: "学习示例"
  },
  {
    label: "媒体频道",
    name: "Media"
  },
  {
    label: "待办事项",
    name: "Todo"
  },
  {
    label: "旅行记",
    name: "Voyage"
  },
  {
    label: "兼职平台",
    name: "Job"
  },
  {
    label: "API 测试"
  }
]

function Dashboard(): JSX.Element {
  return (
    <div className="dashboard flex flex-wrap">
      {DASHBOARD_MAP.map(item => (
        <div key={Math.random() + Math.random()} className="item m-2">
          {item.label}
        </div>
      ))}
    </div>
  )
}

export default Dashboard
