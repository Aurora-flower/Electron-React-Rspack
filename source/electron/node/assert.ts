/**
 * @file node API - assert
 * @description `node:assert` 模块提供了一组用于验证不变量的断言函数。
 */
// import assert from 'node:assert/strict';
import { strict as assert } from 'node:assert';

console.log(
  assert.deepEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5])
);
