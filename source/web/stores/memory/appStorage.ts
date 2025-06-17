class StoreManager {
  private static appinfo: AppInfoModel | null = null

  static getAppInfo(): AppInfoModel | null {
    return StoreManager.appinfo
  }

  static setAppInfo(appinfo: AppInfoModel | null): void {
    StoreManager.appinfo = appinfo
  }
}

export default StoreManager
