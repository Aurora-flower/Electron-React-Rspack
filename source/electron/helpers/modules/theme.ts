import { nativeTheme } from "electron";

const EFFECT = {
  System: "system",
  Dark: "dark",
  Light: "light"
} as const;

type EffectType = (typeof EFFECT)[keyof typeof EFFECT];

export function getTheme() {
  return nativeTheme.shouldUseDarkColors ? EFFECT.Dark : EFFECT.Light;
}

export function setTheme(theme: EffectType) {
  nativeTheme.themeSource = theme;
}

export function toggleTheme() {
  setTheme(getTheme() === EFFECT.Dark ? EFFECT.Light : EFFECT.Dark);
}
