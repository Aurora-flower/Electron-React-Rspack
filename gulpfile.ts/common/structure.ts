import { join } from "node:path"

// process.chdir('/Users')
const CWD = process.cwd()

interface ReturnInfo {
  baseUrl: string
  [key: string]: string
}

/* ***** ***** ***** ***** Folder(Directory) Structure ***** ***** ***** ***** */
const DIRECTORY_STRUCTURE = {
  Output: "app",
  Static: "public",
  Source: "source",
  Config: ".config"
}

function getAppStructure(baseUrl: string): ReturnInfo & {
  main: string
  preload: string
  renderer: string
} {
  return {
    baseUrl,
    main: join(baseUrl, "electron"),
    preload: join(baseUrl, "preload"),
    renderer: join(baseUrl, "public")
  }
}

function getSourceStructure(baseUrl: string): ReturnInfo & {
  main: string
  preload: string
  renderer: string
} {
  return {
    baseUrl,
    main: join(baseUrl, "electron"),
    preload: join(baseUrl, "preload"),
    renderer: join(baseUrl, "web")
  }
}

function getPublicStructure(baseUrl: string): ReturnInfo & {
  resource: string
} {
  return {
    baseUrl,
    resource: join(baseUrl, "resource")
  }
}

function getConfigStructure(baseUrl: string): ReturnInfo {
  return {
    baseUrl
  }
}

type GetFolderInfo =
  | ReturnType<typeof getAppStructure>
  | ReturnType<typeof getSourceStructure>
  | ReturnType<typeof getPublicStructure>
  | ReturnType<typeof getConfigStructure>
  | string

type DirectoryStructure = typeof DIRECTORY_STRUCTURE & {
  Output: ReturnType<typeof getAppStructure>
  Source: ReturnType<typeof getSourceStructure>
  Static: ReturnType<typeof getPublicStructure>
  Config: ReturnType<typeof getConfigStructure>
}

type DirectoryStructureKey = keyof typeof DIRECTORY_STRUCTURE

const _Directory_ = new Proxy(DIRECTORY_STRUCTURE, {
  get(target, key: DirectoryStructureKey): GetFolderInfo {
    if (!(key in target)) {
      return undefined
    }
    const baseUrl = join(CWD, target[key])
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
}) as DirectoryStructure

/* ***** ***** ***** ***** File Structure ***** ***** ***** ***** */
const FILE_STRUCTURE = {
  Env: ".env",
  DevEnv: ".env.dev",
  ProdEnv: ".env.prod",
  Page: "index.html",
  Favicon: "favicon.ico"
}

interface FileInfo {
  from: string
  to?: string
}

function getFileTrend(form: string, name: string, to = undefined): FileInfo {
  return {
    from: join(form, name),
    to: to && join(to, name)
  }
}

type GetFileInfo = ReturnType<typeof getFileTrend>

type FileStructureKey = keyof typeof FILE_STRUCTURE

type FileStructure = {
  [key in FileStructureKey]: GetFileInfo
}

const _File_ = new Proxy(FILE_STRUCTURE, {
  get(target, key: FileStructureKey): GetFileInfo {
    if (!(key in target)) {
      return undefined
    }
    const name = target[key]
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
}) as unknown as FileStructure

/* ***** ***** ***** ***** Export ***** ***** ***** ***** */
export function getDirectoryStructure(): DirectoryStructure {
  const emptyObject = Object.create(null)
  return Object.assign(emptyObject, _Directory_)
}

export function getFileStructure(): FileStructure {
  const emptyObject = Object.create(null)
  return Object.assign(emptyObject, _File_)
}
