import { app } from "electron";

function commandLines() {
  app.commandLine.appendSwitch('ignore-certificate-errors');
}

export default commandLines;
