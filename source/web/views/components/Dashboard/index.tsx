import { DASHBOARD_MAP } from "@/views/components/Dashboard/configData"
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import * as React from "react"
import type { JSX } from "react"

// const { useState, useEffect } = React

function DashboardCard(props: {
  title: string
  children: JSX.Element
}): JSX.Element {
  return (
    <div className="card w-[calc(25%-2rem)] m-[1rem] !bg-[var(--color-mint-500)]">
      <div className="card-header">{props.title}</div>
      <div className="card-body">
        {
          <div key={Math.random() + Math.random()} className="item m-2">
            {props.children}
          </div>
        }
      </div>
    </div>
  )
}

function Dashboard(): JSX.Element {
  return (
    <div className="dashboard flex flex-wrap">
      {DASHBOARD_MAP.map(item => (
        <DashboardCard title={item.label} key={item.label}>
          <div>DashboardCard</div>
        </DashboardCard>
      ))}
    </div>
  )
}

export default Dashboard
