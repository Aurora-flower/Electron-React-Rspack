const {
  writeFile,
  mkdirSync,
  statSync,
  readdirSync,
  readFileSync
} = require("node:fs")
const { join } = require("node:path")

function existsSync(localPath, type) {
  try {
    const stats = statSync(localPath)
    return type === "File"
      ? stats.isFile()
      : type === "Directory"
        ? stats.isDirectory()
        : !!stats
  } catch (_error) {
    return false
  }
}

function moveDir(sourceDir, targetDir) {
  return new Promise(resolve => {
    if (!existsSync(sourceDir, "Directory")) {
      console.error("The target source does not exist")
      resolve(false)
      return
    }
    if (!existsSync(targetDir, "Directory")) {
      mkdirSync(targetDir, { recursive: true })
    }
    const files = readdirSync(sourceDir)
    for (const file of files) {
      const sourcePath = join(sourceDir, file)
      const targetPath = join(targetDir, file)
      if (existsSync(sourcePath, "File")) {
        writeFile(targetPath, readFileSync(sourcePath), err => {
          resolve(!err)
        })
      } else if (existsSync(sourcePath, "Directory")) {
        moveDir(sourcePath, targetPath)
      }
    }
  })
}

module.exports = { moveDir }
