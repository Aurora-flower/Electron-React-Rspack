const DEFAULT_COLOR = '#FFFFFF';

export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function rgbToHex(colorString: string): string {
  const regexRGB =
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(\.\d+)?))?\)/;
  const regexHex =
    /#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?/i;
  let match;
  let r, g, b, a;
  if ((match = colorString.match(regexRGB))) {
    [, r, g, b, a] = match.map(parseFloat);
  } else if ((match = colorString.match(regexHex))) {
    [, r, g, b, a] = match.map(
      (component: string, index: number) =>
        index === 4
          ? (parseInt(component, 16) / 255).toFixed(2)
          : parseInt(component, 16)
    );
  } else {
    return DEFAULT_COLOR;
  }
  const toHex = (c: string | number) => {
    const hex = Math.round(Number(c)).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  const alpha =
    a !== undefined ? Math.round(Number(a) * 255) : 255;
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alpha)}`;
}
