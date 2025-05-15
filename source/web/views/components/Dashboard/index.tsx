// biome-ignore lint/correctness/noUnusedImports: <explanation>
import * as React from "react"
import type { JSX } from "react"

function Dashboard(): JSX.Element {
  return (
    <div className="card">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={Math.random() + Math.random()}>{i}</div>
      ))}
    </div>
  )
}

export default Dashboard
