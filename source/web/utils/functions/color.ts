// const pixel = 0xffffffff
// const red = (pixel & 0x00ff0000) >>> 16;
// const green = (pixel & 0x0000ff00) >>> 8;
// const blue = pixel & 0x000000ff;
// const alpha = (pixel & 0xff000000) >>> 24;

export function getRandomColor(): string {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
