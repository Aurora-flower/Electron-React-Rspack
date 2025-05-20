import type { Application } from "pixi.js"

class PixiManager {
  private static app: Application

  static getApp(): Application {
    return PixiManager.app
  }
}

export default PixiManager
