type ImageOnloadHandler = (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
) => void

export function createImageObject(
  texture: string,
  imageOnloadHandler: ImageOnloadHandler
): void {
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d") as CanvasRenderingContext2D
  const image = new Image()
  image.crossOrigin = "Anonymous"
  image.src = texture
  image.onload = (): void => {
    imageOnloadHandler(image, canvas, context)
  }
}
