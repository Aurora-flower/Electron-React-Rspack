// import { join } from 'node:path';
import {
  REDUX_DEVTOOLS,
  installExtension,
  REACT_DEVELOPER_TOOLS
} from 'electron-devtools-installer';

export async function loadExtension() {
  // const reactDevToolsPath =
  //   '/Users/HuaYing/Library/Application\ Support/Microsoft\ Edge/' +
  //   'Default/Local\ Extension\ Settings/' +
  //   'gpphkfbcpidddadnkolkpfckpihlkkil';
  // await session.defaultSession.loadExtension(
  //   reactDevToolsPath
  // );
  const extensions = [REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS];
  for (const extension of extensions) {
    await installExtension(extension, {
      loadExtensionOptions: { allowFileAccess: true }
    })
      .then(ext => console.log(`Added Extension: ${ext.name}`))
      .catch(err =>
        console.log('An error occurred: ', err?.message)
      );
  }
}
