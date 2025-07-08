import { Texture } from "pixi.js"
import { trimTexture } from "@/helpers/graphics/gremlin/generator/sprite/trim"

export function overwritePixi(): void {
  Texture.prototype.autoCrop = async function (): Promise<Texture> {
    return trimTexture(this)
  }
}
