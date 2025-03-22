/**
 * @file 承担编译任务
 */
const clean = require('./clean');
const { series } = require('gulp');
const RsCompiler = require('../rs/pack');
// const WebpackCompiler = require('./webpack');

module.exports = series(clean, RsCompiler);
