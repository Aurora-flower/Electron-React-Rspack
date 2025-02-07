// import { join } from 'node:path';
import {
  REDUX_DEVTOOLS,
  installExtension,
  REACT_DEVELOPER_TOOLS
} from 'electron-devtools-installer';
import Helper from '@/electron/helper';
import { debugLog } from '@/common/helper/log';

const ModuleID = module.id;

export async function loadExtension() {
  // 注意📢: windows 下会一直尝试安装，但最终还是安装不成功，很久之后才启动应用；
  if (Helper.isWin()) {
    return;
  }

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
