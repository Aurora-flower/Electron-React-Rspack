import { webError } from "@/utils/log"

export function loadFont(
  family: string,
  source: string | BufferSource,
  descriptors?: FontFaceDescriptors
): Promise<boolean> {
  return new Promise(resolve => {
    const customFont = new FontFace(family, source, descriptors)
    customFont
      .load()
      .then(loadedFont => {
        document.fonts.add(loadedFont)
        resolve(true)
      })
      .catch(error => {
        webError("font", "loadFont", error)
        resolve(false)
      })
  })
}

export function setFontFamily(
  element: HTMLElement | HTMLDivElement | null,
  font: string
): void {
  if (element) {
    element.style.fontFamily = font
  }
}
