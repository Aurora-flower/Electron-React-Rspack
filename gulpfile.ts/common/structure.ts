import { join } from "node:path"

// process.chdir('/Users')
const CWD = process.cwd()

/* ***** ***** ***** ***** Folder(Directory) Structure ***** ***** ***** ***** */
const DIRECTORY_STRUCTURE = {
  Output: "app",
  Static: "public",
  Source: "source",
  Config: ".config"
}

function getAppStructure(baseUrl: string) {
  return {
    baseUrl,
    main: join(baseUrl, "electron"),
    preload: join(baseUrl, "preload"),
    renderer: join(baseUrl, "public")
  }
}

function getSourceStructure(baseUrl: string) {
  return {
    baseUrl,
    main: join(baseUrl, "electron"),
    preload: join(baseUrl, "preload"),
    renderer: join(baseUrl, "web")
  }
}

function getPublicStructure(baseUrl: string) {
  return {
    baseUrl,
    resource: join(baseUrl, "resource")
  }
}

function getConfigStructure(baseUrl: string) {
  return {
    baseUrl
  }
}

const _Directory_ = new Proxy(DIRECTORY_STRUCTURE, {
  get(target, key) {
    if (!(key in target)) {
      return undefined
    }
    const baseUrl = join(CWD, target[key as keyof typeof DIRECTORY_STRUCTURE])
    if (key === "Output") {
      return getAppStructure(baseUrl)
    } else if (key === "Source") {
      return getSourceStructure(baseUrl)
    } else if (key === "Static") {
      return getPublicStructure(baseUrl)
    } else if (key === "Config") {
      return getConfigStructure(baseUrl)
    } else {
      return baseUrl
    }
  }
}) as typeof DIRECTORY_STRUCTURE & {
  Output: ReturnType<typeof getAppStructure>
  Source: ReturnType<typeof getSourceStructure>
  Static: ReturnType<typeof getPublicStructure>
  Config: ReturnType<typeof getConfigStructure>
}

/* ***** ***** ***** ***** File Structure ***** ***** ***** ***** */
const FILE_STRUCTURE = {
  Env: ".env",
  DevEnv: ".env.dev",
  ProdEnv: ".env.prod",
  Page: "index.html",
  Favicon: "favicon.ico"
}

function getFileTrend(form: string, name: string, to = "") {
  return {
    from: join(form, name),
    to: to && join(to, name)
  }
}

const _File_ = new Proxy(FILE_STRUCTURE, {
  get(target, key) {
    if (!(key in target)) {
      return undefined
    }
    const name = target[key as keyof typeof FILE_STRUCTURE]
    if (typeof key === "string" && key.indexOf("Env") > -1) {
      return getFileTrend(_Directory_.Config.baseUrl, name)
    } else if (typeof key === "string" && ["Page", "Favicon"].includes(key)) {
      return getFileTrend(
        _Directory_.Static.baseUrl,
        name,
        _Directory_.Output.renderer
      )
    }
  }
})

/* ***** ***** ***** ***** Export ***** ***** ***** ***** */
export function getDirectoryStructure() {
  const emptyObject = Object.create(null)
  return Object.assign(emptyObject, _Directory_)
}

export function getFileStructure() {
  const emptyObject = Object.create(null)
  return Object.assign(emptyObject, _File_)
}
