import onAppReadyBefore from "@main/handlers/event/onAppReadyBefore";
import onAppReady from "@main/handlers/event/onAppReady";
import commandLines from "@main/helpers/function/commandLines";

function advanceExecution() {
  commandLines();
}

(function init() {
  advanceExecution();
  onAppReadyBefore().then(onAppReady).catch(console.error);
})();
