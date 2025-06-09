import crypto from "node:crypto"

export function nonce(): string {
  return crypto.randomBytes(16).toString("base64")
}
