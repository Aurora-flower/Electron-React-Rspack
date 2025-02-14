const { join } = require('node:path');

function joinPath(...paths) {
  try {
    const base = join(...paths);
    return process.platform == 'win32'
      ? base.replace(/\\/g, '/')
      : base.replace(/(?=\W+)\s+(?<=\W+)/g, '\\ ');
  } catch (error) {
    console.log(!!error);
    return '';
  }
}

module.exports = joinPath;
