type CSSModuleClasses = { readonly [key: string]: string }

// declare module "*.css" {
//   const styles: CSSModuleClasses
//   export default styles
// }

// images
declare module "*.png" {
  const src: string
  export default src
}

declare module "*.svg" {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const content: string

  export { ReactComponent }
  export default content
}

// media
declare module "*.mp4" {
  const src: string
  export default src
}

declare module "*.mp3" {
  const src: string
  export default src
}

declare module "*.wav" {
  const src: string
  export default src
}

// fonts
declare module "*.woff" {
  const src: string
  export default src
}

declare module "*.woff2" {
  const src: string
  export default src
}

declare module "*.ttf" {
  const src: string
  export default src
}

// other
declare module "*.pdf" {
  const src: string
  export default src
}
declare module "*.txt" {
  const src: string
  export default src
}
