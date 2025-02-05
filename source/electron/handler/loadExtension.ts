// import { join } from 'node:path';
import {
  REDUX_DEVTOOLS,
  installExtension,
  REACT_DEVELOPER_TOOLS
} from 'electron-devtools-installer';
import { debugLog } from '@/common/log';

const ModuleID = module.id;

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
      .then(res =>
        debugLog(ModuleID, `Added Extension`, true, res.name)
      )
      .catch(err =>
        debugLog(
          ModuleID,
          'An error occurred',
          true,
          err?.message
        )
      );
  }
}
