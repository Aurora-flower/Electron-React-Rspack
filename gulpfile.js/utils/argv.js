const { BuildingEnvironment } = require('../common/env');

function getArgv() {
  const args = process.argv.splice(3);
  const argObject = {};

  /* 处理 --xxx=xxx 格式的参数为对象 */
  args.forEach(arg => {
    if (arg.includes('=')) {
      const [key, value] = arg.split('=');
      argObject[key.replace('--', '')] = value;
    } else if (arg.startsWith('--')) {
      argObject[arg.replace('--', '')] = true;
    }
  });

  console.log('args:', args, argObject);
  return {
    mode: args?.mode || BuildingEnvironment.Prod,
    ...argObject
  };
}

module.exports = getArgv;
