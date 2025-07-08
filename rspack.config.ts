import { defineConfig } from "@rspack/cli"
// import { rspack } from "@rspack/core";
// import { ReactRefreshRspackPlugin } from "@rspack/plugin-react-refresh";

// const isDev = process.env.NODE_ENV === "development";

// Target browsers, see: https://github.com/browserslist/browserslist
// const targets = ["last 2 versions", "> 0.2%", "not dead", "Firefox ESR"];

export default defineConfig([
  {
    "mode": "development",
    "stats": "verbose",
    "devtool": "source-map",
    "resolve": {
      "mainFiles": ["index", "main"],
      "extensions": ["...", ".ts", ".js", ".json", ".node"],
      "enforceExtension": false,
      "symlinks": false,
      "alias": {
        "@main": "/Users/HuaYing/Desktop/resources/Local/ER/source/electron"
      }
    },
    "target": "electron-main",
    "entry": {
      "main": {
        "import":
          "/Users/HuaYing/Desktop/resources/Local/ER/source/electron/main.ts"
      }
    },
    "output": {
      "path": "/Users/HuaYing/Desktop/resources/Local/ER/app/electron",
      "filename": "index.js",
      "clean": true
    },
    "module": {},
    "plugins": []
  },
  {
    "mode": "development",
    "stats": "verbose",
    "devtool": "source-map",
    "resolve": {
      "mainFiles": ["index", "main"],
      "extensions": ["...", ".ts", ".js", ".json", ".node"],
      "enforceExtension": false,
      "symlinks": false
    },

    "target": "electron-preload",
    "entry": {
      "preload": {
        "import":
          "/Users/HuaYing/Desktop/resources/Local/ER/source/preload/index.ts"
      }
    },
    "output": {
      "path": "/Users/HuaYing/Desktop/resources/Local/ER/app/preload",
      "filename": "index.js",
      "clean": true
    },
    "module": {},
    "plugins": []
  },
  {
    "mode": "development",
    "stats": "verbose",
    "devtool": "source-map",
    "resolve": {
      "mainFiles": ["index", "main"],
      "extensions": ["...", ".ts", ".js", ".json", ".node", ".tsx", ".css"],
      "enforceExtension": false,
      "symlinks": false,
      "alias": {
        "@": "/Users/HuaYing/Desktop/resources/Local/ER/source/web"
      }
    },
    "target": "web",
    "entry": {
      "renderer": {
        "import": "/Users/HuaYing/Desktop/resources/Local/ER/source/web/main.ts"
      }
    },
    "output": {
      "path": "/Users/HuaYing/Desktop/resources/Local/ER/app/public",
      "filename": "index.js",
      "clean": true,
      "publicPath": "/"
    },
    "experiments": {
      "css": true
    },
    "infrastructureLogging": {
      "level": "verbose"
    },
    "optimization": {},
    "module": {},
    "plugins": []
  }
])
