import { app } from "electron"

/**
 * @summary 每当有 GPU 信息更新时触发。
 */
function onGpuInfoUpdate(): void {
  app.on("gpu-info-update", () => {})
}

export default onGpuInfoUpdate
