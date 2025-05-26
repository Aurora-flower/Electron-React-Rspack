type OnloadHandler = (this: FileReader, ev: ProgressEvent<FileReader>) => any

export function getFileInput(
  event: InputEvent,
  onloadHandler: OnloadHandler | null = null
): void {
  const target = event.target as HTMLInputElement
  if (!target?.files) return
  const file = target.files[0]
  const render = new FileReader()
  render.onload = onloadHandler
  render.readAsDataURL(file)
}
