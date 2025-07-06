export const DEFAULT_GRID_INTERVAL = 50

/**
 * @summary 默认的销毁参数
 * @property {boolean} children	是否递归销毁所有子对象（如 Container 的子元素）。	默认值: true
 * @property {boolean} texture	是否销毁对象关联的纹理（如 Sprite.texture）。	默认值: false
 * @property {boolean} textureSource	是否销毁纹理的底层源（如 BaseTexture），影响所有共享该纹理的对象。	默认值: false
 * @property {boolean} context	是否销毁 WebGL 上下文（通常不推荐，除非确定无其他对象使用）。	默认值: false
 * @property {boolean} style	是否销毁文本样式（如 Text 对象的 style）。	默认值: false
 * @property {boolean} sprite	是否销毁精灵对象（通常与 children 配合使用）。	默认值: true（隐含）
 */
export const DEFAULT_DESTORY_OPTIONS = {
  children: true,
  sprite: false,
  context: false,
  texture: false,
  textureSource: false,
  style: false
}
