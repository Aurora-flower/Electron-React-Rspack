import type { JSX } from "react"
// biome-ignore lint/correctness/noUnusedImports: React is used in JSX runtime
import * as React from "react"

function LoginPage(): JSX.Element {
  return (
    <div>
      <h1>Login</h1>
    </div>
  )
}

export default LoginPage
