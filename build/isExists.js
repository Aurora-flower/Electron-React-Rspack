const { statSync } = require('fs');

function existsSync(
  localPath,
  type = 'All' // 'File' | 'Directory' | 'All'
) {
  try {
    const stats = statSync(localPath);
    return type == 'File'
      ? stats.isFile()
      : type == 'Directory'
        ? stats.isDirectory()
        : !!statSync(localPath);
  } catch (_error) {
    return !_error;
  }
}

module.exports = {
  existsSync
};
