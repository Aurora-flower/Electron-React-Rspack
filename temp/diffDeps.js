const { readFileSync } = require('node:fs');

const deps = readFileSync('./log/dependencies.json');
const packages = readFileSync('./package.json');

const depsData = JSON.parse(deps.toString());
const packagesData = JSON.parse(packages.toString());

function diffDeps(data, pack) {
  const keys = ['dependencies', 'devDependencies'];
  keys.forEach(key => {
    const origin = Object.keys(pack[key] || {});
    const record = Object.keys(data[key] || {});
    if (origin.length > record.length) {
      console.log(
        key,
        origin.filter(item => !record.includes(item))
      );
    }
  });
}

diffDeps(depsData, packagesData);
