import { Assets, Texture } from "pixi.js"
import { webError } from "@/utils/log"

export async function loadTexture(spriteURL: string): Promise<Texture> {
  try {
    const texture = await Assets.load(spriteURL)
    return texture // ?? Texture.WHITE
  } catch (error) {
    webError("loadTexture", "Error", error)
    return new Texture()
  }
}
