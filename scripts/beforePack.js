const { moveDir } = require("./utils/file")

exports.default = () => {
  moveDir("core", "app/core")
}
