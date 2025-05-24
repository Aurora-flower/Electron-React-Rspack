import crypto from "node:crypto"

export function createNonce(): string {
  return crypto.randomBytes(16).toString("base64")
}
