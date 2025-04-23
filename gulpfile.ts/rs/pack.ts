import { rspack, type WatchOptions } from "@rspack/core";
import getRsConfig from "./config";

function rspackCompiler() {
  return new Promise((resolve, reject) => {
    const RsConfig = getRsConfig();
    try {
      const options: WatchOptions = {};
      const multiCompiler = rspack(RsConfig);
      const watcher = multiCompiler.watch(options, (err, stats) => {
        /* Tip: err 对象不包含编译错误，必须使用 stats.hasErrors() 单独处理 */
        if (err) {
          console.error("Rspack watch Error ---", err?.message);
        }
        if (stats && stats.hasErrors()) {
          console.log(stats.toString({ colors: true }));
        }
      });
      watcher.close((error) => {
        console.log("Rspack closed...", error);
        resolve(true);
      });
    } catch (err) {
      console.error(
        "Rspack Compile Error:",
        err instanceof Error ? err.message : String(err)
      );
      reject(err);
    }
  });
}

export default rspackCompiler;
