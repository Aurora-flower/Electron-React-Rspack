import { trimTexture } from "@/helpers/render/gremlin/generator/sprite/trim"
import { Texture } from "pixi.js"

export function overwritePixi(): void {
  Texture.prototype.autoCrop = async function (): Promise<Texture> {
    return trimTexture(this)
  }
}
