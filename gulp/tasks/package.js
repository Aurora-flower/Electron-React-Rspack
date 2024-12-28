/**
 * @file 执行打包任务
 */
const { task } = require('gulp');

const CWD = process.cwd(); /* 当前工作目录  */

task('package', function (done) {
  console.log('开始打包...', CWD);
  done();
});
