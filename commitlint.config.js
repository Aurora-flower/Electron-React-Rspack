module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "dep",
        "build",
        "ci",
        "chore",
        "revert",
        "workflow",
        "mod",
        "wip",
        "types",
        "release",
        "merge",
        "bug",
        "del",
        "asset",
        "base",
        "editor"
      ]
    ],
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"]
    ],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 72]
  }
}
