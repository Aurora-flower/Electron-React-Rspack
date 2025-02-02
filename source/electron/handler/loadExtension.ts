// import { join } from 'node:path';
// import { session } from 'electron';
import {
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
  await installExtension(REACT_DEVELOPER_TOOLS, {
    loadExtensionOptions: { allowFileAccess: true }
  })
    .then(ext => console.log(`Added Extension: ${ext.name}`))
    .catch(err => console.log('An error occurred: ', err));

  // session.defaultSession.getAllExtensions().map(e => {
  //   if (e.name === 'React Developer Tools') {
  //     session.defaultSession.loadExtension(e.path);
  //   }
  // });
}
