import { type ChildProcess, exec } from "child_process";
import { createWriteStream, readFileSync } from "fs";
// const { rimraf } = require("rimraf");

function execSetup(command: string) {
  return new Promise((resolve) => {
    const child: ChildProcess = exec(command);
    child.stdout &&
      child.stdout.on("data", (data) => {
        console.log(data.toString());
      });
    child.stderr &&
      child.stderr.on("data", (data) => {
        console.log(data.toString());
      });
    child.on("close", (code) => {
      resolve(code);
      console.log("close", code);
    });
  });
}

function writeFile(file: string, data: unknown) {
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

(async () => {
  // await rimraf(["app"]);
  // const command = `npm run build-only ${process.argv.slice(2).join(" ")}`;
  // const code = await execSetup(command);
  // if (code === 0) {
  //   console.log("build success");
  // } else {
  //   console.log("build fail");
  // }
  const buffer = readFileSync("package.json");
  const outDir = "app/";
  const config = "package.json";
  const { name, main, author, version, description, dependencies } = JSON.parse(
    buffer.toString()
  );
  const distPackage = {
    name,
    main: main.replace(outDir, ""),
    author,
    version,
    description,
    dependencies
  };
  await writeFile(`${outDir + config}`, JSON.stringify(distPackage, null, 2));
  console.log(config, distPackage);
})();
