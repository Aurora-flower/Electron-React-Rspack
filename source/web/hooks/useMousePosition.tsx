import * as React from "react"

function useMousePosition(): PointModel {
  const [position, setPosition] = React.useState({ x: 0, y: 0 })

  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent): void => {
      setPosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return (): void => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return position
}

export default useMousePosition

// function MouseTracker() {
//   const { x, y } = useMousePosition();
//   return <h1>The mouse position is ({x}, {y})</h1>;
// }
