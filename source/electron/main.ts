import onAppReady, {
  onAppReadyBefore
} from "@main/features/application/event/onAppReady"

onAppReadyBefore().then(onAppReady).catch(console.error)
