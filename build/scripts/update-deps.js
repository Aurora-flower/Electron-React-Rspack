// update-deps.js
const { exec } = require('child_process');

/**
 * @constant FIXED_DEPS 忽略的依赖包 - 版本差异过大，更改后会造成项目崩坏
 * @type {string[]}
 */
const _FIXED_DEPS = [
  // 'tailwindcss'
];

try {
  const subprocess = exec('npm outdated --json', {
    encoding: 'utf-8'
  });

  subprocess.stdout.on('data', _data => {
    // const outdated = JSON.parse(data);
    // console.log(outdated);
  });

  subprocess.stderr.on('data', _data => {
    // console.error('Script execution error:', data);
  });

  subprocess.on('close', code => {
    console.log(`Script execution completed with code ${code}`);
  });
} catch (error) {
  console.error(
    'Script execution error:',
    error.status,
    error.message
  );
}
