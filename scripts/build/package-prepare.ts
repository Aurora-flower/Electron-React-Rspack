import { type ChildProcess, exec } from "child_process";
import { createWriteStream, readFileSync } from "fs";
import { join, relative } from "node:path";
import { mkdir, readFile, writeFile } from "node:fs/promises";
// const { rimraf } = require("rimraf");

interface PackageJson {
  name: string;
  main: string;
  author?: string;
  version: string;
  description?: string;
  dependencies?: Record<string, string>;
}

// interface DistPackage extends Omit<PackageJson, "main"> {
//   main: string;
// }

type DistPackage = Partial<PackageJson> & {
  main: string;
};

const outDir = join(process.cwd(), "app");
const packagePath = join(process.cwd(), "package.json");
const outputPath = join(outDir, "package.json");

function execSetup(command: string) {
  return new Promise((resolve, reject) => {
    const child: ChildProcess = exec(command);
    // child.stdout &&
    //   child.stdout.on("data", (data) => {
    //     console.log(data.toString());
    //   });
    // child.stderr &&
    //   child.stderr.on("data", (data) => {
    //     console.log(data.toString());
    //   });
    // child.on("close", (code) => {
    //   resolve(code);
    //   console.log("close", code);
    // });
    child.stdout?.pipe(process.stdout);
    child.stderr?.pipe(process.stderr);
    child.on("close", (code) => {
      code === 0
        ? resolve(code)
        : reject(new Error(`Process exited with code ${code}`));
    });
  });
}

function writeFileStream(file: string, data: unknown) {
  return new Promise((resolve, reject) => {
    const ws = createWriteStream(file);
    ws.on("error", reject);
    ws.on("close", () => {
      resolve(true);
    });
    ws.write(data);
    ws.end();
  });
}

async function preparePackage() {
  try {
    const raw = await readFile(packagePath, "utf-8");
    const { name, main, author, version, description, dependencies } =
      JSON.parse(raw) as PackageJson;

    const distPackage: DistPackage = {
      name,
      main: relative(outDir, main),
      author,
      version,
      description,
      dependencies,
    };
    await mkdir(outDir, { recursive: true });
    await writeFile(outputPath, JSON.stringify(distPackage, null, 2));
    console.log("Package prepared:", distPackage);
  } catch (error) {
    console.error("Preparation failed:", error);
    process.exit(1);
  }
}

preparePackage();
