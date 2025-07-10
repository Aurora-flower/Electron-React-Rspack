import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises"
import { join, relative } from "node:path"

interface PackageJson {
  name: string
  main: string
  license: string
  author: string
  version: string
  description: string
  dependencies: Record<string, string>
  devDependencies?: Record<string, string>
}

type DistPackage = Partial<PackageJson> & {
  main: string
}

const cwd = process.cwd()
const npmName = ".npmrc"
const npmrc = join(cwd, npmName)
const outDir = join(cwd, "app")
const packagePath = join(cwd, "package.json")
const outputPath = join(outDir, "package.json")

async function clonePackageJSON(): Promise<DistPackage> {
  const raw = await readFile(packagePath, "utf-8")
  const {
    name,
    main,
    author,
    version,
    license,
    description,
    dependencies
    // devDependencies
  } = JSON.parse(raw) as PackageJson
  // const [major, minor, patch] = version.split(".")
  // let patchNum = parseInt(patch)
  // patchNum++
  const distPackage: DistPackage = {
    name,
    main: relative(outDir, main),
    author,
    // version: `${major}.${minor}.${patchNum}`,
    version,
    license,
    description,
    dependencies
    // devDependencies
  }
  await mkdir(outDir, { recursive: true })
  await writeFile(outputPath, JSON.stringify(distPackage, null, 2))
  console.log("clonePackageJSON:", distPackage)
  return distPackage
}

// async function copiedCoreFolder() {}

async function preparePackage(): Promise<void> {
  try {
    await clonePackageJSON()
    copyFile(npmrc, join(outDir, npmName))
    console.log("Package prepared:")
  } catch (error) {
    console.error("Preparation failed:", error)
    process.exit(1)
  }
}

preparePackage()
