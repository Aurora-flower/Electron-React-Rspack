import { app } from 'electron';
import {
  REDUX_DEVTOOLS,
  installExtension,
  REACT_DEVELOPER_TOOLS
} from 'electron-devtools-installer';
import debugLog from '@/electron/tools/log';

const ModuleID = module.id;

export async function loadExtension() {
  // 注意📢: windows 下会一直尝试安装，但最终还是安装不成功，很久之后才启动应用；
  if (/* isWin() && */ !app.isPackaged) {
    return;
  }

  const extensions = [REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS];
  for (const extension of extensions) {
    await installExtension(extension, {
      loadExtensionOptions: { allowFileAccess: true }
    })
      .then(res =>
        debugLog(
          {
            id: ModuleID,
            sign: `Added Extension`
          },
          res.name
        )
      )
      .catch(err =>
        debugLog(
          {
            id: ModuleID,
            sign: `An error occurred`
          },
          err?.message
        )
      );
  }
}
