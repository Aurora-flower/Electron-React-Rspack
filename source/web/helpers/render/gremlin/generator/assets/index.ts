import { Assets, type Texture } from "pixi.js"

export async function loadTexture(spriteURL: string): Promise<Texture> {
  return Assets.load(spriteURL)
}
