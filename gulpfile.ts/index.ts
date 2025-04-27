import Compiler from "./tasks/compile"
import Dev from "./tasks/dev"

exports.dev = Dev
exports.default = Compiler

// `task()` API 方式
// module.exports = {
// };
