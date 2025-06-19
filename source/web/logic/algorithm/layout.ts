export interface BaseNodeInfoModel {
  size: SizeModel
  scale: ScaleModel
  position: PointModel
  anchor: AnchorModel
}

export enum LayoutType {
  /**
   * !#en None Layout
   * !#zh 取消布局
   *@property {Number} NONE
   */
  NONE = 0,
  /**
   * !#en Horizontal Layout
   * !#zh 水平布局
   * @property {Number} HORIZONTAL
   */
  HORIZONTAL = 1,
  /**
   * !#en Vertical Layout
   * !#zh 垂直布局
   * @property {Number} VERTICAL
   */
  VERTICAL = 2,
  /**
   * !#en Grid Layout
   * !#zh 网格布局
   * @property {Number} GRID
   */
  GRID = 3
}

export enum VerticalDirection {
  /**
   * !#en Items arranged from bottom to top.
   * !#zh 从下到上排列
   * @property {Number} BOTTOM_TO_TOP
   */
  BOTTOM_TO_TOP = 0,
  /**
   * !#en Items arranged from top to bottom.
   * !#zh 从上到下排列
   * @property {Number} TOP_TO_BOTTOM
   */
  TOP_TO_BOTTOM = 1
}

export enum HorizontalDirection {
  /**
   * !#en Items arranged from left to right.
   * !#zh 从左往右排列
   * @property {Number} LEFT_TO_RIGHT
   */
  LEFT_TO_RIGHT = 0,
  /**
   * !#en Items arranged from right to left.
   * !#zh 从右往左排列
   *@property {Number} RIGHT_TO_LEFT
   */
  RIGHT_TO_LEFT = 1
}

export enum AxisDirection {
  /**
   * !#en The horizontal axis.
   * !#zh 进行水平方向布局
   * @property {Number} HORIZONTAL
   */
  HORIZONTAL = 0,
  /**
   * !#en The vertical axis.
   * !#zh 进行垂直方向布局
   * @property {Number} VERTICAL
   */
  VERTICAL = 1
}

export enum ResizeMode {
  /**
   * !#en Don't do AnyModel scale.
   * !#zh 不做任何缩放
   * @property {Number} NONE
   */
  NONE = 0,
  /**
   * !#en The container size will be expanded with its children's size.
   * !#zh 容器的大小会根据子节点的大小自动缩放。
   * @property {Number} CONTAINER
   */
  CONTAINER = 1,
  /**
   * !#en Child item size will be adjusted with the container's size.
   * !#zh 子节点的大小会随着容器的大小自动缩放。
   * @property {Number} CHILDREN
   */
  CHILDREN = 2
}

interface DirectionModel {
  horizontal: HorizontalDirection
  vertical: VerticalDirection
}

export interface LayoutModel {
  type: LayoutType
  mode: ResizeMode
  size: SizeModel
  cell: SizeModel
  padding: PaddingModel
  space: SpaceModel
  driection: DirectionModel

  /* 是否按元素的缩放比例布局 */
  isByScale: boolean
}

export function layout(
  _nodeInfo: BaseNodeInfoModel,
  _children: BaseNodeInfoModel[]
): void {
  // LAYOUT 逻辑
}
