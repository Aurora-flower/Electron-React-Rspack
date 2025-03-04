// update-deps.js
const { exec } = require('child_process');

/**
 * 忽略的依赖包 - 版本差异过大，更改后会造成项目崩坏
 * @type {string[]}
 */
const fixedDeps = ['tailwindcss'];

try {
  const subprocess = exec('npm outdated --json', {
    encoding: 'utf-8'
  });

  subprocess.stdout.on('data', data => {
    const outdated = JSON.parse(data);
    const pkgs = Object.keys(outdated).filter(
      pkg => !fixedDeps.includes(pkg)
    );
    console.log('Checking dependency updates...', outdated);
    if (!pkgs.length) return;
    const tips = pkgs.map(pkg => `${pkg}@latest`).join(' ');
    console.log(
      '*********************************************\n' +
        'Update all dependencies to the latest version:\n' +
        `npm install ${tips}`
    );
  });
} catch (error) {
  console.error(
    'Script execution error:',
    error.status,
    error.message
  );
}
