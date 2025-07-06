export const DEFAULT_SCALE_INTERVAL = 10

export const DEFAULT_GRID_INTERVAL = 50

export const DEFAULT_COLOR = 0xffffff

/**
 * @summary 默认的销毁参数
 */
export interface DestroyOptionsDocs {
  /** 是否递归销毁所有子对象（如 Container 的子元素）。默认值: true */
  children?: boolean
  /** 是否销毁对象关联的纹理（如 Sprite.texture）。默认值: false */
  texture?: boolean
  /** 是否销毁纹理的底层源（如 BaseTexture），影响所有共享该纹理的对象。默认值: false */
  textureSource?: boolean
  /** 是否销毁 WebGL 上下文（通常不推荐，除非确定无其他对象使用）。默认值: false */
  context?: boolean
  /** 是否销毁文本样式（如 Text 对象的 style）。默认值: false */
  style?: boolean
  /** 是否销毁精灵对象（通常与 children 配合使用）。默认值: false */
  sprite?: boolean
}

export const DEFAULT_DESTROY_OPTIONS: DestroyOptionsDocs = {
  children: true,
  sprite: false,
  context: false,
  texture: false,
  textureSource: false,
  style: false
}
