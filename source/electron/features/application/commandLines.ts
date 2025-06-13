import { app } from "electron"

function commandLines(): void {
  app.commandLine.appendSwitch("ignore-certificate-errors")
}

export default commandLines
