import { DASHBOARD_MAP } from "@/views/components/Dashboard/map/view"
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import * as React from "react"
import type { JSX } from "react"

function DashboardCard(props: {
  title: string
  children: JSX.Element
}): JSX.Element {
  return (
    <div className="card w-[calc(25%-2rem)] m-[1rem] rounded-md p-1 !bg-[var(--color-mint-500)]">
      <div className="card-header">{props.title}</div>
      <div className="card-body">
        <div key={Math.random() + Math.random()} className="item m-2">
          {props.children}
        </div>
      </div>
    </div>
  )
}

function DashboardView(): JSX.Element {
  return (
    <div className="dashboard page-base flex flex-wrap">
      {DASHBOARD_MAP.map(item => (
        <DashboardCard title={item.label} key={item.label}>
          <div>{item.desc}</div>
        </DashboardCard>
      ))}
    </div>
  )
}

export default DashboardView
