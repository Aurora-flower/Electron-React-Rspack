const {
  mkdirSync,
  createWriteStream,
  writeFileSync,
  statSync
} = require('node:fs');
const yauzl = require('yauzl');
const { join } = require('node:path');

const args = process.argv;
const targetPath = args[2];
const destPath = args[3];

function debugLog(content = '', flag = 'w') {
  writeFileSync(
    'debug.log',
    content === '' ? content : `${content}\n`,
    { flag }
  );
}

function exits(url) {
  try {
    return !!statSync(url);
  } catch (err) {
    console.log('Error: ', err.message);
    return false;
  }
}

if (!targetPath || !destPath) {
  debugLog('Missing required arguments.');
  process.exit(100);
}

async function extractWithProgress(zipFilePath, destDir) {
  debugLog(zipFilePath);
  return new Promise((resolve, reject) => {
    try {
      yauzl.open(
        zipFilePath,
        { lazyEntries: true },
        (err, zipFile) => {
          if (err) {
            reject(err?.message);
            return;
          }

          zipFile.readEntry();

          zipFile.on('entry', entry => {
            const filepath = join(destDir, entry.fileName);

            // TODO: 待测试关闭是否影响
            // if (isGarbledPath(entry.fileName)) {
            //   debugLog(entry.fileName, 'a')
            //   zipFile.readEntry() // 跳过该条目
            //   return
            // }

            if (entry.fileName.endsWith('/')) {
              // 创建目录
              mkdirSync(filepath, { recursive: true });
              zipFile.readEntry(); // 跳过目录
            } else {
              // 解压文件
              zipFile.openReadStream(
                entry,
                (err, readStream) => {
                  if (err) {
                    debugLog(
                      `Error reading stream for ${entry.fileName}: ${err}`,
                      'a'
                    );
                    reject(err);
                    return;
                  }

                  const output = createWriteStream(filepath);
                  readStream.pipe(output);
                  output.on('close', () => {
                    zipFile.readEntry(); // 继续读取下一个条目
                  });
                }
              );
            }
          });

          zipFile.on('end', () => {
            debugLog('finish', 'a');
            resolve();
            process.exit(200);
          });

          zipFile.on('error', err => {
            reject(err);
            process.exit(103);
          });
        }
      );
    } catch (error) {
      debugLog(error.message, 'a');
      process.exit(102);
    }
  });
}

if (!exits(destPath)) {
  mkdirSync(destPath, { recursive: true });
}

// 开始解压
extractWithProgress(targetPath, destPath).catch(err => {
  debugLog(`Error during unzip: ${err}`, 'a');
  process.exit(103);
});
