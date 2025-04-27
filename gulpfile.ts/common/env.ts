export const ENVIRONMENT = {
  None: "none",
  Dev: "development",
  Prod: "production"
}

export function isDev() {
  return process.env.NODE_ENV === ENVIRONMENT.Dev
}
