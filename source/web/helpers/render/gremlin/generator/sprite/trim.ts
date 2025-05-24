import { calculateImageBounds } from "@/helpers/render/gremlin/functions/calculate"
import { loadTexture } from "@/helpers/render/gremlin/generator/assets"
import { Rectangle, Texture } from "pixi.js"

export function trimTexture(texture: Texture): Promise<Texture> {
  return new Promise(resolve => {
    const width = texture.width
    const height = texture.height
    let imageData: ImageData
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d") as CanvasRenderingContext2D
    const image = new Image()
    image.crossOrigin = "Anonymous"
    image.src = texture.label || ""
    image.onload = (): void => {
      /* 在画布上使用图片的实际尺寸（以 CSS 像素为单位） */
      canvas.width = width // == image.naturalWidth
      canvas.height = height // == image.naturalHeight
      context.drawImage(image, 0, 0)
      imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      const bounds = calculateImageBounds(imageData)
      if (!bounds) return
      context.clearRect(0, 0, width, height)
      context.drawImage(
        image,
        bounds?.left ?? 0,
        bounds?.top ?? 0,
        bounds.width,
        bounds.height,
        0,
        0,
        width,
        height
      )
      const dataURL = canvas.toDataURL("image/png")
      if (bounds) {
        const rectangle = new Rectangle(
          bounds?.left ?? 0,
          bounds?.top ?? 0,
          bounds?.width ?? 0,
          bounds?.height ?? 0
        )
        const trimTexture = new Texture({
          source: texture.source,
          frame: rectangle
          // trim: rectangle
        })
        resolve(trimTexture)
        return
      }
      resolve(loadTexture(dataURL))
    }
  })
}
