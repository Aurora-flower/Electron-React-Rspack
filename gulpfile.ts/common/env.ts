export const ENVIRONMENT = {
  None: "none",
  Dev: "development",
  Prod: "production"
}

export function getIsDev(): boolean {
  return process.env.NODE_ENV === ENVIRONMENT.Dev
}
