import rspackCompiler from "../rs/pack";

async function compile(flag = true) {
  await rspackCompiler(flag);
}

export default compile;
