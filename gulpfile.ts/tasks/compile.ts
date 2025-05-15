import rspackCompiler from "../rs/pack"

async function compile(flag = true): Promise<void> {
  await rspackCompiler(flag)
}

export default compile
