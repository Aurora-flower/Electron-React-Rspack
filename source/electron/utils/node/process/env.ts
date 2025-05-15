const ENV_MACRO = {
  // None: "none",
  Dev: "development",
  Prod: "production"
}

export function isDev(): boolean {
  return process.env.NODE_ENV === ENV_MACRO.Dev
}
