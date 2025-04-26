import { join, relative } from "node:path";
import { mkdir, readFile, writeFile } from "node:fs/promises";

interface PackageJson {
  name: string;
  main: string;
  license: string;
  author: string;
  version: string;
  description: string;
  dependencies: Record<string, string>;
}

type DistPackage = Partial<PackageJson> & {
  main: string;
};

const outDir = join(process.cwd(), "app");
const packagePath = join(process.cwd(), "package.json");
const outputPath = join(outDir, "package.json");

async function clonePackageJSON() {
  const raw = await readFile(packagePath, "utf-8");
  const { name, main, author, version, license, description, dependencies } =
    JSON.parse(raw) as PackageJson;
  const distPackage: DistPackage = {
    name,
    main: relative(outDir, main),
    author,
    version,
    license,
    description,
    dependencies,
  };
  await mkdir(outDir, { recursive: true });
  await writeFile(outputPath, JSON.stringify(distPackage, null, 2));
  console.log("clonePackageJSON:", distPackage);
}

async function copiedCoreFolder() {}

async function preparePackage() {
  try {
    await clonePackageJSON();
    console.log("Package prepared:");
  } catch (error) {
    console.error("Preparation failed:", error);
    process.exit(1);
  }
}

preparePackage();
