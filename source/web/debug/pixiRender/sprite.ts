import { byLabelFindElement } from "@/helpers/render/gremlin/functions/find"
import { loadTexture } from "@/helpers/render/gremlin/generator/assets"
import { createSprite } from "@/helpers/render/gremlin/generator/sprite"
import { createNineSliceSprite } from "@/helpers/render/gremlin/generator/sprite/nineSliceSprite"
import PixiManager from "@/helpers/render/gremlin/manager"
import type { Texture } from "pixi.js"

export function debugPixiSprite(): void {
  /* 获取渲染应用对象 */
  const app = PixiManager.getApp()

  /* 渲染区图层（容器）的获取 */
  const layerContainer = byLabelFindElement("layer", app.stage)
  if (!layerContainer) return

  /* 2. 图片的加载与显示 - local 本地资源协议测试 */
  loadTexture(`local://${"F:/SERVER/release/ER/sample.png"}`).then(
    (texture: Texture) => {
      /* 创建普通精灵对象 */
      const sprite = createSprite(layerContainer, {
        texture,
        width: 300,
        height: 300,
        tint: 0x036fc2
      })
      sprite.position.set(300, 300)

      /* 创建九宫格模式精灵对象 */
      createNineSliceSprite(layerContainer, {
        texture,
        width: 300,
        height: 300,
        leftWidth: 80,
        rightWidth: 80,
        topHeight: 80,
        bottomHeight: 80
      })
    }
  )
}
