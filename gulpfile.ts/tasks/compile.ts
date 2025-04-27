import rspackCompiler from "../rs/pack";

async function compile() {
  await rspackCompiler(true);
}

export default compile;
