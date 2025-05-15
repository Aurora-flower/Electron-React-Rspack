import { nativeTheme } from "electron"

const EFFECT = {
  System: "system",
  Dark: "dark",
  Light: "light"
} as const

type EffectType = (typeof EFFECT)[keyof typeof EFFECT]

export function getTheme(): EffectType {
  return nativeTheme.shouldUseDarkColors ? EFFECT.Dark : EFFECT.Light
}

export function setTheme(theme: EffectType): void {
  nativeTheme.themeSource = theme
}

export function toggleTheme(): void {
  setTheme(getTheme() === EFFECT.Dark ? EFFECT.Light : EFFECT.Dark)
}
