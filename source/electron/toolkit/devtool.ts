import {
  type ExtensionReference,
  // REACT_DEVELOPER_TOOLS,
  installExtension
} from "electron-devtools-installer"

export async function loadExtension(): Promise<void> {
  const extensions: ExtensionReference[] = []
  for (const extension of extensions) {
    await installExtension(extension, {
      forceDownload: true,
      loadExtensionOptions: { allowFileAccess: true }
    })
    // .then(res =>
    // )
    // .catch(err =>
    // );
  }
}
