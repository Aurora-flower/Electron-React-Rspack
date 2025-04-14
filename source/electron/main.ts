import onAppReadyBefore from "@main/helpers/event/onAppReadyBefore";
import onAppReady from "@main/helpers/event/onAppReady";
import onAppReadyAfter from "@main/helpers/event/onAppReadyAfter";
import commandLines from "@main/helpers/function/commandLines";

function advanceExecution() {
  commandLines();
}

(function init() {
  advanceExecution();
  onAppReadyBefore()
    .then(onAppReady)
    .then(onAppReadyAfter)
    .catch(console.error);
})();
